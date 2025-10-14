export interface CompiledPage {
  fileName: string;
  html: string;
  head: string;
  body: string;
  htmlAttributes: string;
}

export interface PreparedReadingContent<T = any> {
  type: string;
  locale: string;
  templateDir: string;
  assetsBasePath: string;
  data: T;
  pages: CompiledPage[];
}
