FROM node:10.16.0
RUN npm install -g --unsafe-perm prisma2@2.0.0-preview-12

RUN mkdir /app
WORKDIR /app

COPY package*.json /app
COPY prisma /app/prisma/
COPY src /app/src

ARG MYSQL_URL
ENV MYSQL_URL "$MYSQL_URL"

RUN npm install
RUN npm audit fix --force

RUN prisma2 generate

CMD ["npm", "start" ]