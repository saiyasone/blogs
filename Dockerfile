FROM node:20-alpine

WORKDIR /src/

COPY package*.json ./

RUN yarn install

# RUN npx prisma generate

COPY . .

COPY .env .env

EXPOSE 5200

CMD ["yarn", "dev"]