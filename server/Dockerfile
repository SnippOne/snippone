FROM node:lts-alpine

WORKDIR /usr/src/app

COPY ./package.json /usr/src/app/
COPY ./package-lock.json /usr/src/app/

COPY . .

RUN npm install

EXPOSE 3000

USER node

ENTRYPOINT npm run start

