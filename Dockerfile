
# STAGE 1
FROM node:18.16-alpine as builder
WORKDIR /usr/src/auth-service
COPY ./package*.json ./
RUN npm install --only=prod
COPY ./dist ./dist

EXPOSE 3000
CMD ["npm", "run", "start:prod"]