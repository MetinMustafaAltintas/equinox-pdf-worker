import { readFileSync } from 'fs';
import * as path from 'path';

// Import assets directly
const backgroundImage = `data:image/png;base64,${readFileSync(path.join(__dirname, 'assets/42f5f08ef641c8905bce22bcfc3beff15ee79e7b.png'), 'base64')}`;
const thunderSemiBoldFont = `data:font/ttf;base64,${readFileSync(path.join(__dirname, '../assets/fonts/Thunder-SemiBoldLC.ttf'), 'base64')}`;


const page7 = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Love Connection - Page 7</title>
    <link
      rel="preload"
      href="${thunderSemiBoldFont}"
      as="font"
      type="font/ttf"
      crossorigin
    />

    <style>
      @page {
        size: A4;
        margin: 0;
      }

      html, body {
        margin: 0;
        padding: 0;
        background: #ffffff;
        color: #111827;
        font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial;
        overflow: hidden;
      }

      body {
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }

      .sheet {
        width: 595px;
        height: 842px;
        position: relative;
        background: #ffffff;
        box-sizing: border-box;
        overflow: hidden;
      }

      @media print {
        body { background: #fff; }
        .sheet {
          margin: 0;
          box-shadow: none;
          border-radius: 0;
        }
      }

      /* Background layer */
      .background-layer {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
      }

      .background-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        position: absolute;
        top: 0;
        left: 0;
      }

      .background-gradient {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.6) 100%);
        z-index: 2;
      }

      .background-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.3);
        z-index: 3;
      }

      /* Content sections */
      .content-container {
        position: absolute;
        left: 41px;
        top: 53.62px;
        width: 513px;
        height: 735px;
        z-index: 2;
        display: flex;
        flex-direction: column;
        gap: 32px;
        padding: 20px;
        box-sizing: border-box;
      }

      .section-item {
        background: rgba(255, 255, 255, 0.1);
        border-radius: 17px;
        padding: 24px;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        position: relative;
        overflow: hidden;
      }

      .section-item::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 2px;
        background: linear-gradient(90deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4);
      }

      .section-header {
        display: flex;
        flex-direction: column;
        gap: 12px;
        margin-bottom: 20px;
      }

      .section-title {
        font-family: "Thunder LC", sans-serif;
        font-weight: 600;
        font-size: 20px;
        line-height: 1.2;
        margin: 0;
        color: white;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .section-subtitle {
        font-family: "Thunder LC", sans-serif;
        font-weight: 500;
        font-size: 14px;
        line-height: 1.4;
        margin: 0;
        color: rgba(255, 255, 255, 0.9);
        text-transform: uppercase;
        letter-spacing: 0.3px;
      }

      .section-content {
        color: rgba(255, 255, 255, 0.85);
        font-size: 13px;
        line-height: 1.5;
        font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial;
      }

      /* Decorative elements */
      .decoration {
        position: absolute;
        width: 60px;
        height: 60px;
        background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
        border-radius: 50%;
        z-index: 1;
      }

      .decoration-1 {
        top: 20px;
        right: 20px;
        animation: float 6s ease-in-out infinite;
      }

      .decoration-2 {
        bottom: 20px;
        left: 20px;
        animation: float 8s ease-in-out infinite reverse;
      }

      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
      }

      /* Page number */
      .page-number {
        position: absolute;
        bottom: 20px;
        right: 20px;
        color: rgba(255, 255, 255, 0.6);
        font-size: 12px;
        font-family: "Thunder LC", sans-serif;
        font-weight: 500;
        z-index: 3;
      }
    </style>
  </head>
  <body>
    <main class="sheet">
      <!-- Background layer -->
      <div class="background-layer">
        <img class="background-image" src="${backgroundImage}" alt="Background" />
        <div class="background-gradient"></div>
        <div class="background-overlay"></div>
      </div>

      <!-- Content sections -->
      <div class="content-container">
        {{#each sections}}
        <div class="section-item">
          <div class="decoration decoration-{{@index}}"></div>
          <div class="section-header">
            <h2 class="section-title">{{title}}</h2>
            <p class="section-subtitle">{{subtitle}}</p>
          </div>
          {{#if content}}
          <div class="section-content">{{content}}</div>
          {{/if}}
        </div>
        {{/each}}
      </div>

      <!-- Page number -->
      <div class="page-number">7</div>
    </main>
  </body>
</html>
`;

export default page7;
