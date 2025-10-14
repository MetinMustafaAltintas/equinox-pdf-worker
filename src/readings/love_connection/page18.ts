import { readFileSync } from 'fs';
import * as path from 'path';

// Import assets directly - using same background as page1
const backgroundImage = `data:image/png;base64,${readFileSync(path.join(__dirname, 'assets/42f5f08ef641c8905bce22bcfc3beff15ee79e7b.png'), 'base64')}`;
const thunderSemiBoldFont = `data:font/ttf;base64,${readFileSync(path.join(__dirname, '../assets/fonts/Thunder-SemiBoldLC.ttf'), 'base64')}`;
const thunderMediumFont = `data:font/ttf;base64,${readFileSync(path.join(__dirname, '../assets/fonts/Thunder-MediumLC.ttf'), 'base64')}`;
const rethinkSansRegularFont = `data:font/ttf;base64,${readFileSync(path.join(__dirname, '../assets/fonts/RethinkSans-Regular.ttf'), 'base64')}`;
const rethinkSansBoldFont = `data:font/ttf;base64,${readFileSync(path.join(__dirname, '../assets/fonts/RethinkSans-Bold.ttf'), 'base64')}`;

const page18 = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Love Connection - Page 18</title>
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
        padding: 40px;
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

      /* Main content area */
      .main-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 25px;
      }

      /* Content sections */
      .content-section {
        backdrop-filter: blur(20px);
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.3);
        border-radius: 20px;
        padding: 25px;
        box-shadow: 0px 8px 32px 0px rgba(0, 0, 0, 0.15);
      }

      .section-title {
        font-family: "Thunder LC", sans-serif;
        font-weight: 600;
        font-size: 20px;
        text-transform: uppercase;
        color: rgba(255, 255, 255, 1);
        margin: 0 0 15px 0;
        text-align: center;
      }

      .section-content {
        font-family: "Rethink Sans", sans-serif;
        font-weight: 400;
        font-size: 14px;
        line-height: 1.6;
        color: rgba(255, 255, 255, 0.9);
        text-align: center;
      }

      .section-content strong {
        font-weight: 700;
        color: rgba(255, 255, 255, 1);
      }

      /* Highlight boxes */
      .highlight-box {
        background: rgba(255, 255, 255, 0.15);
        border: 1px solid rgba(255, 255, 255, 0.4);
        border-radius: 12px;
        padding: 15px;
        margin: 10px 0;
        text-align: center;
      }

      .highlight-text {
        font-family: "Rethink Sans", sans-serif;
        font-weight: 700;
        font-size: 16px;
        color: rgba(255, 255, 255, 1);
        margin: 0;
      }

      /* Decorative elements */
      .decorative-element {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
      }

      .decorative-1 {
        width: 80px;
        height: 80px;
        top: 50px;
        right: 50px;
      }

      .decorative-2 {
        width: 60px;
        height: 60px;
        bottom: 80px;
        left: 50px;
      }

      .decorative-3 {
        width: 40px;
        height: 40px;
        top: 200px;
        left: 30px;
      }

      /* Icon styles */
      .icon {
        display: inline-block;
        width: 24px;
        height: 24px;
        margin: 0 8px;
        vertical-align: middle;
      }

      /* Responsive adjustments */
      @media (max-width: 600px) {
        .content-wrapper {
          padding: 20px;
        }
        
        .title {
          font-size: 24px;
        }
        
        .section-title {
          font-size: 18px;
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

      <!-- Main content -->
      <div class="content-wrapper">
        <!-- Title section -->
        <div class="title-section">
          <div class="title-container">
            <h1 class="title">CONCLUSION</h1>
          </div>
        </div>

        <!-- Main content area -->
        <div class="main-content">
          <!-- First content section -->
          <div class="content-section">
            <h2 class="section-title">Your Love Journey</h2>
            <div class="section-content">
              <p>Your compatibility analysis reveals a <strong>unique cosmic connection</strong> that transcends ordinary relationships. The alignment of your astrological profiles creates a foundation for deep understanding and mutual growth.</p>
              
              <div class="highlight-box">
                <p class="highlight-text">🌟 Your relationship has the potential for extraordinary harmony and lasting fulfillment</p>
              </div>
            </div>
          </div>

          <!-- Second content section -->
          <div class="content-section">
            <h2 class="section-title">Key Insights</h2>
            <div class="section-content">
              <p>The stars have aligned to bring you together in a way that combines <strong>emotional depth</strong> with <strong>practical compatibility</strong>. Your connection is built on mutual respect and shared values.</p>
              
              <div class="highlight-box">
                <p class="highlight-text">💫 Trust in the cosmic guidance that has brought you to this moment</p>
              </div>
            </div>
          </div>

          <!-- Third content section -->
          <div class="content-section">
            <h2 class="section-title">Moving Forward</h2>
            <div class="section-content">
              <p>As you continue your journey together, remember that <strong>love is a continuous process of growth and discovery</strong>. The insights from this analysis provide a roadmap for building an even stronger connection.</p>
              
              <div class="highlight-box">
                <p class="highlight-text">✨ Embrace the cosmic energy that flows between you</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Decorative elements -->
        <div class="decorative-element decorative-1"></div>
        <div class="decorative-element decorative-2"></div>
        <div class="decorative-element decorative-3"></div>
      </div>
    </main>
  </body>
</html>
`;

export default page18;
