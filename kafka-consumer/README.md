# Consumidor - Apache Kafka

## **Descripción**

Este servicio actúa como **consumidor** en la arquitectura de Apache Kafka. Su función es recibir y procesar mensajes provenientes de un **topic**, permitiendo la gestión y análisis de eventos en tiempo real.

## **Requisitos Previos**

Antes de ejecutar el consumidor, asegúrate de contar con los siguientes requisitos:

- **Apache Kafka** en ejecución (puede ser local o en la nube).
- **Java 17** y Maven instalados.
- **Docker instalado** en caso de ejecutar mediante contenedores.
- **Configuración de Firebase** para el almacenamiento y procesamiento de eventos.

Puedes verificar las versiones con:

```sh
java -version
mvn -version
docker --version
```

## **Instalación y Ejecución**

### **1. Configuración de Firebase**

El consumidor utiliza Firebase para almacenar y gestionar los eventos recibidos desde Kafka. Para ello, se debe proporcionar un archivo de configuración `firebase-config.json` dentro del directorio `resources`.

### **2. Compilación del Proyecto**

Si deseas compilar el proyecto de manera local, ejecuta:

```sh
mvn clean package -DskipTests
```

Esto generará el archivo `.jar` en el directorio `target/`.

Si prefieres ejecutarlo con Docker, puedes construir la imagen usando el `Dockerfile`:

```sh
docker build -t kafka-consumer .
```

### **3. Ejecución del Consumidor**

Para ejecutar el consumidor localmente sin Docker:

```sh
java -jar target/kafka-consumer-*.jar
```

Si lo ejecutas con Docker:

```sh
docker run -p 8070:8070 kafka-consumer
```

### **4. Consumo de Mensajes**

El consumidor escucha mensajes desde un topic de Kafka y los almacena en Firebase. Puedes verificar la recepción de mensajes en la base de datos de Firebase o mediante logs en la consola:

```sh
docker logs -f kafka-consumer
```

## **Estructura del Proyecto**
```
kafka-consumer/
│-- src/
│   ├── main/
│   │   ├── java/
│   │   │   ├── ec/ups/ms/kafka/
│   │   │   │   ├── config/FirebaseInitializer.java
│   │   │   │   ├── service/KafkaConsumerService.java
│   │   │   │   ├── entities/Estudiante.java
│   ├── resources/
│   │   ├── static/
│   │   ├── templates/
│   │   ├── application.properties
│   │   ├── firebase-config.json
│-- Dockerfile
│-- pom.xml
│-- README.md
```

## **Casos de Uso**

- **Procesamiento de eventos en tiempo real**: Permite recibir y analizar datos de forma continua, facilitando la automatización de tareas y la toma de decisiones basada en eventos recientes.

- **Integración con Firebase**: Almacena y gestiona eventos en Firebase, proporcionando una solución escalable para análisis y recuperación de datos en la nube.

- **Monitoreo de transacciones en microservicios**: Facilita la detección y respuesta a cambios en el sistema, asegurando la coherencia y el seguimiento de eventos críticos.

## **Comparación con RabbitMQ**

Kafka y RabbitMQ manejan el consumo de mensajes de manera diferente:

- **Kafka**: Permite la lectura de eventos en un orden secuencial y con almacenamiento persistente, lo que facilita el procesamiento distribuido de datos y la relectura de eventos anteriores.

- **RabbitMQ**: Distribuye mensajes a colas específicas para consumidores individuales, optimizando la entrega inmediata sin almacenamiento prolongado de eventos.

Kafka es ideal para aplicaciones que requieren procesamiento de eventos históricos y escalabilidad, mientras que RabbitMQ se adapta mejor a sistemas que necesitan entrega rápida y enrutamiento flexible de mensajes.

## **Conclusión**

Este consumidor Kafka recibe y procesa eventos en tiempo real, integrándolos con Firebase para su almacenamiento y análisis, proporcionando una solución escalable y eficiente para arquitecturas basadas en eventos.

