FROM node:20-slim

WORKDIR /app

COPY package*.json ./

RUN npm ci --production

COPY . .

CMD [ "npm", "start", "main" ]
