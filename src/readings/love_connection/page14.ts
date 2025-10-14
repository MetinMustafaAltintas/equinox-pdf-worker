import { readFileSync } from 'fs';
import * as path from 'path';
import { importImage, importFont } from './asset-utils';

// Import assets using the utility functions
const backgroundImage = importImage('./assets/42f5f08ef641c8905bce22bcfc3beff15ee79e7b.png');
const thunderSemiBoldFont = importFont('../assets/fonts/Thunder-SemiBoldLC.ttf');
const thunderMediumFont = importFont('../assets/fonts/Thunder-MediumLC.ttf');
const rethinkSansRegularFont = importFont('../assets/fonts/RethinkSans-Regular.ttf');
const rethinkSansBoldFont = importFont('../assets/fonts/RethinkSans-Bold.ttf');


const page14 = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>{{title}}</title>
    <!-- Preload font for consistent rendering -->
    <link
      rel="preload"
      href="${thunderSemiBoldFont}"
      as="font"
      type="font/ttf"
      crossorigin
    />

    <style>
      /* === Base styles === */
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

      @media print {
        body { background: #fff; }
        .sheet {
          margin: 0;
          box-shadow: none;
          border-radius: 0;
        }
      }

      /* === Fonts === */
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
        font-style: normal;
        font-display: swap;
        font-synthesis: none;
      }

      @font-face {
        font-family: "Rethink Sans";
        src: url("${rethinkSansBoldFont}") format("truetype");
        font-weight: 700;
        font-style: normal;
        font-display: swap;
        font-synthesis: none;
      }

      /* === Title Section === */
      .title-section {
        position: absolute;
        left: 41px;
        top: 53.62px;
        width: 513px;
        height: 130px;
        z-index: 2;
      }

      .title-container {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 513px;
        height: 130px;
        border-radius: 17px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 20px;
        padding: 20px;
        box-sizing: border-box;
      }

      .title-background {
        position: absolute;
        inset: 0;
        border-radius: 17px;
        overflow: hidden;
      }

      .title-bg-image {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: 50% 50%;
        border-radius: 17px;
      }

      /* === Title Styling === */
      .main-title {
        font-family: "Thunder LC", sans-serif;
        font-weight: 600;
        font-size: 36px;
        line-height: normal;
        text-transform: uppercase;
        color: white;
        margin: 0;
        text-align: center;
        white-space: nowrap;
        position: relative;
        z-index: 2;
      }

      .subtitle-container {
        display: flex;
        flex-direction: column;
        gap: 13px;
        align-items: center;
        position: relative;
        z-index: 2;
      }

      .subtitle {
        font-family: "Thunder LC", sans-serif;
        font-weight: 500;
        font-size: 17px;
        line-height: normal;
        text-transform: uppercase;
        color: white;
        margin: 0;
        text-align: center;
      }

      /* === Content Section === */
      .content-section {
        position: absolute;
        left: 47.5px;
        top: 200px;
        width: 500px;
        height: 600px;
        z-index: 1;
        display: flex;
        flex-direction: column;
        gap: 30px;
        padding: 20px;
        box-sizing: border-box;
      }

      .section-item {
        position: relative;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 17px;
        padding: 20px;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
      }

      .section-header {
        display: flex;
        align-items: center;
        gap: 18px;
        margin-bottom: 15px;
      }

      .section-content {
        flex: 1;
        margin: 0;
        padding: 0;
        min-width: 0;
      }

      /* === Grouped Visual Elements === */
      .visual-group {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        position: relative;
        background: rgba(255, 255, 255, 0.15);
        backdrop-filter: blur(20px);
        border: 2px solid rgba(255, 255, 255, 0.3);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }

      .visual-group::before {
        content: "";
        position: absolute;
        inset: -2px;
        border-radius: 50%;
        background: linear-gradient(45deg, #00B59C, #9CFFAC, #00B59C);
        z-index: -1;
        opacity: 0.6;
      }

      /* === Icon styling === */
      .group-icon {
        width: 32px;
        height: 32px;
        margin-bottom: 4px;
        filter: brightness(0) invert(1);
      }

      /* === Percentage text styling === */
      .group-percentage {
        font-family: "Rethink Sans", system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
        font-weight: 700;
        font-size: 14px;
        margin: 0;
        color: rgba(255, 255, 255, 1);
        text-align: center;
      }

      .section-title {
        font-family: "Rethink Sans", system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
        font-weight: 700;
        font-size: 18px;
        margin: 0 0 8px 0;
        color: rgba(255, 255, 255, 1);
      }

      /* === Subtitle styling === */
      .section-subtitle {
        font-family: "Rethink Sans", system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
        font-weight: 400;
        font-size: 14px;
        margin: 0;
        color: rgba(255, 255, 255, 0.8);
        line-height: 1.4;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
      }

      /* === Summary Section === */
      .summary-section {
        background: rgba(255, 255, 255, 0.1);
        border-radius: 17px;
        padding: 25px;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        margin-top: 20px;
      }

      .summary-title {
        font-family: "Thunder LC", sans-serif;
        font-weight: 600;
        font-size: 24px;
        color: white;
        margin: 0 0 15px 0;
        text-align: center;
        text-transform: uppercase;
      }

      .summary-text {
        font-family: "Rethink Sans", system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
        font-weight: 400;
        font-size: 14px;
        color: rgba(255, 255, 255, 0.9);
        line-height: 1.6;
        margin: 0;
        text-align: center;
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

      <!-- Title section -->
      <div class="title-section">
        <div class="title-container">
          <div class="title-background">
            <img class="title-bg-image" src="${backgroundImage}" alt="Title background" />
          </div>
          <h1 class="main-title" data-field="title">{{title}}</h1>
          <div class="subtitle-container">
            <p class="subtitle" data-field="subtitle">Compatibility Analysis</p>
            <p class="subtitle" data-field="subtitle">Love Connection Report</p>
          </div>
        </div>
      </div>

      <!-- Content section -->
      <div class="content-section">
        <!-- Main compatibility section -->
        <div class="section-item">
          <div class="section-header">
            <div class="visual-group">
              <div class="group-icon">💕</div>
              <span class="group-percentage">{{mainSection.percentage}}%</span>
            </div>
            <div class="section-content">
              <h2 class="section-title">{{mainSection.title}}</h2>
              <p class="section-subtitle">{{mainSection.subtitle}}</p>
            </div>
          </div>
        </div>

        <!-- Mini sections -->
        {{#each miniSections}}
        <div class="section-item">
          <div class="section-header">
            <div class="visual-group">
              <div class="group-icon">{{icon}}</div>
              <span class="group-percentage">{{percentage}}%</span>
            </div>
            <div class="section-content">
              <h2 class="section-title">{{title}}</h2>
              <p class="section-subtitle">{{subtitle}}</p>
            </div>
          </div>
        </div>
        {{/each}}

        <!-- Summary section -->
        <div class="summary-section">
          <h2 class="summary-title">{{summary.title}}</h2>
          <p class="summary-text">{{summary.subtitle}}</p>
        </div>
      </div>
    </main>
  </body>
</html>
`;

export default page14;
