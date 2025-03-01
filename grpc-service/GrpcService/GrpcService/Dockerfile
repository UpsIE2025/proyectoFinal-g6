FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

# Esta fase se usa para compilar el proyecto de servicio
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release

# Define el directorio de trabajo principal como la raíz del proyecto
WORKDIR /app

# Copia SOLO el archivo .csproj
COPY ./GrpcService.csproj ./

# Restaura las dependencias
RUN dotnet restore

# Copia todo el código fuente
COPY . ./

# Verificar que el directorio Protos existe y contiene los archivos .proto (para debugging)
RUN ls -l /app/Protos

# Construye la aplicación (sin especificar la ruta)
RUN dotnet build -c $BUILD_CONFIGURATION -o /app/build

# Esta fase se usa para publicar el proyecto de servicio que se copiará en la fase final.
FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish GrpcService.csproj -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

# Esta fase se usa en producción
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "GrpcService.dll"]