FROM node:20-bookworm-slim

RUN apt-get update && apt-get upgrade -y --no-install-recommends && apt-get install -y --no-install-recommends \
  chromium \
  libx11-xcb1 \
  libxcomposite1 \
  libxdamage1 \
  libxfixes3 \
  libxi6 \
  libnss3 \
  libatk-bridge2.0-0 \
  libgtk-3-0 \
  libasound2 \
  && apt-get clean && rm -rf /var/lib/apt/lists/*

ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium
ENV PUPPETEER_SKIP_DOWNLOAD=1
ENV NODE_ENV=production

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
RUN npm prune --omit=dev

RUN chown -R node:node /app
USER node

CMD ["node", "dist/index.js"]