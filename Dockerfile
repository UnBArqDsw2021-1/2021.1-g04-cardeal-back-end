FROM node:14.17-alpine

WORKDIR /app

COPY . .

ENTRYPOINT [ "npm" ,"start" ]