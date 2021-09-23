FROM mcr.microsoft.com/playwright:bionic
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
COPY ./run-tests.sh ./
RUN chmod +x run-tests.sh
ENTRYPOINT [ "./run-tests.sh" ]