FROM node:12.13-alpine As api

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --production
ADD . /usr/src/app

CMD node --require './tracing.js' app.js