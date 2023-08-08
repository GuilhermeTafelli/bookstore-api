FROM --platform=linux/amd64 node:14.19.0-alpine3.14

RUN apk update

WORKDIR /app

COPY package.json ./
COPY tsconfig.json ./
COPY .env ./
COPY tsconfig.build.json ./
COPY nest-cli.json ./
COPY src ./src
COPY prisma ./prisma
COPY test ./test


RUN npm install
RUN npm run generate:mongo
RUN npm run build

EXPOSE 8081

CMD ["npm", "start"]