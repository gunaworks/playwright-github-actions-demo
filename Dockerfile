FROM mcr.microsoft.com/playwright:bionic
WORKDIR /app
COPY package.json package-lock.json ./
COPY . .
CMD ["npx", "playwright", "test"]