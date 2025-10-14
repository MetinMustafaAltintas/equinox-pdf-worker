import { readFileSync } from 'fs';
import * as path from 'path';
import { importImage, importFont } from './asset-utils';

// Import assets using the utility functions
const backgroundImage = importImage('./assets/42f5f08ef641c8905bce22bcfc3beff15ee79e7b.png');
const thunderSemiBoldFont = importFont('../assets/fonts/Thunder-SemiBoldLC.ttf');
const thunderMediumFont = importFont('../assets/fonts/Thunder-MediumLC.ttf');
const rethinkSansRegularFont = importFont('../assets/fonts/RethinkSans-Regular.ttf');
const rethinkSansBoldFont = importFont('../assets/fonts/RethinkSans-Bold.ttf');


const page17 = `<!DOCTYPE html>
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

      /* Background layer */
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
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
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

      /* Content section */
      .content-section {
        position: absolute;
        left: 41px;
        top: 220px;
        width: 513px;
        height: 580px;
        z-index: 2;
        overflow-y: auto;
        padding-right: 10px;
      }

      .content-container {
        width: 100%;
        counter-reset: advice-counter;
      }

      .advice-item {
        display: flex;
        align-items: flex-start;
        margin-bottom: 24px;
        counter-increment: advice-counter;
        position: relative;
      }

      .numbered-component {
        width: 42px;
        height: 42px;
        margin-right: 16px;
        position: relative;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.15);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: "Rethink Sans", sans-serif;
        font-weight: 700;
        font-size: 16px;
        color: white;
        flex-shrink: 0;
        box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
      }

      .numbered-component::after {
        content: counter(advice-counter);
      }

      .advice-content {
        flex: 1;
        background: rgba(255, 255, 255, 0.08);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.15);
        border-radius: 12px;
        padding: 16px;
        box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
      }

      .advice-title {
        font-family: "Rethink Sans", sans-serif;
        font-weight: 700;
        font-size: 16px;
        margin: 0 0 8px 0;
        color: white;
        line-height: 1.3;
      }

      .advice-description {
        font-family: "Rethink Sans", sans-serif;
        font-weight: 400;
        font-size: 13px;
        margin: 0;
        color: rgba(255, 255, 255, 0.9);
        line-height: 1.4;
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
        </div>
      </div>

      <!-- Content section -->
      <div class="content-section">
        <div class="content-container">
          {{#each adviceItems}}
          <div class="advice-item">
            <div class="numbered-component"></div>
            <div class="advice-content">
              <h3 class="advice-title">{{title}}</h3>
              <p class="advice-description">{{description}}</p>
            </div>
          </div>
          {{/each}}
        </div>
      </div>
    </main>
  </body>
</html>
`;

export default page17;
