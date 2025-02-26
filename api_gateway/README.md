# API Gateway - GraphQL

## **API Gateway**

Un API Gateway es un servidor que actúa como intermediario entre los clientes (como aplicaciones web, móviles o servicios) y un conjunto de servicios backend o microservicios. Su función principal es gestionar, coordinar y optimizar las solicitudes y respuestas entre los clientes y los servicios subyacentes.

## **GraphQL**

GraphQL es un lenguaje de consulta y un entorno de ejecución para APIs, desarrollado por Facebook en 2012 y liberado como open source en 2015. A diferencia de las APIs REST tradicionales, GraphQL permite a los clientes solicitar exactamente los datos que necesitan, ni más ni menos, lo que lo hace más flexible y eficiente.

## **Instalación y Ejecución**

## **Estructura del Proyecto**

```
api_gateway/
├── docker-compose.yml
├── gateway/
│   ├── schema.graphql
│   ├── resolvers.js
│   ├── server.js
│   ├── Dockerfile
│   ├── package.json
│-- Dockerfile
│-- pom.xml
│-- README.md
```

## **Configurar el API Gateway con GraphQL**

- **1. Crear el esquema GraphQL (gateway/schema.graphql)**

- **2. Crear los resolvers (gateway/resolvers.js)**: Aquí conectamos el API Gateway a la base de datos PostgreSQL externa usando la librería pg.

- **3. Crear el servidor GraphQL (gateway/server.js)**

- **4. Crear el Dockerfile para el API Gateway (gateway/Dockerfile)**

- **5. Crear el package.json (gateway/package.json)**

## **Configurar Docker Compose**

Crea un archivo docker-compose.yml en la raíz del proyecto:

version: '3.8'
services:
  api-gateway:
    build: ./gateway
    ports:
      - "4000:4000"
    environment:
      DB_HOST: tu_host # Reemplaza con la IP o host de tu PostgreSQL
      DB_USER: tu_usuario # Reemplaza con tu usuario de PostgreSQL
      DB_PASSWORD: tu_contraseña # Reemplaza con tu contraseña de PostgreSQL
      DB_NAME: tu_base_de_datos # Reemplaza con el nombre de tu base de datos
    networks:
      - api-network

networks:
  api-network:
    driver: bridge

## **Ejecutar el proyecto**

docker-compose up --build

http://localhost:4000
