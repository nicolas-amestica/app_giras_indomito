FROM node:22-alpine3.20

WORKDIR /server
COPY package*.json .
RUN npm install

EXPOSE 3000

COPY . .

CMD npm start
