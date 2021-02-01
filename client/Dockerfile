FROM node:14.15.4-alpine

LABEL version="1.0"
LABEL description="This is the base docker image for the Controle Financeiro FrontEnd em React."
LABEL maintainer = ["ljrnavarro@gmail.com"]

ENV NODE_ENV=production

# Create app directory
RUN mkdir -p /usr/src/app/
WORKDIR /usr/src/app/

#Apagando so modulos
RUN rm -rf node_modules package-lock.json

# Install app dependencies
COPY ./client/package.json /usr/src/app/
RUN npm install

# Bundle app source
COPY . /usr/src/app

#Listando os arquivos
LABEL description="listando arquivos /app"
RUN ls /usr/src/app/client

EXPOSE 3000
CMD ["npm", "run", "web-start"]
