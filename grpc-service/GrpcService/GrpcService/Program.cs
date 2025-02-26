using GrpcService.Contexts;
using GrpcService.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddGrpc();

var connectionString = builder.Configuration.GetConnectionString("PostgresConnection");

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(connectionString));

var app = builder.Build();

app.MapGrpcService<EstudianteCursoService>();
app.MapGet("/", () => "Bienvenido a mi servicio gRPC. Proyecto final de 'Patrones de integración Empresarial'");

app.Run();
