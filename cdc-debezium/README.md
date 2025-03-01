# CDC - Debezium

## **Antecedentes**
CDC (Captura de Datos de Cambios) es una técnica que permite detectar y capturar los cambios (inserciones, actualizaciones, eliminaciones) realizados en una base de datos en tiempo real. Esto permite que otros sistemas reaccionen ante esos cambios de manera eficiente, como si estuvieran "escuchando" las modificaciones en la base de datos.

Debezium es una plataforma de CDC que se conecta a bases de datos, como MySQL o PostgreSQL, y captura los cambios de datos en tiempo real. Identifica los cambios realizados y envía esa información a Apache Kafka

## **Descripción**
El microservicio Micro está basado en Spring Boot y tiene como objetivo desplegar un servicio que permanece escuchando los topics de Kafka. El funcionamiento básico es el siguiente:

Debezium, que actúa como el conector de CDC (Captura de Datos de Cambios) para detectar las modificaciones en la base de datos fuente (PostgreSql). La información de los cambios realizados se envía a Apache Kafka.

El microservicio se conecta a Kafka y escucha los mensajes en los diferentes topics. Una vez que el microservicio recibe los cambios, ejecuta las operaciones necesarias sobre la base de datos de destino (MySQL), actualizando los datos.

## **Requisitos Previos**

Antes de ejecutar el productor, asegúrate de contar con los siguientes requisitos:

- **Java 17** y **Gradle** instalados.
- **Docker instalado** en caso de ejecutar mediante contenedores.
- **Postman** instalado

Puedes verificar las versiones con:
```sh
java -version
gradle --version
docker --version
```

## **Instalación y Ejecución**

### **1. Compilación del Proyecto**
Se puede compilar el proyecto de manera local:
```sh
gradle clean build -x test
```
Esto generará el archivo `.war` en el directorio `build/libs`.

Para construir el proyecto con Docker: `Dockerfile`:
```sh
docker build -t cdc-debezium .
```

## **Tecnologías**

- **Debezium**
- **Postgres** (Base de datos origen)
- **MySQL** (Base de datos destino)
- **Kafka** (Sistema de mensajería distribuido.)
- **Zookeeper** (Coordinación de servicios.)
- **kafka-ui** (Interfaz Gráfica Kafka)
- **debezium_ui** (Interfaz Gráfica Debezium)
- **Docker** (contenedores)


## **Instalación**

```sh
ejecutar el comando docker-compose up -d
```

### Configurar el conector Debezium Postgres

Importar en Postman la coleccion `CDC-Debezium.postman_collection.json` que esta en la raíz del proyecto:

Ejecutar la petición POST 


## **Ejecución**
Si no se a inicializado automáticamente la base de datos POSTGRES con la información de estudiante (a través de otro proyecto) 

Se puede utilizar los siguientes script para inicializarla
```
CREATE TABLE public.estudiante (
	id serial4 NOT NULL,
	nombre varchar NOT NULL,
	apellido varchar NOT NULL,
	direccion varchar NULL,
	estado bool NOT NULL,
	CONSTRAINT estudiante_pkey PRIMARY KEY (id)
);

CREATE TABLE public.curso (
	id serial4 NOT NULL,
	nombre varchar NOT NULL,
	estado bool NOT NULL,
	CONSTRAINT curso_pkey PRIMARY KEY (id)
);


CREATE TABLE public.estudiante_curso (
	id serial4 NOT NULL,
	"estudianteId" int4 NOT NULL,
	"cursoId" int4 NOT NULL,
	estado bool NOT NULL,
	CONSTRAINT "EstudianteCursoEstado" UNIQUE ("estudianteId", "cursoId", estado),
	CONSTRAINT estudiante_curso_pkey PRIMARY KEY (id),
	CONSTRAINT curso_id FOREIGN KEY ("cursoId") REFERENCES public.curso(id),
	CONSTRAINT estudiante_id FOREIGN KEY ("estudianteId") REFERENCES public.estudiante(id)
);
```

Ahora, con cada cambio que se realice en la base de datos Postgres. El CSD enviará un mensaje a KAFKA para que posteriormente el servicio recepte ese mensaje y actualice la base de datos MySQL.

## Endpoints

### kafka_ui_cdc

Disponible en:\
[http://localhost:9000]

### debezium_ui

Disponible en:\
[http://localhost:9091]
