import { readFileSync } from 'fs';
import * as path from 'path';
import { importImage, importFont } from './asset-utils';

// Import assets using the utility functions - same background as page1
const backgroundImage = importImage('./assets/42f5f08ef641c8905bce22bcfc3beff15ee79e7b.png');
const thunderSemiBoldFont = importFont('../assets/fonts/Thunder-SemiBoldLC.ttf');
const thunderMediumFont = importFont('../assets/fonts/Thunder-MediumLC.ttf');
const rethinkSansRegularFont = importFont('../assets/fonts/RethinkSans-Regular.ttf');
const rethinkSansBoldFont = importFont('../assets/fonts/RethinkSans-Bold.ttf');

// Create grouped PNG assets for better performance
const compatibilityChart = importImage('./assets/Group-7202.png');
const decorativeElements = importImage('./assets/a2c3fa0ad93d104d1bf520806ab6c140d3081e7d.png');

const page8 = `<!DOCTYPE html>
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
        padding: 30px;
        height: 100%;
        display: flex;
        flex-direction: column;
        gap: 25px;
      }

      /* Title section */
      .title-section {
        display: flex;
        justify-content: center;
        margin-bottom: 20px;
      }

      .title-container {
        backdrop-filter: blur(20px);
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.3);
        border-radius: 20px;
        padding: 20px 35px;
        text-align: center;
        box-shadow: 0px 8px 32px 0px rgba(0, 0, 0, 0.15);
        max-width: 450px;
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

      /* Main content grid */
      .main-content {
        flex: 1;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 25px;
        align-items: start;
      }

      /* Left column - Compatibility insights */
      .compatibility-section {
        display: flex;
        flex-direction: column;
        gap: 20px;
      }

      .insight-card {
        backdrop-filter: blur(20px);
        background: rgba(255, 255, 255, 0.08);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 15px;
        padding: 20px;
        box-shadow: 0px 8px 32px 0px rgba(0, 0, 0, 0.1);
      }

      .insight-header {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 15px;
      }

      .insight-icon {
        width: 35px;
        height: 35px;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        color: white;
      }

      .insight-title {
        font-family: "Thunder LC", sans-serif;
        font-weight: 600;
        font-size: 16px;
        text-transform: uppercase;
        color: rgba(255, 255, 255, 1);
        margin: 0;
      }

      .insight-content {
        font-family: "Rethink Sans", sans-serif;
        font-weight: 400;
        font-size: 14px;
        line-height: 1.5;
        color: rgba(255, 255, 255, 0.9);
        margin: 0;
      }

      .insight-value {
        font-family: "Rethink Sans", sans-serif;
        font-weight: 700;
        font-size: 18px;
        color: rgba(255, 255, 255, 1);
        background: rgba(255, 255, 255, 0.1);
        padding: 8px 16px;
        border-radius: 10px;
        border: 1px solid rgba(255, 255, 255, 0.2);
        display: inline-block;
        margin-top: 10px;
      }

      /* Right column - Chart and visual elements */
      .chart-section {
        display: flex;
        flex-direction: column;
        gap: 20px;
        align-items: center;
      }

      .compatibility-chart {
        width: 200px;
        height: 200px;
        object-fit: contain;
        border-radius: 20px;
        backdrop-filter: blur(10px);
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        padding: 20px;
        box-shadow: 0px 8px 32px 0px rgba(0, 0, 0, 0.1);
      }

      .chart-description {
        backdrop-filter: blur(20px);
        background: rgba(255, 255, 255, 0.08);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 15px;
        padding: 15px;
        text-align: center;
        box-shadow: 0px 8px 32px 0px rgba(0, 0, 0, 0.1);
      }

      .chart-text {
        font-family: "Rethink Sans", sans-serif;
        font-weight: 400;
        font-size: 13px;
        line-height: 1.4;
        color: rgba(255, 255, 255, 0.8);
        margin: 0;
      }

      /* Decorative elements */
      .decorative-elements {
        position: absolute;
        inset: 0;
        pointer-events: none;
        z-index: 1;
      }

      .decorative-circle {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
      }

      .circle-1 {
        width: 60px;
        height: 60px;
        top: 80px;
        right: 60px;
      }

      .circle-2 {
        width: 40px;
        height: 40px;
        bottom: 100px;
        left: 40px;
      }

      .circle-3 {
        width: 30px;
        height: 30px;
        top: 300px;
        left: 70px;
      }

      .circle-4 {
        width: 45px;
        height: 45px;
        bottom: 200px;
        right: 80px;
      }

      /* Responsive adjustments */
      @media (max-width: 600px) {
        .main-content {
          grid-template-columns: 1fr;
        }
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

      <!-- Decorative elements -->
      <div class="decorative-elements">
        <div class="decorative-circle circle-1"></div>
        <div class="decorative-circle circle-2"></div>
        <div class="decorative-circle circle-3"></div>
        <div class="decorative-circle circle-4"></div>
      </div>

      <!-- Main content -->
      <div class="content-wrapper">
        <!-- Title section -->
        <div class="title-section">
          <div class="title-container">
            <h1 class="title" data-field="title">{{title}}</h1>
          </div>
        </div>

        <!-- Main content grid -->
        <div class="main-content">
          <!-- Left column - Compatibility insights -->
          <div class="compatibility-section">
            <div class="insight-card">
              <div class="insight-header">
                <div class="insight-icon">💕</div>
                <h3 class="insight-title">Overall Compatibility</h3>
              </div>
              <p class="insight-content" data-field="overallCompatibility">{{overallCompatibility}}</p>
              <div class="insight-value" data-field="compatibilityScore">{{compatibilityScore}}%</div>
            </div>

            <div class="insight-card">
              <div class="insight-header">
                <div class="insight-icon">⭐</div>
                <h3 class="insight-title">Strengths</h3>
              </div>
              <p class="insight-content" data-field="strengths">{{strengths}}</p>
            </div>

            <div class="insight-card">
              <div class="insight-header">
                <div class="insight-icon">⚖️</div>
                <h3 class="insight-title">Challenges</h3>
              </div>
              <p class="insight-content" data-field="challenges">{{challenges}}</p>
            </div>

            <div class="insight-card">
              <div class="insight-header">
                <div class="insight-icon">🌟</div>
                <h3 class="insight-title">Recommendations</h3>
              </div>
              <p class="insight-content" data-field="recommendations">{{recommendations}}</p>
            </div>
          </div>

          <!-- Right column - Chart and visual elements -->
          <div class="chart-section">
            <img class="compatibility-chart" src="${compatibilityChart}" alt="Compatibility Chart" />
            
            <div class="chart-description">
              <p class="chart-text" data-field="chartDescription">{{chartDescription}}</p>
            </div>

            <div class="insight-card">
              <div class="insight-header">
                <div class="insight-icon">🎯</div>
                <h3 class="insight-title">Key Insights</h3>
              </div>
              <p class="insight-content" data-field="keyInsights">{{keyInsights}}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  </body>
</html>`;

export default page8;
