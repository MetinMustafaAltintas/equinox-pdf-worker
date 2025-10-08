import { Worker } from "bullmq";
import Redis from "ioredis";
import { S3, PutObjectCommand } from "@aws-sdk/client-s3";
import fetch from "cross-fetch";
import puppeteer from "puppeteer";

const redis = new Redis(process.env.REDIS_URL!, {
  tls: process.env.REDIS_TLS === "true" ? {} : undefined,
  maxRetriesPerRequest: null
});

const s3 = new S3({
  endpoint: process.env.SPACES_ENDPOINT!,
  region: process.env.SPACES_REGION!,
  credentials: {
    accessKeyId: process.env.SPACES_KEY!,
    secretAccessKey: process.env.SPACES_SECRET!
  }
});

async function renderPdf(html: string): Promise<Buffer> {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "networkidle0" });
  const buffer = await page.pdf({ format: "a4", printBackground: true });
  await browser.close();
  return buffer;
}

const worker = new Worker(
  "pdf:jobs",
  async (job) => {
    const { jobId, readingId, type, additionalData, callbackUrl } = job.data;
    console.log(`📥 Processing job ${jobId} (${type})`);

    try {
      // basit örnek HTML
      const html = `<html><body><h1>${type}</h1><p>${JSON.stringify(additionalData)}</p></body></html>`;
      const pdfBuffer = await renderPdf(html);

      const key = `pdfs/${readingId}-${Date.now()}.pdf`;
      await s3.send(
        new PutObjectCommand({
          Bucket: process.env.SPACES_BUCKET!,
          Key: key,
          Body: pdfBuffer,
          ContentType: "application/pdf",
          ACL: "private"
        })
      );

      const fileUrl = `${process.env.SPACES_ENDPOINT!.replace(
        "https://",
        `https://${process.env.SPACES_BUCKET}.`
      )}/${key}`;

      // callback
      await fetch(callbackUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Callback-Token": process.env.CALLBACK_TOKEN || ""
        },
        body: JSON.stringify({
          jobId,
          readingId,
          status: "done",
          url: fileUrl
        })
      });

      console.log(`✅ Job ${jobId} completed.`);
      return { url: fileUrl };
    } catch (err) {
      console.error(`❌ Job ${jobId} failed`, err);

      await fetch(callbackUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Callback-Token": process.env.CALLBACK_TOKEN || ""
        },
        body: JSON.stringify({
          jobId,
          readingId,
          status: "failed",
          errorMessage: (err as Error).message
        })
      });

      throw err;
    }
  },
  { connection: redis, concurrency: Number(process.env.CONCURRENCY || 1) }
);

console.log("🚀 PDF Worker started and listening for jobs...");