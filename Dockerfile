FROM node:14-alpine

RUN apk --update add git

ENV PORT 80

ENV NODE_ENV production

WORKDIR /app

ADD . /app

RUN npm install

ENTRYPOINT node server.js
