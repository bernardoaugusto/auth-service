# BUILDER STAGE
FROM node:17.9.0 as builder
RUN npm install -g --unsafe-perm prisma2@2.0.0-preview-12

WORKDIR /usr/app

COPY package*.json ./

RUN npm install
RUN npm rebuild bcrypt --build-from-source

COPY . .

RUN npm run build


# RUNTIME STAGE
FROM node:17.9.0 as runtime

WORKDIR /usr/app

RUN npm i -g @nestjs/cli
ENV NODE_ENV=production

COPY --from=builder "/usr/app/dist/" "/usr/app/dist/"
COPY --from=builder "/usr/app/node_modules/" "/usr/app/node_modules/"
COPY --from=builder "/usr/app/package.json" "/usr/app/package.json"

RUN npm prune --production

CMD ["npm", "run", "start:prod"]
