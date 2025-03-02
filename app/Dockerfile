FROM node:22-alpine3.20

RUN npm install -g @angular/cli @ionic/cli

WORKDIR /app
COPY package*.json .
RUN npm install

EXPOSE 8100

COPY . .

CMD ionic serve
