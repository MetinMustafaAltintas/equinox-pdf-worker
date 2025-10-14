import { readFileSync } from 'fs';
import * as path from 'path';

// Import assets using Page1 background structure
const backgroundImage = `data:image/png;base64,${readFileSync(path.join(__dirname, 'assets/42f5f08ef641c8905bce22bcfc3beff15ee79e7b.png'), 'base64')}`;
const thunderSemiBoldFont = `data:font/ttf;base64,${readFileSync(path.join(__dirname, '../assets/fonts/Thunder-SemiBoldLC.ttf'), 'base64')}`;
const thunderMediumFont = `data:font/ttf;base64,${readFileSync(path.join(__dirname, '../assets/fonts/Thunder-MediumLC.ttf'), 'base64')}`;
const keyFactorsImage = `data:image/png;base64,${readFileSync(path.join(__dirname, '../assets/images/key-factors.png'), 'base64')}`;

// Group decorative elements into a single PNG asset
const decorativeGroupImage = `data:image/png;base64,${readFileSync(path.join(__dirname, 'assets/a2c3fa0ad93d104d1bf520806ab6c140d3081e7d.png'), 'base64')}`;


const page9 = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Love Connection - Page 9</title>
    <link
      rel="preload"
      href="${thunderSemiBoldFont}"
      as="font"
      type="font/ttf"
      crossorigin
    />
    <link
      rel="preload"
      href="${thunderMediumFont}"
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

      /* Background layer - using Page1 background */
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

      /* Title section */
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

      /* Title styles */
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

      /* Main content section */
      .content-section {
        position: absolute;
        left: 47.5px;
        top: 267.02px;
        width: 500px;
        height: 500px;
        z-index: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 30px;
      }

      .main-image {
        width: 100%;
        max-width: 400px;
        height: auto;
        border-radius: 17px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
      }

      .decorative-group {
        position: absolute;
        top: 20px;
        right: 20px;
        width: 120px;
        height: 120px;
        opacity: 0.8;
        z-index: 1;
      }

      /* Content text */
      .content-text {
        font-family: "Thunder LC", sans-serif;
        font-weight: 500;
        font-size: 16px;
        line-height: 1.4;
        color: white;
        text-align: center;
        text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
        max-width: 450px;
        margin-top: 20px;
      }
    </style>
  </head>
  <body>
    <main class="sheet">
      <!-- Background layer - same as Page1 -->
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
          <h1 class="main-title" data-field="title">Key Factors</h1>
          <div class="subtitle-container">
            <p class="subtitle" data-field="subtitle">Understanding compatibility factors</p>
            <p class="subtitle" data-field="subtitle">Essential elements for relationship success</p>
          </div>
        </div>
      </div>

      <!-- Main content -->
      <div class="content-section">
        <img class="main-image" src="${keyFactorsImage}" alt="Key Factors Analysis" data-field="main_image_url" />
        <div class="content-text" data-field="content_text">
          Discover the fundamental elements that determine compatibility and relationship success. 
          This comprehensive analysis reveals the key factors that influence your connection.
        </div>
        
        <!-- Decorative grouped elements -->
        <img class="decorative-group" src="${decorativeGroupImage}" alt="Decorative Elements" />
      </div>
    </main>
  </body>
  </html>`;

export default page9;
