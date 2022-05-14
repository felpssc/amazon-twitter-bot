FROM node

WORKDIR /user/app/

COPY package.json /user/app/

RUN npm install

COPY . /user/app/

EXPOSE 5672 15672

CMD ["npm", "run", "dev"]