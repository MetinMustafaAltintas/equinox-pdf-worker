import { readFileSync } from 'fs';
import * as path from 'path';
import { importImage, importFont } from './asset-utils';

// Import assets using the utility functions - same background as page1
const backgroundImage = importImage('./assets/42f5f08ef641c8905bce22bcfc3beff15ee79e7b.png');
const thunderSemiBoldFont = importFont('../assets/fonts/Thunder-SemiBoldLC.ttf');
const thunderMediumFont = importFont('../assets/fonts/Thunder-MediumLC.ttf');
const rethinkSansRegularFont = importFont('../assets/fonts/RethinkSans-Regular.ttf');
const rethinkSansBoldFont = importFont('../assets/fonts/RethinkSans-Bold.ttf');

// Page 19 specific assets - using placeholder assets for now
const mainIllustrationImage = importImage('./assets/Group-7202.png');
const decorativeElement1 = importImage('./assets/42f5f08ef641c8905bce22bcfc3beff15ee79e7b.png');
const decorativeElement2 = importImage('./assets/a2c3fa0ad93d104d1bf520806ab6c140d3081e7d.png');

const page19 = `<!DOCTYPE html>
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
        top: 200px;
        width: 500px;
        height: 580px;
        z-index: 1;
      }

      .content-container {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        gap: 30px;
        padding: 20px;
        box-sizing: border-box;
      }

      /* Main illustration */
      .main-illustration {
        width: 100%;
        height: 300px;
        object-fit: cover;
        border-radius: 17px;
        margin-bottom: 20px;
      }

      /* Content cards */
      .content-cards {
        display: flex;
        flex-direction: column;
        gap: 20px;
        flex: 1;
      }

      .content-card {
        background: rgba(255, 255, 255, 0.1);
        border-radius: 17px;
        padding: 20px;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        display: flex;
        flex-direction: column;
        gap: 15px;
      }

      .card-title {
        font-family: "Thunder LC", sans-serif;
        font-weight: 600;
        font-size: 20px;
        text-transform: uppercase;
        color: white;
        margin: 0;
        text-align: center;
      }

      .card-content {
        font-family: "Rethink Sans", sans-serif;
        font-weight: 400;
        font-size: 14px;
        line-height: 1.5;
        color: rgba(255, 255, 255, 0.9);
        margin: 0;
        text-align: center;
      }

      .card-highlight {
        font-family: "Rethink Sans", sans-serif;
        font-weight: 700;
        font-size: 16px;
        color: white;
        background: rgba(255, 255, 255, 0.1);
        padding: 8px 16px;
        border-radius: 12px;
        text-align: center;
        border: 1px solid rgba(255, 255, 255, 0.2);
      }

      /* Decorative elements */
      .decorative-element {
        position: absolute;
        opacity: 0.6;
        z-index: 0;
      }

      .decorative-1 {
        top: 100px;
        right: 30px;
        width: 80px;
        height: 80px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
      }

      .decorative-2 {
        bottom: 50px;
        left: 20px;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.08);
        border: 1px solid rgba(255, 255, 255, 0.15);
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
            <p class="subtitle" data-field="subtitle">Final Insights and Recommendations</p>
            <p class="subtitle" data-field="subtitle">Your Love Connection Journey</p>
          </div>
        </div>
      </div>

      <!-- Main content section -->
      <div class="content-section">
        <div class="content-container">
          <!-- Main illustration -->
          <img class="main-illustration" src="${mainIllustrationImage}" alt="Love Connection Final Illustration" />

          <!-- Content cards -->
          <div class="content-cards">
            <div class="content-card">
              <h2 class="card-title">Key Insights</h2>
              <p class="card-content" data-field="keyInsights">{{keyInsights}}</p>
              <div class="card-highlight" data-field="compatibilityScore">Overall Compatibility: {{compatibilityScore}}%</div>
            </div>

            <div class="content-card">
              <h2 class="card-title">Recommendations</h2>
              <p class="card-content" data-field="recommendations">{{recommendations}}</p>
            </div>

            <div class="content-card">
              <h2 class="card-title">Next Steps</h2>
              <p class="card-content" data-field="nextSteps">{{nextSteps}}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Decorative elements -->
      <div class="decorative-element decorative-1"></div>
      <div class="decorative-element decorative-2"></div>
    </main>
  </body>
</html>
`;

export default page19;
