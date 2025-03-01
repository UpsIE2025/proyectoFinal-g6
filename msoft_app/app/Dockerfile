# Usar una imagen base de Node.js
FROM node:18-alpine

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar el package.json y el package-lock.json
COPY package*.json ./

# Instalar TODAS las dependencias (incluyendo devDependencies)
RUN npm install

# Copiar el resto de la aplicación
COPY . .

# Verificar que Vite esté instalado
RUN npm list vite || npm install -g vite

# Construir la aplicación
RUN npm run build

# Instalar un servidor HTTP simple para servir la aplicación
RUN npm install -g serve

# Exponer el puerto en el que se ejecutará la aplicación
EXPOSE 5000

# Comando para ejecutar la aplicación
CMD ["serve", "-s", "dist", "-l", "5000"]
