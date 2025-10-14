import { readFileSync } from 'fs';
import * as path from 'path';
import { importImage, importFont } from './asset-utils';

// Import assets using the utility functions
const backgroundImage = importImage('./assets/42f5f08ef641c8905bce22bcfc3beff15ee79e7b.png');
const thunderSemiBoldFont = importFont('../assets/fonts/Thunder-SemiBoldLC.ttf');
const thunderMediumFont = importFont('../assets/fonts/Thunder-MediumLC.ttf');
const rethinkSansRegularFont = importFont('../assets/fonts/RethinkSans-Regular.ttf');
const rethinkSansBoldFont = importFont('../assets/fonts/RethinkSans-Bold.ttf');

// Import additional assets
const groupImage = importImage('./assets/Group-7202.png');
const decorativeImage = importImage('./assets/a2c3fa0ad93d104d1bf520806ab6c140d3081e7d.png');

const page10 = `<!DOCTYPE html>
<html lang="tr">
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

      /* Background layer - using Page1 background for consistency */
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

      /* Fonts */
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

      /* Title section - consistent with Page1 */
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

      /* Main content area */
      .content-section {
        position: absolute;
        left: 41px;
        top: 220px;
        width: 513px;
        height: 500px;
        z-index: 1;
        overflow-y: auto;
      }

      /* Decorative elements for better UI experience */
      .decorative-element {
        position: absolute;
        opacity: 0.3;
        z-index: 0;
      }

      .decorative-top-right {
        top: 50px;
        right: 20px;
        width: 80px;
        height: 80px;
      }

      .decorative-bottom-left {
        bottom: 50px;
        left: 20px;
        width: 60px;
        height: 60px;
      }

      /* Main illustration */
      .main-illustration {
        width: 100%;
        height: 200px;
        object-fit: cover;
        border-radius: 17px;
        margin-bottom: 20px;
      }

      /* Sections */
      .section-item {
        padding: 20px;
        margin-bottom: 20px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 17px;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
      }

      .section-item + .section-item {
        margin-top: 16px;
      }

      .section-header {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 7px;
        text-align: left;
      }

      .section-content {
        flex: 1;
        margin: 0;
        padding: 0;
        min-width: 0;
      }

      /* Section titles */
      .section-title {
        font-family: "Rethink Sans", system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
        font-weight: 700;
        font-size: 16px;
        line-height: 100%;
        margin: 0;
        color: rgba(255, 255, 255, 1);
      }

      .section-subtitle {
        font-family: "Rethink Sans", system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
        font-weight: 400;
        font-size: 12px;
        margin: 0;
        color: rgba(255, 255, 255, 1);
        text-rendering: optimizeLegibility;
        hyphens: auto;
        overflow-wrap: anywhere;
      }

      /* Specialized titles */
      .section-title-large {
        font-family: "Rethink Sans", system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
        font-weight: 700;
        font-size: 20px;
        margin: 0;
        color: rgba(255, 255, 255, 1);
      }

      .section-title-medium {
        font-family: "Rethink Sans", system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
        font-weight: 700;
        font-size: 18px;
        margin: 0;
        color: rgba(255, 255, 255, 1);
      }

      .section-subtitle-compact {
        font-family: "Rethink Sans", system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
        font-weight: 400;
        font-size: 12px;
        margin: 0;
        color: rgba(255, 255, 255, 1);
      }

      /* Nested sections */
      .nested-section-item {
        display: flex;
        align-items: flex-start;
        margin-bottom: 16px;
        padding-top: 8px;
        width: 100%;
      }

      .nested-section-header {
        margin-bottom: 8px;
      }

      .nested-section-content {
        margin-top: 15px;
      }

      /* Numbered component */
      .numbered-component {
        width: 28px;
        height: 28px;
        margin-right: 12px;
        position: relative;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 51px;
        box-shadow: 0px 4px 16px 0px #00000026;
        backdrop-filter: blur(0px);
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: "Rethink Sans", system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
        font-weight: 700;
        font-size: 14px;
        line-height: 100%;
        color: rgba(255, 255, 255, 1);
        float: left;
      }
      
      .numbered-component::before {
        content: "";
        position: absolute;
        inset: 0;
        padding: 1px;
        background: linear-gradient(178.63deg, #ffffff -137.36%, rgba(255, 255, 255, 0) 75.38%);
        border-radius: 51px;
        mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        mask-composite: exclude;
        -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
      }
    </style>
  </head>
  <body>
    <main class="sheet">
      <!-- Background layer - using Page1 background for consistency -->
      <div class="background-layer">
        <img class="background-image" src="${backgroundImage}" alt="Background" />
        <div class="background-gradient"></div>
        <div class="background-overlay"></div>
      </div>

      <!-- Decorative elements for better UI experience -->
      <img class="decorative-element decorative-top-right" src="${decorativeImage}" alt="Decorative element" />
      <img class="decorative-element decorative-bottom-left" src="${decorativeImage}" alt="Decorative element" />

      <!-- Title section -->
      <div class="title-section">
        <div class="title-container">
          <div class="title-background">
            <img class="title-bg-image" src="${backgroundImage}" alt="Title background" />
          </div>
          <h1 class="main-title" data-field="title">{{title}}</h1>
          <div class="subtitle-container">
            <p class="subtitle" data-field="subtitle">Love Connection Analysis</p>
            <p class="subtitle" data-field="subtitle">Compatibility Insights</p>
          </div>
        </div>
      </div>

      <!-- Main content section -->
      <div class="content-section">
        <!-- Main illustration -->
        <img class="main-illustration" src="${groupImage}" alt="Love Connection Illustration" />

        <!-- Dynamic Sections -->
        {{#each sections}}
          <div class="section-item">
            <div class="section-header">
              <h2 class="section-title">
                {{title}}
              </h2>
              <p class="section-subtitle">
                {{subtitle}}
              </p>
            </div>
            <div class="section-content">
              <!-- Additional content can be added here -->
            </div>
          </div>
        {{/each}}

        <!-- Fourth Section - Bad Time For -->
        <div class="section-item">
          <div class="section-header">
            <h2 class="section-title-large">{{bad_time_section.title}}</h2>
          </div>
          <div class="section-content nested-section-content">
            {{#each bad_time_section.items}}
              <!-- Dynamic item -->
              <div class="nested-section-item">
                <div class="numbered-component">{{number}}</div>
                <div class="section-header nested-section-header">
                  <h3 class="section-title-medium">{{title}}</h3>
                  <p class="section-subtitle-compact">
                    {{subtitle}}
                  </p>
                </div>
              </div>
            {{/each}}
          </div>
        </div>
      </div>
    </main>
  </body>
</html>
`;

export default page10;
