import { readFileSync } from 'fs';
import * as path from 'path';

// Import assets directly
const thunderSemiBoldFont = `data:font/ttf;base64,${readFileSync(path.join(__dirname, '../assets/fonts/Thunder-SemiBoldLC.ttf'), 'base64')}`;
const rethinkSansRegularFont = `data:font/ttf;base64,${readFileSync(path.join(__dirname, '../assets/fonts/RethinkSans-Regular.ttf'), 'base64')}`;
const rethinkSansBoldFont = `data:font/ttf;base64,${readFileSync(path.join(__dirname, '../assets/fonts/RethinkSans-Bold.ttf'), 'base64')}`;
const periodLogoImage = `data:image/png;base64,${readFileSync(path.join(__dirname, '../assets/images/period-logo.png'), 'base64')}`;

const page11 = `<!DOCTYPE html>
<html lang="tr">
  <head>
    <meta charset="utf-8" />
    <title>{{title}}</title>
    <!-- Preload the title font for consistent first paint -->
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
        margin: 16mm;
      }

      html, body {
        margin: 0;
        padding: 0;
      }

      body {
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
        background: #f7f7f8;
        color: #111827;
        font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial;
      }

      /* A4 sheet layout */
      .sheet {
        width: 210mm;
        min-height: 297mm;
        margin: 12mm auto;
        background: #ffffff;
        box-sizing: border-box;
        position: relative;
      }

      .bg-cover {
        background-image: url("../assets/images/during-period-background.jpg");
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
      }

      @media print {
        body { background: #fff; }
        .sheet {
          margin: 0;
          box-shadow: none;
          border-radius: 0;
        }
      }

      /* === Font definitions === */
      @font-face {
        font-family: "Thunder LC";
        src: url("${thunderSemiBoldFont}") format("truetype");
        font-weight: 600;
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

      /* === Common glass effect styles === */
      .glass-effect {
        background: rgba(255, 255, 255, 0.1);
        overflow: hidden;
      }

      .glass-effect::before {
        content: "";
        position: absolute;
        inset: 0;
        padding: 0.5px;
        background: linear-gradient(178.63deg, #ffffff -137.36%, rgba(255, 255, 255, 0) 75.38%);
        mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        mask-composite: exclude;
        -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
      }

      /* === Component styles === */
      .title-card {
        display: inline-block;
        padding: 18.5px 23.5px;
        margin: 0 auto;
        position: relative;
        border-radius: 17px;
        box-shadow: 0px 8px 32px 0px #00000026;
        text-align: center;
        max-width: 548px;
      }

      .title-card::before {
        border-radius: 17px;
      }

      .title {
        font-family: "Thunder LC", system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
        font-weight: 600;
        font-size: 28px;
        text-transform: uppercase;
        margin: 0;
        color: #ffffff;
        text-align: center;
      }

      /* === Section layout === */
      .section-container {
        width: 548px;
        margin: 0 auto;
        padding-top: 20px;
        counter-reset: advice-counter;
      }

      .advice-item {
        display: flex;
        align-items: flex-start;
        margin-bottom: 16px;
        counter-increment: advice-counter;
      }

      .numbered-component {
        width: 39px;
        height: 39px;
        margin-right: 12px;
        position: relative;
        border-radius: 51px;
        box-shadow: 0px 4px 16px 0px #00000026;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: "Rethink Sans", system-ui, sans-serif;
        font-weight: 700;
        font-size: 14px;
        color: #ffffff;
        float: left;
      }
      
      .numbered-component::before {
        padding: 1px;
        border-radius: 51px;
      }

      .numbered-component::after {
        content: counter(advice-counter);
      }

      .advice-content {
        flex: 1;
      }

      .advice-title {
        font-family: "Rethink Sans", system-ui, sans-serif;
        font-weight: 700;
        font-size: 18px;
        margin: 0 0 4px 0;
        color: #ffffff;
      }

      .advice-description {
        font-family: "Rethink Sans", system-ui, sans-serif;
        font-weight: 400;
        font-size: 12px;
        margin: 0;
        color: #ffffff;
      }

      /* Bottom Right Profile Circle */
      .bottom-right-circle {
        position: absolute;
        bottom: 25px;
        right: 25px;
        width: 142px;
        height: 142px;
        border-radius: 50%;
        z-index: 1000;
      }

      .bottom-right-circle::before {
        padding: 1px;
        border-radius: 50%;
      }

      .bottom-right-icon {
        width: 127px;
        height: 127px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        object-fit: contain;
      }
    </style>
  </head>
  <body>
    <main class="sheet bg-cover" style="padding-top: 21px">
      <!-- Title card -->
      <div style="text-align: center;">
        <div class="title-card glass-effect">
          <h1 class="title">{{title}}</h1>
        </div>
      </div>

      <!-- Advice section -->
      <div class="section-container">
        {{#each adviceItems}}
        <div class="advice-item">
          <div class="numbered-component glass-effect"></div>
          <div class="advice-content">
            <h3 class="advice-title">{{title}}</h3>
            <p class="advice-description">
              {{description}}
            </p>
          </div>
        </div>
        {{/each}}
      </div>

      <!-- Bottom Right Component -->
      <div class="bottom-right-circle glass-effect">
        <img
          src="${periodLogoImage}"
          alt="Period Logo"
          class="bottom-right-icon"
        />
      </div>
    </main>
  </body>
</html>
`;

export default page11;
