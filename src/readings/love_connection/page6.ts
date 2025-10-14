import { readFileSync } from 'fs';
import * as path from 'path';

// Import assets directly - using same background as page1
const backgroundImage = `data:image/png;base64,${readFileSync(path.join(__dirname, 'assets/42f5f08ef641c8905bce22bcfc3beff15ee79e7b.png'), 'base64')}`;
const thunderSemiBoldFont = `data:font/ttf;base64,${readFileSync(path.join(__dirname, '../assets/fonts/Thunder-SemiBoldLC.ttf'), 'base64')}`;
const thunderMediumFont = `data:font/ttf;base64,${readFileSync(path.join(__dirname, '../assets/fonts/Thunder-MediumLC.ttf'), 'base64')}`;
const rethinkSansRegularFont = `data:font/ttf;base64,${readFileSync(path.join(__dirname, '../assets/fonts/RethinkSans-Regular.ttf'), 'base64')}`;
const rethinkSansBoldFont = `data:font/ttf;base64,${readFileSync(path.join(__dirname, '../assets/fonts/RethinkSans-Bold.ttf'), 'base64')}`;


const page6 = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>{{title}}</title>
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

      /* Font definitions */
      @font-face {
        font-family: "Thunder LC";
        src: url("${thunderSemiBoldFont}") format("truetype");
        font-weight: 600;
        font-display: swap;
      }
      @font-face {
        font-family: "Thunder LC";
        src: url("${thunderMediumFont}") format("truetype");
        font-weight: 500;
        font-display: swap;
      }

      @font-face {
        font-family: "Rethink Sans";
        src: url("${rethinkSansRegularFont}") format("truetype");
        font-weight: 400;
        font-display: swap;
      }

      @font-face {
        font-family: "Rethink Sans";
        src: url("${rethinkSansBoldFont}") format("truetype");
        font-weight: 700;
        font-display: swap;
      }

      /* Background layer - same as page1 */
      .background-layer {
        position: absolute;
        top: -338.27px;
        left: 0;
        width: 595px;
        height: 1320.92px;
        z-index: 0;
      }

      .background-image {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: 50% 50%;
        opacity: 0.7;
      }

      .background-gradient {
        position: absolute;
        inset: 0;
        background: linear-gradient(to right, rgba(17,43,70,0.3), rgba(17,43,70,0.3));
        background-image: url('data:image/svg+xml;utf8,<svg viewBox="0 0 595 1320.9" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"><rect x="0" y="0" height="100%" width="100%" fill="url(%23grad)" opacity="1"/><defs><radialGradient id="grad" gradientUnits="userSpaceOnUse" cx="0" cy="0" r="10" gradientTransform="matrix(45.117 96.821 -136.68 66.787 327.78 575.96)"><stop stop-color="rgba(68,15,60,0)" offset="0"/><stop stop-color="rgba(43,29,65,0.5)" offset="0.5"/><stop stop-color="rgba(17,43,70,1)" offset="1"/></radialGradient></defs></svg>');
      }

      .background-overlay {
        position: absolute;
        inset: 0;
        background: #16314e;
        mix-blend-mode: hard-light;
      }

      /* Main content wrapper */
      .content-wrapper {
        position: relative;
        z-index: 2;
        padding: 20px;
        height: 100%;
        display: flex;
        flex-direction: column;
        gap: 30px;
      }

      /* Title section */
      .title-section {
        display: flex;
        justify-content: center;
        margin-bottom: 20px;
      }

      .title-container {
        backdrop-filter: blur(0px);
        background: rgba(255, 255, 255, 0.1);
        border: 0.5px solid rgba(255, 255, 255, 0.3);
        border-radius: 17px;
        padding: 20px 30px;
        text-align: center;
        box-shadow: 0px 8px 32px 0px rgba(0, 0, 0, 0.15);
      }

      .title {
        font-family: "Thunder LC", sans-serif;
        font-weight: 600;
        font-size: 28px;
        text-transform: uppercase;
        margin: 0;
        color: rgba(255, 255, 255, 1);
        white-space: nowrap;
        line-height: 1.2;
        -webkit-font-smoothing: antialiased;
      }

      .subtitle {
        font-family: "Rethink Sans", sans-serif;
        font-weight: 400;
        font-size: 14px;
        margin: 20px auto 0 auto;
        color: rgba(255, 255, 255, 0.8);
        text-align: center;
        max-width: 500px;
        line-height: 1.4;
      }

      /* Content sections */
      .content-sections {
        display: flex;
        flex-direction: column;
        gap: 25px;
        flex: 1;
      }

      .section-item {
        position: relative;
        backdrop-filter: blur(20px);
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 20px;
        padding: 25px;
        transition: all 0.3s ease;
      }

      .section-item:hover {
        background: rgba(255, 255, 255, 0.15);
        border-color: rgba(255, 255, 255, 0.3);
        transform: translateY(-2px);
        box-shadow: 0px 12px 40px 0px rgba(0, 0, 0, 0.2);
      }

      .section-header {
        display: flex;
        flex-direction: column;
        gap: 15px;
        margin-bottom: 20px;
      }

      .section-title {
        font-family: "Thunder LC", sans-serif;
        font-weight: 600;
        font-size: 20px;
        text-transform: uppercase;
        margin: 0;
        color: rgba(255, 255, 255, 1);
        line-height: 1.2;
      }

      .section-subtitle {
        font-family: "Rethink Sans", sans-serif;
        font-weight: 400;
        font-size: 14px;
        margin: 0;
        color: rgba(255, 255, 255, 0.9);
        line-height: 1.5;
        hyphens: auto;
        overflow-wrap: anywhere;
      }

      /* Decorative elements */
      .decorative-circle {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(10px);
      }

      .circle-1 {
        width: 80px;
        height: 80px;
        top: 20px;
        right: 20px;
      }

      .circle-2 {
        width: 60px;
        height: 60px;
        bottom: 30px;
        left: 30px;
      }

      .circle-3 {
        width: 40px;
        height: 40px;
        top: 50%;
        right: 10%;
      }
    </style>
  </head>
  <body>
    <main class="sheet">
      <!-- Background layer - same as page1 -->
      <div class="background-layer">
        <img class="background-image" src="${backgroundImage}" alt="Background" />
        <div class="background-gradient"></div>
        <div class="background-overlay"></div>
      </div>

      <!-- Main content -->
      <div class="content-wrapper">
        <!-- Title section -->
        <div class="title-section">
          <div class="title-container">
            <h1 class="title">{{title}}</h1>
            <p class="subtitle">{{subtitle}}</p>
          </div>
        </div>

        <!-- Content sections -->
        <div class="content-sections">
          {{#each sections}}
          <div class="section-item">
            <div class="section-header">
              <h2 class="section-title">{{title}}</h2>
              <p class="section-subtitle">{{subtitle}}</p>
            </div>
          </div>
          {{/each}}
        </div>

        <!-- Decorative elements -->
        <div class="decorative-circle circle-1"></div>
        <div class="decorative-circle circle-2"></div>
        <div class="decorative-circle circle-3"></div>
      </div>
    </main>
  </body>
</html>
`;

export default page6;
