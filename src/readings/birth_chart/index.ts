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
  const entries = fs.readdirSync(TEMPLATE_DIR, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile() && entry.name.toLowerCase().endsWith(".html"))
    .map((entry) => path.basename(entry.name, path.extname(entry.name)))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
}

const PAGE_SLUGS = listTemplatePageSlugs();

export interface BirthChartSubjectProfile {
  name?: string;
  birthDate?: string;
  birthTime?: string;
  birthPlace?: string;
  sunSign?: string;
  moonSign?: string;
  risingSign?: string;
  element?: string;
  modality?: string;
  polarity?: string;
  dominantPlanets?: string[];
}

export interface BirthChartRelationshipProfile {
  partnerName?: string;
  partnerSunSign?: string;
  partnerMoonSign?: string;
  partnerRisingSign?: string;
  sharedThemes?: string[];
}

export interface BirthChartNarrativeSummary {
  executiveSummary?: string;
  shortOverview?: string;
  focusAreas?: string[];
  upcomingPeriods?: string[];
}

export interface BirthChartPageMap {
  [pageSlug: string]: StringMap | undefined;
}

export interface BirthChartRawInput {
  locale?: string;
  assetsBasePath?: string;
  metadata?: StringMap;
  common?: StringMap;
  subject?: BirthChartSubjectProfile;
  relationship?: BirthChartRelationshipProfile;
  summary?: BirthChartNarrativeSummary;
  pages?: BirthChartPageMap;
}

export interface BirthChartPreparedData {
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

function buildMetadata(raw?: StringMap): StringMap {
  const base: StringMap = {
    generatedAt: new Date().toISOString(),
  };

  if (isRecord(raw)) {
    return { ...base, ...raw };
  }

  return base;
}

function buildCommonContext(raw: BirthChartRawInput, locale: string): StringMap {
  const context: StringMap = {
    locale,
  };

  if (isRecord(raw.common)) {
    Object.assign(context, raw.common);
  }

  if (raw.subject) {
    context.subject = { ...raw.subject };
  }

  if (raw.relationship) {
    context.relationship = { ...raw.relationship };
  }

  if (raw.summary) {
    const { executiveSummary, shortOverview, focusAreas = [], upcomingPeriods = [] } = raw.summary;
    context.summary = {
      executiveSummary,
      shortOverview,
      focusAreas,
      upcomingPeriods,
    };
  }

  return context;
}

const DEFAULT_PAGE_DATA: Record<string, StringMap> = {
  page1: {
    title: "",
    subtitles: [],
    main_image_url: "",
    main_image_alt: "",
  },
  page2: {
    title: "",
    sections: [],
  },
  page3: {
    title: "",
  },
  page4: {
    title: "",
    mainSection: {
      percentage: 0,
      title: "",
      subtitle: "",
    },
    miniSections: [],
    summary: {
      title: "",
      subtitle: "",
    },
  },
  page5: {
    title: "",
    sections: [],
  },
  page6: {
    title: "",
    sections: [],
  },
  page7: {
    title: "",
    sections: [],
  },
  page8: {
    title: "",
    sections: [],
  },
  page9: {
    title: "",
  },
  page10: {
    title: "",
    sections: [],
    bad_time_section: {
      title: "",
      items: [],
    },
  },
  page11: {
    title: "",
    adviceItems: [],
  },
  page12: {
    title: "",
    mainSection: {
      percentage: 0,
      title: "",
      subtitle: "",
    },
    miniSections: [],
    summary: {
      title: "",
      subtitle: "",
    },
  },
  page13: {
    title: "",
    mainSection: {
      percentage: 0,
      title: "",
      subtitle: "",
    },
    miniSections: [],
    summary: {
      title: "",
      subtitle: "",
    },
  },
  page14: {
    title: "",
    mainSection: {
      percentage: 0,
      title: "",
      subtitle: "",
    },
    miniSections: [],
    summary: {
      title: "",
      subtitle: "",
    },
  },
  page15: {
    title: "",
    mainSection: {
      percentage: 0,
      title: "",
      subtitle: "",
    },
    miniSections: [],
    summary: {
      title: "",
      subtitle: "",
    },
  },
  page16: {
    title: "",
    compatibilityFactors: [],
  },
  page17: {
    title: "",
    adviceItems: [],
  },
};

function mergeWithDefaults(defaultValue: unknown, override: unknown): unknown {
  if (override === undefined) {
    if (Array.isArray(defaultValue)) {
      return defaultValue.slice();
    }

    if (isRecord(defaultValue)) {
      const result: StringMap = {};
      for (const key of Object.keys(defaultValue)) {
        result[key] = mergeWithDefaults(defaultValue[key], undefined);
      }
      return result;
    }

    return defaultValue;
  }

  if (Array.isArray(override)) {
    return override.slice();
  }

  if (isRecord(override)) {
    const defaultRecord = isRecord(defaultValue) ? defaultValue : {};
    const result: StringMap = {};
    const keys = new Set(
      [...Object.keys(defaultRecord), ...Object.keys(override)],
    );

    keys.forEach((key) => {
      result[key] = mergeWithDefaults(defaultRecord[key], override[key]);
    });

    return result;
  }

  return override;
}

function resolvePageData(pages: BirthChartPageMap | undefined, slug: string): StringMap {
  const defaults = DEFAULT_PAGE_DATA[slug] ?? {};

  if (!pages) {
    return mergeWithDefaults(defaults, undefined) as StringMap;
  }

  const direct = pages[slug];
  const htmlKey = `${slug}.html`;
  const htmlValue = pages[htmlKey];

  const source = isRecord(direct)
    ? direct
    : isRecord(htmlValue)
      ? htmlValue
      : undefined;

  return mergeWithDefaults(defaults, source) as StringMap;
}

export function prepareBirthChartData(
  raw: BirthChartRawInput = {},
): BirthChartPreparedData {
  const locale = normalizeLocale(raw.locale);
  const assetsBasePath = raw.assetsBasePath ?? "./assets";
  const metadata = buildMetadata(raw.metadata);
  const common = buildCommonContext(raw, locale);

  const pages = PAGE_SLUGS.reduce<Record<string, StringMap>>(
    (acc, slug) => {
      acc[slug] = resolvePageData(raw.pages, slug);
      return acc;
    },
    {},
  );

  return {
    locale,
    assetsBasePath,
    metadata,
    common,
    pages,
  };
}

export async function prepareBirthChartPdfContent(
  raw: BirthChartRawInput = {},
): Promise<PreparedReadingContent<BirthChartPreparedData>> {
  const data = prepareBirthChartData(raw);
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
    type: ReadingTypes.Birth_Chart,
    locale: data.locale,
    templateDir,
    assetsBasePath,
    data,
    pages,
  };
}
