# NestJS + GraphQL + gRPC + REST API + Auth0

## 📌 Descripción

Este proyecto implementa un servidor **GraphQL** en **NestJS** que consume servicios **gRPC**, con autenticación mediante **Auth0**.

## 🚀 Tecnologías

- **NestJS**
- **GraphQL** (Apollo Server)
- **gRPC** (microservicios)
- **REST API** (integración externa)
- **Auth0** (autenticación)
- **Docker** (contenedores)

---

## 📂 Estructura del Proyecto

```plaintext
/graphql-server
│── src/
│   ├── grpc/               # Archivos .proto
│   ├── modules/            # Módulos
│   ├── resolvers/          # Resolvers GraphQL
│   ├── services/           # Servicios gRPC y REST
│   ├── models/             # Modelos GraphQL
│   ├── main.ts             # Punto de entrada NestJS
│── .env                    # Configuración de entorno
│── Dockerfile               # Configuración Docker
│── docker-compose.yml       # Orquestación Docker
│── package.json             # Dependencias y scripts
```

---

## 🔧 Instalación y Configuración

### 1️⃣ Clonar el repositorio

```sh
git clone https://github.com/UpsIE2025/proyectoFinal-g6.git
cd graphql-server
```

### 2️⃣ Instalar dependencias

```sh
npm install
```

### 3️⃣ Configurar las variables de entorno

Crear un archivo `.env` en la raíz del proyecto:

```env
NODE_ENV=development
GRPC_COURSE_URL=grpc-server:50051
GRPC_STUDENT_URL=grpc-server:50051
REST_API_URL=
AUTH0_DOMAIN=your-auth0-domain
AUTH0_AUDIENCE=your-auth0-audience
```

---

## 🛠️ Ejecución

### 🚀 Modo desarrollo

```sh
npm run start:dev
```

### 🚀 Modo producción

```sh
npm run build
npm run start:prod
```

---

## 🐳 Uso con Docker

### 🔨 Construir y ejecutar los contenedores

```sh
docker-compose up --build
```

### 📌 Detener los contenedores

```sh
docker-compose down
```

---

## 📌 Endpoints

### 🔹 GraphQL Playground

Disponible en:\
[http://localhost:3000/graphql](http://localhost:3000/graphql)

### 🔹 Consultar Cursos (GraphQL)

```graphql
query {
  getCourses {
    id
    name
  }
}
```

### 🔹 Consultar Estudiantes (GraphQL)

```graphql
query {
  getStudents {
    id
    name
  }
}
```

---

## 📜 Licencia

MIT License.


