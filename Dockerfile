FROM node:22-alpine3.20

WORKDIR /usr/src/app

COPY ./apps/api/ .

RUN npm install -g pnpm
RUN pnpm install

RUN npm run build

RUN rm -rf ./src

EXPOSE 4000

CMD ["npm", "run", "start:prod"]