import { readFileSync } from 'fs';
import * as path from 'path';

// Import assets directly - using same background as page1
const backgroundImage = `data:image/png;base64,${readFileSync(path.join(__dirname, 'assets/42f5f08ef641c8905bce22bcfc3beff15ee79e7b.png'), 'base64')}`;
const thunderSemiBoldFont = `data:font/ttf;base64,${readFileSync(path.join(__dirname, '../assets/fonts/Thunder-SemiBoldLC.ttf'), 'base64')}`;
const rethinkSansRegularFont = `data:font/ttf;base64,${readFileSync(path.join(__dirname, '../assets/fonts/RethinkSans-Regular.ttf'), 'base64')}`;
const rethinkSansBoldFont = `data:font/ttf;base64,${readFileSync(path.join(__dirname, '../assets/fonts/RethinkSans-Bold.ttf'), 'base64')}`;


const page13 = `<!DOCTYPE html>
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

      /* Font definitions */
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
    </style>
  </head>
  <body>
    <main class="sheet">
      <!-- Background layer -->
      <div class="background-layer">
        <img src="${backgroundImage}" alt="Background" class="background-image" />
      </div>

      <!-- Content layer -->
      <div style="position: relative; z-index: 1; padding: 40px; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center;">
        
        <!-- Main Title -->
        <div style="text-align: center; margin-bottom: 60px;">
          <h1 style="
            font-family: 'Thunder LC', system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
            font-weight: 600;
            font-size: 48px;
            color: #ffffff;
            text-transform: uppercase;
            margin: 0;
            text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);
            letter-spacing: 1px;
          ">{{title}}</h1>
        </div>

        <!-- Main Content Section -->
        <div style="
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          border-radius: 20px;
          padding: 40px;
          max-width: 500px;
          width: 100%;
          text-align: center;
          box-shadow: 0px 8px 32px rgba(0, 0, 0, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.2);
        ">
          <h2 style="
            font-family: 'Rethink Sans', system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
            font-weight: 700;
            font-size: 24px;
            color: #ffffff;
            margin: 0 0 20px 0;
            line-height: 1.2;
          ">{{mainSection.title}}</h2>
          
          <p style="
            font-family: 'Rethink Sans', system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
            font-weight: 400;
            font-size: 16px;
            color: rgba(255, 255, 255, 0.9);
            margin: 0 0 30px 0;
            line-height: 1.5;
          ">{{mainSection.subtitle}}</p>

          <!-- Percentage Display -->
          <div style="
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 30px 0;
          ">
            <div style="
              width: 120px;
              height: 120px;
              border-radius: 50%;
              background: rgba(255, 255, 255, 0.1);
              display: flex;
              align-items: center;
              justify-content: center;
              position: relative;
              border: 3px solid rgba(255, 255, 255, 0.3);
            ">
              <span style="
                font-family: 'Rethink Sans', system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
                font-weight: 700;
                font-size: 36px;
                color: #ffffff;
              ">{{mainSection.percentage}}%</span>
            </div>
          </div>
        </div>

        <!-- Additional Info Section -->
        {{#if summary}}
        <div style="
          margin-top: 40px;
          text-align: center;
          max-width: 500px;
        ">
          <h3 style="
            font-family: 'Rethink Sans', system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
            font-weight: 600;
            font-size: 18px;
            color: rgba(255, 255, 255, 0.9);
            margin: 0 0 10px 0;
          ">{{summary.title}}</h3>
          <p style="
            font-family: 'Rethink Sans', system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
            font-weight: 400;
            font-size: 14px;
            color: rgba(255, 255, 255, 0.7);
            margin: 0;
            line-height: 1.4;
          ">{{summary.subtitle}}</p>
        </div>
        {{/if}}

      </div>
    </main>
  </body>
</html>
`;

export default page13;
