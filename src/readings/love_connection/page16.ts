import { readFileSync } from 'fs';
import * as path from 'path';

// Import assets directly - using same background as page1
const backgroundImage = `data:image/png;base64,${readFileSync(path.join(__dirname, 'assets/42f5f08ef641c8905bce22bcfc3beff15ee79e7b.png'), 'base64')}`;
const thunderSemiBoldFont = `data:font/ttf;base64,${readFileSync(path.join(__dirname, '../assets/fonts/Thunder-SemiBoldLC.ttf'), 'base64')}`;
const thunderMediumFont = `data:font/ttf;base64,${readFileSync(path.join(__dirname, '../assets/fonts/Thunder-MediumLC.ttf'), 'base64')}`;
const rethinkSansRegularFont = `data:font/ttf;base64,${readFileSync(path.join(__dirname, '../assets/fonts/RethinkSans-Regular.ttf'), 'base64')}`;
const rethinkSansBoldFont = `data:font/ttf;base64,${readFileSync(path.join(__dirname, '../assets/fonts/RethinkSans-Bold.ttf'), 'base64')}`;
const compatibilityLogoImage = `data:image/png;base64,${readFileSync(path.join(__dirname, '../assets/images/compatibility-logo.png'), 'base64')}`;


const page16 = `<!DOCTYPE html>
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
        font-size: 32px;
        line-height: normal;
        text-transform: uppercase;
        color: white;
        margin: 0;
        text-align: center;
        white-space: nowrap;
        position: relative;
        z-index: 2;
      }

      .subtitle {
        font-family: "Thunder LC", sans-serif;
        font-weight: 500;
        font-size: 16px;
        line-height: normal;
        text-transform: uppercase;
        color: white;
        margin: 0;
        text-align: center;
        position: relative;
        z-index: 2;
      }

      /* Compatibility factors section */
      .compatibility-factors {
        position: absolute;
        left: 41px;
        top: 220px;
        width: 513px;
        height: 500px;
        z-index: 2;
        overflow-y: auto;
        padding-right: 10px;
      }

      .compatibility-factor {
        margin-bottom: 30px;
        position: relative;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 17px;
        padding: 20px;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
      }

      .factor-header {
        display: flex;
        align-items: flex-start;
        gap: 20px;
        margin-bottom: 15px;
      }

      .factor-icon-circle {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        overflow: hidden;
        flex-shrink: 0;
        position: relative;
        background: rgba(255, 255, 255, 0.15);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.3);
      }

      .factor-icon {
        width: 30px;
        height: 30px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        object-fit: contain;
        filter: brightness(0) invert(1);
      }

      .factor-content {
        flex: 1;
      }

      .factor-name {
        font-family: "Rethink Sans", sans-serif;
        font-weight: 700;
        font-size: 18px;
        line-height: 1.2;
        margin: 0 0 8px 0;
        color: rgba(255, 255, 255, 0.95);
      }

      .factor-description {
        font-family: "Rethink Sans", sans-serif;
        font-weight: 400;
        font-size: 14px;
        line-height: 1.4;
        margin: 0;
        color: rgba(255, 255, 255, 0.8);
        text-rendering: optimizeLegibility;
      }

      /* Logo */
      .compatibility-logo-circle {
        position: absolute;
        bottom: 25px;
        right: 25px;
        width: 120px;
        height: 120px;
        border-radius: 50%;
        overflow: hidden;
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        z-index: 1000;
      }

      .compatibility-logo {
        width: 100px;
        height: 100px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        object-fit: contain;
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

      <!-- Title section -->
      <div class="title-section">
        <div class="title-container">
          <div class="title-background">
            <img class="title-bg-image" src="${backgroundImage}" alt="Title background" />
          </div>
          <h1 class="main-title" data-field="title">{{title}}</h1>
          <p class="subtitle" data-field="subtitle">Compatibility Analysis</p>
        </div>
      </div>

      <!-- Compatibility factors -->
      <div class="compatibility-factors">
        {{#each compatibilityFactors}}
        <div class="compatibility-factor">
          <div class="factor-header">
            <div class="factor-icon-circle">
              <img src="{{icon}}" alt="{{name}}" class="factor-icon" />
            </div>
            <div class="factor-content">
              <h2 class="factor-name">{{name}}</h2>
              <p class="factor-description">{{description}}</p>
            </div>
          </div>
        </div>
        {{/each}}
      </div>

      <!-- Logo -->
      <div class="compatibility-logo-circle">
        <img
          src="${compatibilityLogoImage}"
          alt="Compatibility Logo"
          class="compatibility-logo"
        />
      </div>
    </main>
  </body>
</html>
`;

export default page16;
