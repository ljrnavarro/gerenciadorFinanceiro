FROM node:14.15.4-alpine

LABEL version="1.0"
LABEL description="This is the base docker image for the Controle Financeiro BackEnd em node."
LABEL maintainer = ["ljrnavarro@gmail.com"]

ENV NODE_ENV=production

# Create app directory
RUN mkdir -p /usr/src/app/
WORKDIR /usr/src/app/

#Apagando so modulos
RUN rm -rf node_modules package-lock.json

# Install app dependencies
COPY ./back/package.json /usr/src/app/
RUN npm install winston
RUN npm install winston-mongodb
RUN npm install -g nodemon && npm install

# Bundle app source
COPY . /usr/src/app

#Listando os arquivos
LABEL description="listando arquivos /app"
RUN ls /usr/src/app/back

EXPOSE 3001
CMD ["npm", "run", "start:prod"]
