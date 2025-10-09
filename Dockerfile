FROM node:20-bookworm-slim

# Chromium ve bağımlılıkları
RUN apt-get update && apt-get install -y \
    chromium \
    fonts-liberation \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libc6 \
    libcairo2 \
    libcups2 \
    libdbus-1-3 \
    libexpat1 \
    libfontconfig1 \
    libgcc1 \
    libglib2.0-0 \
    libgtk-3-0 \
    libnspr4 \
    libnss3 \
    libpango-1.0-0 \
    libx11-6 \
    libx11-xcb1 \
    libxau6 \
    libxcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxext6 \
    libxfixes3 \
    libxrandr2 \
    xdg-utils \
 && rm -rf /var/lib/apt/lists/*

# Puppeteer kendi Chromium'unu indirmesin; sistemdekini kullanacağız
ENV PUPPETEER_SKIP_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

# NPM çıktısı daha okunur olsun, audit/fund kapalı
ENV NPM_CONFIG_AUDIT=false
ENV NPM_CONFIG_FUND=false
ENV npm_config_loglevel=info

WORKDIR /app

# Sadece paket dosyalarını kopyala (cache için)
COPY package*.json ./

# Lockfile varsa ci, yoksa legacy-peer-deps ile install (peer çatışmalarını bypass)
RUN if [ -f package-lock.json ]; then \
      npm ci --no-audit --no-fund ; \
    else \
      npm install --legacy-peer-deps --no-audit --no-fund ; \
    fi

# Uygulama dosyaları
COPY . .

# Build
RUN npm run build

# Üretimde dev bağımlılıklarını at
RUN npm prune --omit=dev

# Non-root kullanıcı
RUN chown -R node:node /app
USER node

EXPOSE 8080
CMD ["node", "dist/index.js"]