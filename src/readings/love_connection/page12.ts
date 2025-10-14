import { readFileSync } from 'fs';
import * as path from 'path';
import { importImage, importFont } from './asset-utils';

// Import assets using the utility functions - same background as page1
const backgroundImage = importImage('./assets/42f5f08ef641c8905bce22bcfc3beff15ee79e7b.png');
const thunderSemiBoldFont = importFont('../assets/fonts/Thunder-SemiBoldLC.ttf');
const thunderMediumFont = importFont('../assets/fonts/Thunder-MediumLC.ttf');
const rethinkSansRegularFont = importFont('../assets/fonts/RethinkSans-Regular.ttf');
const rethinkSansBoldFont = importFont('../assets/fonts/RethinkSans-Bold.ttf');

// Business compatibility assets
const businessPartnerCompatibilityImage = importImage('../assets/images/business-partner-compatibility.png');
const businessImage = importImage('../assets/images/business.png');
const careerImage = importImage('../assets/images/career.png');
const communicationImage = importImage('../assets/images/communication.png');
const dependabilityImage = importImage('../assets/images/dependability.png');
const trustImage = importImage('../assets/images/trust.png');


const page12 = `<!DOCTYPE html>
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

      /* Main compatibility section */
      .compatibility-section {
        position: absolute;
        left: 47.5px;
        top: 200px;
        width: 500px;
        height: 600px;
        z-index: 1;
      }

      .compatibility-container {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        gap: 30px;
        padding: 20px;
        box-sizing: border-box;
      }

      .main-compatibility-card {
        background: rgba(255, 255, 255, 0.1);
        border-radius: 17px;
        padding: 20px;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        display: flex;
        align-items: center;
        gap: 20px;
      }

      .compatibility-circle {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.1);
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        flex-shrink: 0;
      }

      .compatibility-icon {
        width: 40px;
        height: 40px;
      }

      .compatibility-content {
        flex: 1;
      }

      .compatibility-title {
        font-family: "Rethink Sans", sans-serif;
        font-weight: 700;
        font-size: 18px;
        color: white;
        margin: 0 0 8px 0;
      }

      .compatibility-subtitle {
        font-family: "Rethink Sans", sans-serif;
        font-weight: 400;
        font-size: 14px;
        color: rgba(255, 255, 255, 0.8);
        margin: 0;
      }

      .compatibility-percentage {
        font-family: "Rethink Sans", sans-serif;
        font-weight: 700;
        font-size: 24px;
        color: white;
        margin: 0;
      }

      /* Mini compatibility cards */
      .mini-compatibility-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 15px;
        margin-top: 20px;
      }

      .mini-compatibility-card {
        background: rgba(255, 255, 255, 0.08);
        border-radius: 12px;
        padding: 15px;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.15);
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        text-align: center;
      }

      .mini-compatibility-circle {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.1);
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
      }

      .mini-compatibility-icon {
        width: 24px;
        height: 24px;
      }

      .mini-compatibility-title {
        font-family: "Rethink Sans", sans-serif;
        font-weight: 700;
        font-size: 12px;
        color: white;
        margin: 0;
      }

      .mini-compatibility-percentage {
        font-family: "Rethink Sans", sans-serif;
        font-weight: 700;
        font-size: 16px;
        color: white;
        margin: 0;
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
            <p class="subtitle" data-field="subtitle">Business Partner Compatibility Analysis</p>
            <p class="subtitle" data-field="subtitle">Professional Relationship Insights</p>
          </div>
        </div>
      </div>

      <!-- Main compatibility section -->
      <div class="compatibility-section">
        <div class="compatibility-container">
          <!-- Main Business Partner Compatibility Card -->
          <div class="main-compatibility-card">
            <div class="compatibility-circle">
              <img
                src="${businessPartnerCompatibilityImage}"
                alt="Business Partner Compatibility Icon"
                class="compatibility-icon"
              />
            </div>
            <div class="compatibility-content">
              <h2 class="compatibility-title">{{mainSection.title}}</h2>
              <p class="compatibility-subtitle">{{mainSection.subtitle}}</p>
            </div>
            <div class="compatibility-percentage">{{mainSection.percentage}}%</div>
          </div>

          <!-- Mini compatibility cards grid -->
          <div class="mini-compatibility-grid">
            <div class="mini-compatibility-card">
              <div class="mini-compatibility-circle">
                <img src="${businessImage}" alt="Business Icon" class="mini-compatibility-icon" />
              </div>
              <h3 class="mini-compatibility-title">Business</h3>
              <div class="mini-compatibility-percentage">{{miniSections.business.percentage}}%</div>
            </div>

            <div class="mini-compatibility-card">
              <div class="mini-compatibility-circle">
                <img src="${careerImage}" alt="Career Icon" class="mini-compatibility-icon" />
              </div>
              <h3 class="mini-compatibility-title">Career</h3>
              <div class="mini-compatibility-percentage">{{miniSections.career.percentage}}%</div>
            </div>

            <div class="mini-compatibility-card">
              <div class="mini-compatibility-circle">
                <img src="${communicationImage}" alt="Communication Icon" class="mini-compatibility-icon" />
              </div>
              <h3 class="mini-compatibility-title">Communication</h3>
              <div class="mini-compatibility-percentage">{{miniSections.communication.percentage}}%</div>
            </div>

            <div class="mini-compatibility-card">
              <div class="mini-compatibility-circle">
                <img src="${dependabilityImage}" alt="Dependability Icon" class="mini-compatibility-icon" />
              </div>
              <h3 class="mini-compatibility-title">Dependability</h3>
              <div class="mini-compatibility-percentage">{{miniSections.dependability.percentage}}%</div>
            </div>

            <div class="mini-compatibility-card">
              <div class="mini-compatibility-circle">
                <img src="${trustImage}" alt="Trust Icon" class="mini-compatibility-icon" />
              </div>
              <h3 class="mini-compatibility-title">Trust</h3>
              <div class="mini-compatibility-percentage">{{miniSections.trust.percentage}}%</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </body>
</html>
`;

export default page12;
