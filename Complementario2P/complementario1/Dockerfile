#iinstala magen
FROM node

#cread directorio de trabajo
WORKDIR /app

#crea los archiivos packge json al directorio
COPY package*.json ./ 

#instala dependencias

RUN npm install

# copia archivos en el container
COPY . .

# para ejecutar
CMD ["npm", "start"]
