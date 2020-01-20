FROM node:13.6-slim

WORKDIR /srv/app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 7000

CMD ["node", "bin/www"]


