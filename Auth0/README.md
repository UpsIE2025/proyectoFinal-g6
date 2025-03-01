# AUTH0 VALIDATE TOKEN
Este documento describe los pasos para levantar el validador de los tokens que se generan los tokens en AUTH0
# AUTH0

Este es un proyecto desarrollado EN .NET 8 y JWT
## 🔧 Requisitos
- .NET 8 instalado
- Docker y Docker Compose instalado
- Postman o cURL para pruebas

## Descripción

Este proyecto nos va a permitir validar si un token es valido, invalido o a expirado y nos envia un true o false dependiendo la validacion del token

## Instrucciones
Configuramos nuestras variables de entorno donde tenemos que poner nuestros datos que nos da AUTH0 en el docker-compose.yml
```sh
docker-compose up --build
```
Variables de Entorno
```sh
      - ASPNETCORE_ENVIRONMENT=Development
      - Auth0__Domain=
      - Auth0__Audience=
      - Auth0__client_id=
      - Auth0__client_secret =
      - Auth0__grant_type=
      - Auth0__kafkaProductor=
      - ASPNETCORE_PORT=
```
## 📌 API Endpoints

| Método | Endpoint                 | Descripción                      |
|--------|--------------------------|----------------------------------|
| POST   | `/api/TokenAuth0`        | Valida un token de Auth0        |
| POST   | `/WeatherForecast/Kafka` | Envia un evento a Kafka         |
### **8. Pruebas funcionales con herramientas como Postman o cURL**
Verificar API Gateway con `cURL`:

```sh
curl --location 'http://localhost:8000/api/TokenAuth0' \
--header 'accept: */*' \
--header 'Content-Type: application/json' \
--data '"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2Rldi1xN2VlZG5ybGFlNHl4dmVsLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJEY3Fhd2c5OWNXemFodGt5YXZvWTVuQzN1cTM1YVVEdEBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9hdXRoMEFQSUtldmluIiwiaWF0IjoxNzQwODM3NzIyLCJleHAiOjE3NDA4NDM3MjIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyIsImF6cCI6IkRjcWF3Zzk5Y1d6YWh0a3lhdm9ZNW5DM3VxMzVhVUR0In0.4L5sPxuwoMPNQ2LrTpZLPUBHw4K1wRb5jwACbCy0_-c"'
```

Conexión Kafka:

```sh
curl --location --request POST 'http://localhost:8000/WeatherForecast/Kafka' \
--header 'accept: */*' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2Rldi1xN2VlZG5ybGFlNHl4dmVsLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJEY3Fhd2c5OWNXemFodGt5YXZvWTVuQzN1cTM1YVVEdEBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9hdXRoMEFQSUtldmluIiwiaWF0IjoxNzQwODM3NzIyLCJleHAiOjE3NDA4NDM3MjIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyIsImF6cCI6IkRjcWF3Zzk5Y1d6YWh0a3lhdm9ZNW5DM3VxMzVhVUR0In0.4L5sPxuwoMPNQ2LrTpZLPUBHw4K1wRb5jwACbCy0_-c' \
--data ''
```

Validación Token desde el microservicio:

``` sh
curl --location 'http://localhost:8082/api/TokenAuth0' \
--header 'accept: */*' \
--header 'Content-Type: application/json' \
--data '"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2Rldi1xN2VlZG5ybGFlNHl4dmVsLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJEY3Fhd2c5OWNXemFodGt5YXZvWTVuQzN1cTM1YVVEdEBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9hdXRoMEFQSUtldmluIiwiaWF0IjoxNzQwODM5OTMwLCJleHAiOjE3NDA4NDU5MzAsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyIsImF6cCI6IkRjcWF3Zzk5Y1d6YWh0a3lhdm9ZNW5DM3VxMzVhVUR0In0.qeHwV8PErIQzp0EVK8RehGizx2HW0ere6DxdltC_gEY"'
```