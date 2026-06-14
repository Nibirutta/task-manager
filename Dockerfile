FROM node:24-alpine AS builder

WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json .

RUN npm ci

COPY . .

ARG VITE_API_URL
ENV VITE_API_BASE_URL=${VITE_API_URL}

RUN npm run build

FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*
RUN cp /etc/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf.bkp

COPY --from=builder /usr/src/app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]
