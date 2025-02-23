# Productor - Apache Kafka

## **Descripción**
Este servicio actúa como **productor** en la arquitectura de Apache Kafka. Su función es enviar mensajes a un **topic**, permitiendo la transmisión de eventos en tiempo real a los consumidores interesados.

## **Requisitos Previos**

Antes de ejecutar el productor, asegúrate de contar con los siguientes requisitos:

- **Apache Kafka** en ejecución (puede ser local o en la nube).
- **Java 17** y Maven instalados.
- **Docker instalado** en caso de ejecutar mediante contenedores.

Puedes verificar las versiones con:
```sh
java -version
mvn -version
docker --version
```

## **Instalación y Ejecución**

### **1. Compilación del Proyecto**
Si deseas compilar el proyecto de manera local, ejecuta:
```sh
mvn clean package -DskipTests
```
Esto generará el archivo `.jar` en el directorio `target/`.

Si prefieres ejecutarlo con Docker, puedes construir la imagen usando el `Dockerfile`:
```sh
docker build -t kafka-producer .
```

### **2. Ejecución del Productor**
Para ejecutar el productor localmente sin Docker:
```sh
java -jar target/kafka-producer-*.jar
```

Si lo ejecutas con Docker:
```sh
docker run -p 8090:8090 kafka-producer
```

### **3. Publicación de Mensajes**
El productor envía mensajes a un topic de Kafka. Para probarlo, puedes enviar una solicitud HTTP con un objeto `Estudiante`:

```sh
curl -X POST http://localhost:8090/api/kafka/send \
     -H "Content-Type: application/json" \
     -d '{
          "codigo": "001",
          "estado": "Activo",
          "nombres": "Juan",
          "apellidos": "Pérez López",
          "direccion": "Av. Siempre Viva. 123"
        }'
```

#### **Respuesta Esperada:**
```json
{
  "success": true,
  "message": "Mensaje enviado a Kafka con éxito."
}
```
Esto confirma que el mensaje fue publicado exitosamente en el topic de Kafka.

## **Estructura del Proyecto**
```
kafka-productor/
│-- src/
│   ├── main/
│   │   ├── java/
│   │   │   ├── ec/ups/ms/kafka/
│   │   │   │   ├── controller/KafkaController.java
│   │   │   │   ├── service/KafkaProducerService.java
│   │   │   │   ├── entities/Estudiante.java
│   ├── resources/
│   │   ├── static/
│   │   ├── templates/
│   │   ├── application.properties
│-- Dockerfile
│-- pom.xml
```

## **Casos de Uso**
- **Transmisión de eventos en tiempo real:** Permite enviar datos de manera continua a través de Kafka, asegurando que los consumidores procesen los mensajes en el orden recibido sin perder información clave. Es ideal para aplicaciones que dependen de eventos secuenciales, como monitoreo de sistemas o análisis en tiempo real.

- **Integración con sistemas distribuidos:** Facilita la comunicación entre microservicios, permitiendo que múltiples aplicaciones se suscriban y reaccionen a eventos en distintos puntos de una arquitectura distribuida. Esto mejora la escalabilidad y reduce la dependencia entre servicios.

- **Publicación de logs y métricas en microservicios:** Permite el almacenamiento y análisis de registros en tiempo real, asegurando que los eventos de diferentes servicios se capturen de manera ordenada. Esto es útil para el análisis de rendimiento, detección de errores y monitoreo en entornos de producción.

## **Comparación con RabbitMQ**
Kafka y RabbitMQ tienen enfoques distintos en la producción de mensajes:

- **Kafka**: El productor envía mensajes a un topic, donde son almacenados de manera persistente y consumidos en el orden en que fueron publicados. Su diseño permite manejar grandes volúmenes de datos con baja latencia y tolerancia a fallos.

- **RabbitMQ**: El productor envía mensajes a un exchange, que los distribuye a las colas correspondientes según el tipo de intercambio configurado (direct, fanout, topic). RabbitMQ no almacena los mensajes a largo plazo por defecto, ya que su objetivo es la entrega rápida a los consumidores.

Kafka es ideal para el procesamiento de eventos en streaming, mientras que RabbitMQ se ajusta mejor a la comunicación transaccional entre servicios.A diferencia de RabbitMQ, Kafka está diseñado para manejar flujos de eventos de alta escala y proporciona almacenamiento distribuido con replicación de datos.

## **Conclusión**
Este productor Kafka permite enviar mensajes a un **topic**, facilitando la integración de sistemas en tiempo real mediante una arquitectura basada en eventos.

