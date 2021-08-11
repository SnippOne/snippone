# build stage
FROM node:lts-alpine as builder

WORKDIR /app

ARG NODE_ENV=development

COPY ./package.json /app/
COPY ./package-lock.json /app/

RUN npm install

COPY . .

RUN npm run build

# production stage
FROM nginx:stable-alpine as production

ARG NODE_ENV=production

COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

ENTRYPOINT ["nginx", "-g", "daemon off;"]