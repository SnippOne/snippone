FROM nginx:stable-alpine

EXPOSE 80/tcp
EXPOSE 443/tcp

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]