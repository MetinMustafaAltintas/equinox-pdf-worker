import express, { Request, Response } from "express";
import fetch from "cross-fetch";
import PDFService from "./readings/pdf.service";
import { uploadBufferToSpaces } from "./readings/spaces.helper";

const app = express();
app.use(express.json({ limit: "400mb" }));

app.use((req, _res, next) => {
  console.log("🛰️ Incoming Request:", req.method, req.url);
  const brief =
    typeof req.body === "object" && req.body ? Object.keys(req.body) : typeof req.body;
  console.log("📦 Body keys/type:", brief);
  next();
});

const PORT = Number(process.env.PORT || 8080);
const CONCURRENCY = Number(process.env.CONCURRENCY || 1);

const WORKER_TOKEN = process.env.WORKER_TOKEN || "";
const CALLBACK_TOKEN = process.env.CALLBACK_TOKEN || "";

app.get("/healthz", (_req: Request, res: Response) => {
  res.json({ ok: true, concurrency: CONCURRENCY });
});

type PdfPage = { head?: string; body: string; htmlAttributes?: Record<string, string> };

type RenderPayload = {
  jobId: string;
  readingId: string;
  type: string;
  compile: { type: string; data: any };
  output?: { fileName: string; folder?: string };
  callbackUrl: string;
  token?: string;
};

app.post("/render", async (req: Request, res: Response) => {
  const payload = req.body as RenderPayload;

  const headerToken = req.get("X-Worker-Token");
  const bodyToken = payload?.token;
  if (WORKER_TOKEN && headerToken !== WORKER_TOKEN && bodyToken !== WORKER_TOKEN) {
    return res.status(401).json({ error: "unauthorized" });
  }

  if (!payload?.jobId || !payload?.readingId || !payload?.type) {
    return res.status(400).json({ error: "jobId, readingId, type zorunludur" });
  }
  if (!payload?.output?.fileName) {
    return res.status(400).json({ error: "output.fileName zorunludur" });
  }
  if (!payload?.callbackUrl) {
    return res.status(400).json({ error: "callbackUrl zorunludur" });
  }

  processRender(payload).catch((err) => {
    console.error("❌ processRender unhandled error:", err);
  });

  return res.json({ accepted: true, jobId: payload.jobId });
});

async function processRender(payload: RenderPayload) {
  const { jobId, readingId, type, compile, output, callbackUrl } = payload;
  const folder = output?.folder || "readings";
  const key = `${folder}/${output!.fileName}`;

  try {
    console.log(`⚙️ Starting render for job ${jobId}...`);

    let pdfBuffer: Buffer | null = null;

    if (compile?.type) {
      pdfBuffer = await PDFService.startProcessing(compile.type as any, compile.data);
    } else {
      throw new Error("compile.type zorunludur");
    }

    if (!pdfBuffer || !pdfBuffer.length) {
      throw new Error("Empty PDF buffer");
    }

    console.log("🪣 Preparing upload via spaces.helper...");
    const uploadResult = await uploadBufferToSpaces(
      pdfBuffer,
      output!.fileName,
      "application/pdf",
      folder
    );

    console.log(`📤 Uploaded successfully to: ${uploadResult.url}`);

    await sendCallback(callbackUrl, {
      jobId,
      readingId,
      status: "done",
      url: uploadResult.url,
      key: uploadResult.key,
    });

    console.log(`✅ Render complete for job ${jobId}`);
  } catch (error: any) {
    console.error(`❌ Job failed: ${jobId}`, error);

    await sendCallback(callbackUrl, {
      jobId,
      readingId,
      status: "failed",
      error: error?.message || String(error),
    });
  }
}

async function sendCallback(url: string, body: Record<string, any>) {
  try {
    const r = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(CALLBACK_TOKEN ? { "X-Callback-Token": CALLBACK_TOKEN } : {}),
      },
      body: JSON.stringify(body),
    });
    console.log("🔔 Callback sent:", r.status);
  } catch (err) {
    console.error("❌ Callback send error:", err);
  }
}

app.listen(PORT, () => {
  console.log(`🚀 PDF Web Service started on :${PORT} (concurrency=${CONCURRENCY})`);
});