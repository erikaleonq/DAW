FROM node:18
#directorio de trabajo en el contenedor
WORKDIR /usr/src/api
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]