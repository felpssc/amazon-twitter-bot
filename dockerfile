FROM node:alpine

RUN apk update
RUN apk upgrade
RUN apk add ca-certificates && update-ca-certificates

RUN apk add --update tzdata
ENV TZ="America/Sao_Paulo"
RUN date

RUN rm -rf /var/cache/apk/*

RUN apk add --no-cache chromium

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
ENV CHROMIUM_PATH /usr/bin/chromium-browser

WORKDIR /usr/app/

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5672 15672

CMD ["npm", "run", "dev"]