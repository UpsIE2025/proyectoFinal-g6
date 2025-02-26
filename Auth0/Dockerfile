# Imagen base de .NET SDK para compilar
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar archivos de solución y proyectos (ajusta según tu estructura)
COPY Auth0.sln ./
COPY Auth0/Auth0.csproj Auth0/

# Restaurar dependencias
RUN dotnet restore Auth0.sln

# Copiar todo el código fuente
COPY . .

# Compilar en modo Release
RUN dotnet publish Auth0/Auth0.csproj -c Release -o /out

# Imagen final con solo el runtime de .NET
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /out .

# Exponer el puerto de la API
EXPOSE 8081

# Comando para ejecutar la API
ENTRYPOINT ["dotnet", "Auth0.dll"]
