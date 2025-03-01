# gRPC service

## 📌 Descripción

Este microservicio implementa un servidor **gRPC** en .Net 8.

## 🚀 Requerimientos
- .Net 8
- IDE Visual Studio 2022 en cualquiera de sus sabores.
---

## 📂 Estructura del Proyecto

```plaintext
/grpc-service
├── Contexts/               # Contextos para la comunicación entre Entity Framework y PostgreSQL
├── Models/                 # Modelos/Entidades
├── Protos/                 # Archivos .proto; los contratos para la conexión entre el cliente y servidor gRPC
├── Repositories/           # Implementación del CRUD
├── Services/               # Servicios donde se coloca la lógica del negocio
├── appsettings.json        # Archivo de configuraciones
│── Dockerfile              # Configuración Docker
│── Program.cs              # Punto de entrada
```

---

## 🔧 Instalación y Configuración

### 1️⃣ Clonar el repositorio

```sh
git clone https://github.com/UpsIE2025/proyectoFinal-g6.git
**`cd` grpc-service/GrpcService
```

### 2️⃣ Instalación de Dependencias
Al momento de abrir el proyecto en Visual Studio el IDE se encarga de la restauracion de dependencias.

### 3️⃣ Configuraciones

Para modificar la cadena de conexión, se debe abrir el archivo appsettings.json, y, modificar la línea cuya clave es: `"PostgresConnection"`.

---

## 🛠️ Como ejecutar

Dentro del IDE unicamente es necesario presionar el botón Ejecutar o Run, dependiendo del idioma del IDE.

---
## 📌 Endpoints disponibles

### 🔹 gRPC 

Disponible en:\
[https://localhost:7197/](https://localhost:7197/)

### 🔹 Consultar Curso (gRPC)

[Proto curso.proto](GrpcService/GrpcService/Protos/curso.proto)

### 🔹 Consultar Estudiante (gRPC)

[Proto estudiante.proto](GrpcService/GrpcService/Protos/estudiante.proto)

### 🔹 Consultar EstudianteCurso (gRPC)

[Proto estudianteCurso.proto](GrpcService/GrpcService/Protos/estudianteCurso.proto)

---

## 🛠️ Realizar Pruebas locales

### 1. Verificar la versión adecuada de Postman
La funcionalidad gRPC está disponible en Postman 9.7 o superior, por lo que es importante asegurarse de estar utilizando esta versión o una más reciente.

### 2. Abrir Postman y seleccionar “New” > “gRPC Request”
En la pantalla principal de Postman, se debe hacer clic en el botón **"New"** y elegir la opción **"gRPC Request"**.

### 3. Introducir la URL del servidor gRPC
Es necesario escribir la URL del servidor gRPC, por ejemplo: https://localhost:7197/

### 4. Cargar el archivo `.proto`
- Se debe hacer clic en **"Import a .proto file"** y seleccionar el archivo correspondiente.
- Esto permitirá que Postman conozca los métodos y estructuras de mensajes del servicio.

### 5. Seleccionar el método gRPC a invocar
A través del menú desplegable, se debe seleccionar el método basado en el archivo `.proto` importado.

### 6. Configurar los parámetros de la petición
En la pestaña **"Message"**, se debe escribir el cuerpo del mensaje en formato JSON: 

```json
{
    "apellido": "anim laboris",
    "direccion": "minim dolor ut eu",
    "nombre": "tempor Excepteur elit aute et"
}
```

(el ejemplo es el json para la creación de un registro estudiante)

## 📜 Licencia

MIT License.
