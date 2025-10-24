import fs from "fs-extra";
import path from "node:path";
import { ReadingTypes } from '../types/reading.types';
import { PreparedReadingContent } from "./pdf.types";
import { compileHandlebarsPages } from "../template-compiler";

type StringMap = Record<string, unknown>;

const TEMPLATE_DIR = __dirname;

function isRecord(value: unknown): value is StringMap {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function listTemplatePageSlugs(): string[] {
  const files = fs.readdirSync(TEMPLATE_DIR, { withFileTypes: true });

  return files
    .filter((entry) => {
      if (!entry.isFile()) return false;
      if (!entry.name.startsWith("page")) return false;

      const name = entry.name.toLowerCase();
      if (name.endsWith(".d.ts") || name.endsWith(".map")) return false;
      return /\.(js|ts|hbs)$/.test(name);
    })
    .map((entry) => path.basename(entry.name, path.extname(entry.name)))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
}

const PAGE_SLUGS = listTemplatePageSlugs();

export interface LoveConnectionPartyDetails {
  name?: string;
  sunSign?: string;
  moonSign?: string;
  ascendant?: string;
  element?: string;
  modality?: string;
  polarity?: string;
  birthDate?: string;
  birthTime?: string;
  birthPlace?: string;
  loveLanguage?: string;
}

export interface LoveConnectionScorecard {
  compatibilityScore?: number;
  chemistryScore?: number;
  trustScore?: number;
  growthPotential?: number;
  summary?: string;
  highlights?: string[];
  challenges?: string[];
}

export interface LoveConnectionNarrative {
  overview?: string;
  shortSummary?: string;
  keywords?: string[];
  mantra?: string;
}

export interface LoveConnectionPageMap {
  [pageSlug: string]: StringMap | undefined;
}

export interface LoveConnectionRawInput {
  locale?: string;
  assetsBasePath?: string;
  metadata?: StringMap;
  common?: StringMap;
  seeker?: LoveConnectionPartyDetails;
  partner?: LoveConnectionPartyDetails;
  scorecard?: LoveConnectionScorecard;
  narrative?: LoveConnectionNarrative;
  pages?: LoveConnectionPageMap;
}

export interface LoveConnectionPreparedData {
  locale: string;
  assetsBasePath: string;
  metadata: StringMap;
  common: StringMap;
  pages: Record<string, StringMap>;
}

function normalizeLocale(locale?: string): string {
  if (!locale) return "en";
  const trimmed = locale.trim();
  return trimmed ? trimmed.toLowerCase() : "en";
}

function buildDefaultMetadata(raw?: StringMap): StringMap {
  const base: StringMap = {
    generatedAt: new Date().toISOString(),
  };

  if (isRecord(raw)) {
    return { ...base, ...raw };
  }

  return base;
}

function buildCommonContext(raw: LoveConnectionRawInput, locale: string): StringMap {
  const common: StringMap = {
    locale,
  };

  if (isRecord(raw.common)) {
    Object.assign(common, raw.common);
  }

  if (raw.seeker) {
    common.seeker = { ...raw.seeker };
  }

  if (raw.partner) {
    common.partner = { ...raw.partner };
  }

  if (raw.scorecard) {
    const {
      compatibilityScore = null,
      chemistryScore = null,
      trustScore = null,
      growthPotential = null,
      summary,
      highlights = [],
      challenges = [],
    } = raw.scorecard;

    common.scorecard = {
      compatibilityScore,
      chemistryScore,
      trustScore,
      growthPotential,
      summary,
      highlights,
      challenges,
    };
  }

  if (raw.narrative) {
    const {
      overview,
      shortSummary,
      keywords = [],
      mantra,
    } = raw.narrative;

    common.narrative = {
      overview,
      shortSummary,
      keywords,
      mantra,
    };
  }

  return common;
}

function normalizePageData(
  pages: LoveConnectionPageMap | undefined,
  slug: string,
): StringMap {
  if (!pages) {
    return {};
  }

  const direct = pages[slug];
  if (isRecord(direct)) {
    return { ...direct };
  }

  const htmlKey = `${slug}.html`;
  const htmlValue = pages[htmlKey];
  if (isRecord(htmlValue)) {
    return { ...htmlValue };
  }

  return {};
}

export function prepareLoveConnectionData(
  raw: LoveConnectionRawInput = {},
): LoveConnectionPreparedData {
  const locale = normalizeLocale(raw.locale);
  const assetsBasePath = raw.assetsBasePath ?? "./assets";
  const metadata = buildDefaultMetadata(raw.metadata);
  const common = buildCommonContext(raw, locale);

  const preparedPages = PAGE_SLUGS.reduce<Record<string, StringMap>>(
    (acc, slug) => {
      acc[slug] = normalizePageData(raw.pages, slug);
      return acc;
    },
    {},
  );

  return {
    locale,
    assetsBasePath,
    metadata,
    common,
    pages: preparedPages,
  };
}

export async function prepareLoveConnectionPdfContent(
  raw: LoveConnectionRawInput = {},
): Promise<PreparedReadingContent<LoveConnectionPreparedData>> {
  const data = prepareLoveConnectionData(raw);
  const templateDir = TEMPLATE_DIR;
  const assetsBasePath = path.resolve(templateDir, data.assetsBasePath ?? "./assets");

  const pages = await compileHandlebarsPages(
    templateDir,
    PAGE_SLUGS,
    (slug) => {
      const pageData = data.pages[slug] ?? {};
      return {
        locale: data.locale,
        metadata: data.metadata,
        assetsBasePath,
        common: data.common,
        pages: data.pages,
        page: pageData,
        ...pageData,
      };
    },
  );

  return {
    type: ReadingTypes.Love_Connection,
    locale: data.locale,
    templateDir,
    assetsBasePath,
    data,
    pages,
  };
}
