FROM node:12.18.0

WORKDIR /app



COPY package*.json ./

RUN npm install

RUN mkdir -p /data/db
COPY . .

EXPOSE 3000
CMD [ "node", "./src/script/main.js" ]