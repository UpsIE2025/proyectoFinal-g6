FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm list vite || npm install
RUN npm run build

# Instalar un servidor HTTP simple para servir la aplicación
RUN npm install --save serve
EXPOSE 3000
CMD ["npx", "serve", "-s", "dist", "-l", "3000"]
