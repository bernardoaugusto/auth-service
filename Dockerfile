FROM node:18.16-alpine as builder
WORKDIR /usr/src/auth-service
COPY ./package*.json ./
RUN npm install --only=prod