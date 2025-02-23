FROM maven:3.8.6-eclipse-temurin-17 AS build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

FROM openjdk:17-jdk-slim
WORKDIR /app
COPY --from=build /app/target/kafka-consumer-*.jar kafka-consumer.jar
EXPOSE 8070
ENTRYPOINT ["java", "-jar", "kafka-consumer.jar"]