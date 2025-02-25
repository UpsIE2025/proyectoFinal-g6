using GrpcService.Contexts;
using GrpcService.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddGrpc();

var connectionString = builder.Configuration.GetConnectionString("PostgresConnection");

builder.Services.AddDbContext<MydatabaseContext>(options =>
    options.UseNpgsql(connectionString));

var app = builder.Build();

// Configure the HTTP request pipeline.
app.MapGrpcService<GreeterService>();
app.MapGet("/", () => "Bienvenido a mi servicio gRPC. Proycto final de 'Patrones de integración Empresarial'");

app.Run();
