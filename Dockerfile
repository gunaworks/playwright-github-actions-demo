FROM mcr.microsoft.com/playwright:bionic
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
CMD ["yarn", "test"]