FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install -g pm2

COPY . .

EXPOSE 3000

CMD ["pm2-runtime", "ecosystem.config.cjs"]