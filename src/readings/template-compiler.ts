import fs from "fs-extra";
import path from "node:path";
import Handlebars from "handlebars";

export async function compileHandlebarsPages(
  templateDir: string,
  slugs: readonly string[],
  buildContext: (slug: string) => Record<string, any>,
): Promise<any[]> {
  return Promise.all(
    slugs.map(async (slug) => {
      // Try TypeScript file first, then fall back to HTML
      const tsPath = path.join(templateDir, `${slug}.ts`);
      const htmlPath = path.join(templateDir, `${slug}.html`);
      
      let templateSource: string;
      
      if (await fs.pathExists(tsPath)) {
        // Import the TypeScript module and get the template
        const modulePath = path.resolve(tsPath);
        delete require.cache[modulePath]; // Clear cache to ensure fresh import
        const pageModule = require(modulePath);
        templateSource = pageModule.default;
      } else if (await fs.pathExists(htmlPath)) {
        // Fall back to HTML file
        templateSource = await fs.readFile(htmlPath, "utf8");
      } else {
        throw new Error(`Template file not found: ${slug}.ts or ${slug}.html`);
      }
      
      const template = Handlebars.compile(templateSource);
      const compiledHtml = template(buildContext(slug));
      const headMatch = compiledHtml.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
      const bodyMatch = compiledHtml.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
      const htmlAttrMatch = compiledHtml.match(/<html([^>]*)>/i);

      return {
        fileName: `${slug}.ts`,
        html: compiledHtml,
        head: headMatch?.[1]?.trim() ?? "",
        body: bodyMatch?.[1]?.trim() ?? "",
        htmlAttributes: htmlAttrMatch?.[1]?.trim() ?? "",
      } satisfies any;
    }),
  );
}
