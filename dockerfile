FROM node

WORKDIR /usr/app/

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5672 15672

CMD ["npm", "run", "dev"]