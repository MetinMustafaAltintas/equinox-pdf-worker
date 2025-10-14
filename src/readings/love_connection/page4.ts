import { readFileSync } from 'fs';
import * as path from 'path';
import { importImage, importFont } from './asset-utils';

// Import assets using the utility functions
const thunderSemiBoldFont = importFont('../assets/fonts/Thunder-SemiBoldLC.ttf');
const thunderMediumFont = importFont('../assets/fonts/Thunder-MediumLC.ttf');
const rethinkSansRegularFont = importFont('../assets/fonts/RethinkSans-Regular.ttf');
const rethinkSansBoldFont = importFont('../assets/fonts/RethinkSans-Bold.ttf');

// Import background image from Page1
const backgroundImage = importImage('./assets/42f5f08ef641c8905bce22bcfc3beff15ee79e7b.png');
const groupImage = importImage('./assets/Group-7202.png');
const secondaryImage = importImage('./assets/a2c3fa0ad93d104d1bf520806ab6c140d3081e7d.png');

const page4 = `<!DOCTYPE html>
<html lang="tr">
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
      @page {
        size: A4;
        margin: 16mm;
      }

      html,
      body {
        margin: 0;
        padding: 0;
      }

      body {
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
        background: #ffffff;
        color: #111827;
        font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial;
        overflow: hidden;
      }

      .sheet {
        width: 595px;
        height: 842px;
        position: relative;
        background: #ffffff;
        box-sizing: border-box;
        overflow: hidden;
      }

      /* Background layer - same as Page1 */
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
        body {
          background: #fff;
        }
        .sheet {
          margin: 0;
          box-shadow: none;
          border-radius: 0;
        }
      }

      /* Font declarations */
      @font-face {
        font-family: "Thunder LC";
        src: local("Thunder SemiBold LC"), local("Thunder-SemiBoldLC"),
          url("${thunderSemiBoldFont}") format("truetype");
        font-weight: 600;
        font-style: normal;
        font-display: swap;
        font-synthesis-weight: none;
      }

      @font-face {
        font-family: "Thunder LC";
        src: local("Thunder Medium LC"), local("Thunder-MediumLC"),
          url("${thunderMediumFont}") format("truetype");
        font-weight: 500;
        font-style: normal;
        font-display: swap;
        font-synthesis-weight: none;
      }

      @font-face {
        font-family: "Rethink Sans";
        src: url("${rethinkSansRegularFont}") format("ttf"),
          url("${rethinkSansRegularFont}") format("truetype");
        font-weight: 400;
        font-style: normal;
        font-display: swap;
        font-synthesis: none;
      }

      @font-face {
        font-family: "Rethink Sans";
        src: url("${rethinkSansBoldFont}") format("ttf"),
          url("${rethinkSansBoldFont}") format("truetype");
        font-weight: 700;
        font-style: normal;
        font-display: swap;
        font-synthesis: none;
      }

      /* Title card */
      .title-card {
        display: inline-block;
        padding: 18.5px 23.5px;
        margin: 0 auto;
        max-width: 548px;
        position: relative;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 17px;
        box-shadow: 0px 8px 32px 0px #00000026;
        backdrop-filter: blur(0px);
        overflow: hidden;
        text-align: center;
      }

      .title-card::before {
        content: "";
        position: absolute;
        inset: 0;
        padding: 0.5px;
        background: linear-gradient(
          178.63deg,
          #ffffff -137.36%,
          rgba(255, 255, 255, 0) 75.38%
        );
        border-radius: 17px;
        mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        mask-composite: exclude;
        -webkit-mask: linear-gradient(#fff 0 0) content-box,
          linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
      }

      .title {
        font-family: "Thunder LC", system-ui, -apple-system, Segoe UI, Roboto,
          "Helvetica Neue", Arial, sans-serif;
        font-weight: 600;
        font-size: 28px;
        text-transform: uppercase;
        margin: 0;
        color: rgba(255, 255, 255, 1);
        text-align: center;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
      }

      /* Section styling */
      .section-item {
        padding: 20px;
        max-width: 600px;
        margin: 0 auto;
        position: relative;
      }

      .section-item::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 548px;
        height: 1px;
        background: #ffffff33;
      }

      .section-item:nth-child(3)::after,
      .section-item:nth-child(4)::after {
        display: none;
      }
      .section-item:not(:last-of-type)::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 548px;
        height: 1px;
        background: #ffffff33;
      }
      /* --- Yalnızca HTML/CSS ile progress kontrolü (pathLength=100) --- */
      .progress-ring {
        stroke-dasharray: 100;
        stroke-dashoffset: calc(100 - var(--pct));
        transition: stroke-dashoffset 0.3s ease;
      }
      .section-header {
        display: flex;
        align-items: flex-start;
        gap: 18px;
        width: 548px;
        margin: 0 auto;
        position: relative;
      }

      .section-content {
        flex: 1;
        margin: 0;
        padding: 0;
        min-width: 0;
      }

      /* Circle base styles */
      .section-circle,
      .mini-circle {
        border-radius: 50%;
        position: relative;
        overflow: hidden;
        isolation: isolate;
        background: #ffffff14;
        backdrop-filter: blur(25.3415px);
        box-shadow: 0px 12.67px 50.68px 0px #00000026;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }

      .section-circle {
        width: 147px;
        height: 147px;
        --ring-gradient: 2.5px;
        --ring-solid: 7.92px;
      }

      .mini-circle {
        width: 93px;
        height: 93px;
        --ring-gradient: 1.5px;
        --ring-solid: 4.6px;
        margin-bottom: 12px;
      }

      /* Ring effects */
      .section-circle::before,
      .section-circle::after,
      .mini-circle::before,
      .mini-circle::after {
        content: "";
        position: absolute;
        inset: 0;
        border-radius: 50%;
        z-index: 1;
        pointer-events: none;
        -webkit-mask: linear-gradient(#000 0 0) content-box,
          linear-gradient(#000 0 0);
        -webkit-mask-composite: xor;
        mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
        mask-composite: exclude;
      }

      .section-circle::before,
      .mini-circle::before {
        padding: var(--ring-solid);
        background: #ffffff33;
        z-index: 1;
      }

      .section-circle::after,
      .mini-circle::after {
        padding: var(--ring-gradient);
        background: linear-gradient(
          182.96deg,
          #ffffff -145.88%,
          rgba(255, 255, 255, 0) 67.92%
        );
        z-index: 2;
      }

      /* Icons */
      .section-icon {
        width: 50px;
        height: 50px;
        margin-bottom: 8px;
      }

      .mini-icon {
        width: 36px;
        height: 36px;
        margin-bottom: 6px;
      }

      /* Percentage text */
      .section-percentage {
        font-family: "Rethink Sans", system-ui, -apple-system, Segoe UI, Roboto,
          Arial, sans-serif;
        font-weight: 700;
        font-size: 31.68px;
        line-height: 100%;
        margin: 0;
        color: rgba(255, 255, 255, 1);
        text-align: center;
      }

      .mini-percentage {
        font-family: "Rethink Sans", system-ui, -apple-system, Segoe UI, Roboto,
          Arial, sans-serif;
        font-weight: 700;
        font-size: 16px;
        line-height: 100%;
        margin: 0;
        color: rgba(255, 255, 255, 1);
        text-align: center;
      }

      /* Titles */
      .section-title {
        font-family: "Rethink Sans", system-ui, -apple-system, Segoe UI, Roboto,
          Arial, sans-serif;
        font-weight: 700;
        font-size: 16px;
        line-height: 100%;
        margin: 0 0 7px 0;
        color: rgba(255, 255, 255, 1);
      }

      .mini-title {
        font-family: "Rethink Sans", system-ui, -apple-system, Segoe UI, Roboto,
          Arial, sans-serif;
        font-weight: 700;
        font-size: 16px;
        line-height: 100%;
        margin: 0;
        color: rgba(255, 255, 255, 1);
        text-align: center;
      }

      /* Subtitle */
      .section-subtitle {
        font-family: "Rethink Sans", system-ui, -apple-system, Segoe UI, Roboto,
          Arial, sans-serif;
        font-weight: 400;
        font-size: 12px;
        margin: 0;
        color: #fff;
        font-kerning: normal;
        font-feature-settings: "kern" 1, "liga" 1;
        hyphens: none;
        -webkit-hyphens: none;
        -ms-hyphens: none;
        overflow-wrap: normal;
        word-break: normal;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
      }

      /* Four circles container */
      .four-circles-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 548px;
        margin: 0 auto;
        position: relative;
      }

      .mini-circle-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex: 0 0 auto;
        position: relative;
      }

      /* SVG progress circles */
      .progress-svg,
      .section-progress-svg {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        z-index: 3;
        pointer-events: none;
      }

      .progress-svg circle,
      .section-progress-svg circle {
        transition: stroke-dashoffset 0.3s ease;
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

      <!-- Title card -->
      <div style="text-align: center; position: relative; z-index: 2; padding-top: 54px;">
        <div class="title-card">
          <h1 class="title">{{title}}</h1>
        </div>
      </div>

      <!-- Main section -->
      <div class="section-item" style="position: relative; z-index: 2;">
        <div class="section-header" style="align-items: center">
          <div class="section-circle">
            <svg
              class="section-progress-svg"
              viewBox="0 0 100 100"
              style="--pct: {{mainSection.percentage}};"
            >
              <defs>
                <linearGradient
                  id="section-gradient"
                  x1="0%"
                  y1="0%"
                  x2="35%"
                  y2="30%"
                >
                  <stop offset="0%" stop-color="rgba(72, 9, 145, 0)" />
                  <stop
                    offset="12.37%"
                    stop-color="rgba(89, 15, 150, 0.1331)"
                  />
                  <stop
                    offset="29.01%"
                    stop-color="rgba(134, 29, 163, 0.3976)"
                  />
                  <stop
                    offset="62.08%"
                    stop-color="rgba(206, 53, 184, 0.7651)"
                  />
                  <stop offset="91.99%" stop-color="#FF45C7" />
                  <stop offset="100%" stop-color="#FF45C7" />
                </linearGradient>
              </defs>
              <circle
                cx="50"
                cy="50"
                r="47.7"
                fill="none"
                stroke="rgba(255, 255, 255, 0)"
                stroke-width="10"
                pathLength="100"
              />
              <circle
                class="progress-ring"
                cx="50"
                cy="50"
                r="47.7"
                fill="none"
                stroke="url(#section-gradient)"
                stroke-width="10"
                stroke-linecap="round"
                transform="rotate(-90 50 50)"
                pathLength="100"
              />
            </svg>
            <img
              src="${groupImage}"
              alt="Main Section Icon"
              class="section-icon"
            />
            <span class="section-percentage">{{mainSection.percentage}}%</span>
          </div>
          <div class="section-content">
            <h2 class="section-title">{{mainSection.title}}</h2>
            <p class="section-subtitle">{{mainSection.subtitle}}</p>
          </div>
        </div>
      </div>

      <!-- Mini circles section -->
      <div class="section-item" style="position: relative; z-index: 2;">
        <div class="four-circles-container">
          {{#each miniSections}}
          <div class="mini-circle-item">
            <div class="mini-circle">
              <svg
                class="progress-svg"
                viewBox="0 0 100 100"
                style="--pct: {{percentage}};"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="47.7"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.2)"
                  stroke-width="3.5"
                  pathLength="100"
                />
                <circle
                  class="progress-ring"
                  cx="50"
                  cy="50"
                  r="47.7"
                  fill="none"
                  stroke="#ffffff"
                  stroke-width="3.5"
                  stroke-linecap="round"
                  transform="rotate(-90 50 50)"
                  pathLength="100"
                />
              </svg>
              <img src="${secondaryImage}" alt="{{title}} Icon" class="mini-icon" />
              <span class="mini-percentage">{{percentage}}%</span>
            </div>
            <h3 class="mini-title">{{title}}</h3>
          </div>
          {{/each}}
        </div>
      </div>

      <!-- Summary section -->
      <div class="section-item" style="position: relative; z-index: 2;">
        <div class="section-header" style="justify-content: flex-start">
          <div class="section-content">
            <h2 class="section-title">{{summary.title}}</h2>
            <p class="section-subtitle">{{summary.subtitle}}</p>
          </div>
        </div>
      </div>
    </main>
  </body>
</html>
`;

export default page4;
