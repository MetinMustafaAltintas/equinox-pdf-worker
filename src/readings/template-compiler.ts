import fs from "fs-extra";
import path from "node:path";
import Handlebars from "handlebars";

// slug için şablon dosyasını bu sırada ara: .html → .hbs → .js → .ts
function resolveTemplateFile(dir: string, slug: string) {
  const candidates = [`${slug}.html`, `${slug}.hbs`, `${slug}.js`, `${slug}.ts`];
  for (const name of candidates) {
    const p = path.join(dir, name);
    if (fs.existsSync(p)) {
      return { fullPath: p, ext: path.extname(p).toLowerCase() };
    }
  }
  throw new Error(`Template file not found: ${slug}.js|.ts|.html|.hbs`);
}

export async function compileHandlebarsPages(
  templateDir: string,
  slugs: readonly string[],
  buildContext: (slug: string) => Record<string, any>,
): Promise<any[]> {
  const pages: Array<{ fileName: string; html?: string; head?: string; body?: string; htmlAttributes?: string }> = [];

  for (const slug of slugs) {
    const ctx = buildContext(slug);
    const { fullPath, ext } = resolveTemplateFile(templateDir, slug);

    let compiledHtml = "";
    let head = "";
    let body = "";
    let htmlAttributes = "";

    if (ext === ".html" || ext === ".hbs") {
      // Statik dosya: .hbs ise derle, .html ise olduğu gibi/Handlebars'la işle
      const source = await fs.readFile(fullPath, "utf8");
      const tpl = ext === ".hbs" ? Handlebars.compile(source) : ((_: any) => source);
      const html = tpl(ctx);
      compiledHtml = typeof html === "string" ? html : String(html);
    } else if (ext === ".js" || ext === ".ts") {
      // Modül dosyası: require et, fn/string/object her tür çıktıyı kabul et
      const modulePath = path.resolve(fullPath);
      // uzun süreli processlerde stale cache'i önle
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (require as any).cache && delete (require as any).cache[modulePath];
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const mod = require(modulePath);
      const renderer = mod?.default ?? mod?.render ?? mod?.compile ?? mod;

      const out = typeof renderer === "function" ? await Promise.resolve(renderer(ctx)) : renderer;

      if (typeof out === "string") {
        compiledHtml = out;
      } else if (out && typeof out === "object") {
        const rawHtml = out.html;
        if (typeof rawHtml === "string" && rawHtml.trim().length > 0) {
          compiledHtml = rawHtml;
        } else {
          head = out.head ?? out.htmlHead ?? "";
          body = out.body ?? out.htmlBody ?? out.content ?? "";
          htmlAttributes = out.htmlAttributes ?? "";
        }
      } else {
        throw new Error(`Template ${slug}${ext} must export a function, string, or object`);
      }
    } else {
      throw new Error(`Unsupported template extension for ${slug}: ${ext}`);
    }

    // Sadece tam HTML string geldiyse <head>/<body> ayır; yoksa body'yi fragment olarak kullan
    if (!body && compiledHtml) {
      const headMatch = compiledHtml.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
      const bodyMatch = compiledHtml.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
      const htmlAttrMatch = compiledHtml.match(/<html([^>]*)>/i);

      if (headMatch || bodyMatch) {
        head = headMatch?.[1]?.trim() ?? "";
        body = bodyMatch?.[1]?.trim() ?? "";
        htmlAttributes = htmlAttrMatch?.[1]?.trim() ?? "";
      } else {
        body = compiledHtml;
      }
    }

    pages.push({
      fileName: `${slug}.html`, // downstream için her zaman .html
      html: compiledHtml,
      head,
      body,
      htmlAttributes,
    });
  }

  return pages;
}