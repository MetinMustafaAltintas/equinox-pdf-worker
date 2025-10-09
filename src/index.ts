import express from "express";
import type { Request, Response } from "express";
import { S3, PutObjectCommand } from "@aws-sdk/client-s3";
import fetch from "cross-fetch";
import puppeteer from "puppeteer";
import PQueue from "p-queue";

const app = express();
app.use(express.json({ limit: "10mb" }));

app.use((req, res, next) => {
  console.log('🛰️ Incoming Request:', req.method, req.url);
  console.log('📦 Body:', req.body);
  next();
});

const PORT = Number(process.env.PORT || 8080);
const CONCURRENCY = Number(process.env.CONCURRENCY || 1);
const CALLBACK_TOKEN = process.env.CALLBACK_TOKEN || "";

const s3 = new S3({
  endpoint: process.env.SPACES_ENDPOINT!,
  region: process.env.SPACES_REGION!,
  credentials: { accessKeyId: process.env.SPACES_KEY!, secretAccessKey: process.env.SPACES_SECRET! }
});

const queue = new PQueue({ concurrency: CONCURRENCY });

async function renderPdf(html: string): Promise<Buffer> {
  const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox", "--disable-setuid-sandbox"] });
  try {
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0", timeout: 120000 });
    const buf = await page.pdf({ format: "a4", printBackground: true, preferCSSPageSize: true, timeout: 120000 });
    return Buffer.from(buf);
  } finally {
    await browser.close();
  }
}

type Payload = {
  jobId: string;
  readingId: string;
  type: string;
  pdfData?: { pages?: Array<{ head?: string; body: string; htmlAttributes?: Record<string, string> }>; assetsBasePath?: string; meta?: Record<string, any> };
  html?: string;
  output?: { fileName: string; folder?: string };
  callbackUrl: string;
  token?: string;
};

function attrs(obj?: Record<string, string>) {
  if (!obj) return "";
  return Object.entries(obj).map(([k, v]) => `${k}="${String(v).replace(/"/g, "&quot;")}"`).join(" ");
}

async function processJob(data: Payload) {
  const { jobId, readingId, type, pdfData, html, output, callbackUrl } = data;

  const htmlToRender =
    html ??
    (pdfData?.pages?.length
      ? `<html ${attrs(pdfData.pages[0].htmlAttributes)}><head>${pdfData.pages[0].head || ""}</head><body>${pdfData.pages[0].body}</body></html>`
      : `<html><body><h1>${type}</h1><pre>${JSON.stringify(pdfData?.meta || {}, null, 2)}</pre></body></html>`);

  const pdfBuffer = await renderPdf(htmlToRender);

  const folder = output?.folder || "readings";
  const fileName = output?.fileName || `${readingId}-${Date.now()}.pdf`;
  const key = `${folder}/${fileName}`;

  await s3.send(new PutObjectCommand({ Bucket: process.env.SPACES_BUCKET!, Key: key, Body: pdfBuffer, ContentType: "application/pdf", ACL: "private" }));

  const fileUrl = `${process.env.SPACES_ENDPOINT!.replace("https://", `https://${process.env.SPACES_BUCKET}.`)}/${key}`;

  await fetch(callbackUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Callback-Token": CALLBACK_TOKEN },
    body: JSON.stringify({ jobId, readingId, status: "done", url: fileUrl })
  });

  return { url: fileUrl, key };
}

app.get("/healthz", (_req: Request, res: Response) => res.json({ ok: true, queueSize: queue.size, pending: queue.pending }));

app.post("/render", async (req: Request, res: Response) => {
  const payload: Payload = req.body;
  const hToken = req.get("X-Worker-Token");
  if (CALLBACK_TOKEN && hToken !== CALLBACK_TOKEN && payload.token !== CALLBACK_TOKEN) {
    return res.status(401).json({ error: "unauthorized" });
  }
  if (!payload?.jobId || !payload?.readingId || !payload?.callbackUrl) {
    return res.status(400).json({ error: "jobId, readingId, callbackUrl required" });
  }
  queue.add(() => processJob(payload)).catch((err) => console.error("Job failed:", payload.jobId, err));
  return res.status(202).json({ accepted: true, jobId: payload.jobId });
});

app.listen(PORT, () => console.log(`🚀 PDF Web Service started on :${PORT} (concurrency=${CONCURRENCY})`));