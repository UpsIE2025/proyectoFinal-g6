
FROM gradle:7.6.4-jdk17 AS build
WORKDIR /app
COPY . .
RUN gradle clean build -x test

FROM openjdk:17-jdk-slim
WORKDIR /app
COPY build/libs/micro-*.war /micro.war
EXPOSE 8084
CMD ["java", "-jar", "/micro.war"]

