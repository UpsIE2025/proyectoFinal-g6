# Informe Académico del Proyecto Final

## Introducción

Este informe describe el desarrollo y la implementación de una aplicación web utilizando React y Vite. La aplicación se centra en la gestión de estudiantes y cursos, integrando tecnologías como GraphQL y Auth0 para la autenticación y autorización.

## Objetivos

- Desarrollar una aplicación web para la gestión de estudiantes y cursos.
- Implementar autenticación y autorización utilizando Auth0.
- Utilizar GraphQL para la comunicación con el servidor.
- Dockerizar la aplicación para facilitar su despliegue y ejecución.

## Tecnologías Utilizadas

- **React**: Biblioteca de JavaScript para construir interfaces de usuario.
- **Vite**: Herramienta de construcción rápida para proyectos de frontend.
- **GraphQL**: Lenguaje de consulta para APIs.
- **Auth0**: Plataforma de autenticación y autorización.
- **Docker**: Plataforma para desarrollar, enviar y ejecutar aplicaciones en contenedores.

## Estructura del Proyecto

El proyecto está organizado de la siguiente manera:

proyectoFinal-g6/ ├── msoft_app/ │ ├── app/ │ │ ├── src/ │ │ │ ├── components/ │ │ │ ├── graphql/ │ │ │ ├── pages/ │ │ │ ├── App.jsx │ │ │ ├── index.jsx │ │ ├── .env │ │ ├── Dockerfile │ │ ├── README.md ├── docker-compose.yml

## Configuración del Entorno

### Variables de Entorno

El archivo `.env` contiene las siguientes variables de entorno:

```properties
VITE_AUTH0_DOMAIN=dev-xixaidu4.us.auth0.com
VITE_APP_AUTH0_CLIENT_ID=BSTpScSwngSGgrm7NvRU0oLmtz9TmtEA
VITE_APP_AUTH0_AUDIENCE=https://dev-xixaidu4.us.auth0.com/api/v2
VITE_APP_GRAPHQL_URI=http://localhost:4000/graphql
```

Docker
El archivo Dockerfile y docker-compose.yml se utilizan para construir y ejecutar la aplicación en contenedores Docker.

Dockerfile

```sh
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
CMD ["serve", "-s", "build", "-l", "5000"]
```

docker-compose.yml

version: '3.8'

```sh
services:
  app:
    build:
      context: ./app
      dockerfile: Dockerfile
    ports:
      - "5000:5000"
    env_file:
      - ./app/.env
    volumes:
      - ./app:/app
```

## Implementación

### Autenticación y Autorización

Se utilizó Auth0 para gestionar la autenticación y autorización de los usuarios. La configuración se realizó en el archivo .env y se integró en la aplicación mediante el uso de hooks de Auth0.

### GraphQL

Se implementaron consultas y mutaciones de GraphQL para gestionar los datos de estudiantes y cursos. Las consultas y mutaciones se definieron en el directorio graphql.

### Dockerización

La aplicación se dockerizó para facilitar su despliegue y ejecución. Se crearon los archivos Dockerfile y docker-compose.yml para construir y ejecutar la aplicación en contenedores Docker.

## Conclusión

Este proyecto demuestra la integración de diversas tecnologías modernas para el desarrollo de una aplicación web completa. La utilización de React, Vite, GraphQL, Auth0 y Docker permite construir una aplicación robusta, segura y fácil de desplegar.
