using GrpcService.Contexts;
using GrpcService.Repositories;
using GrpcService.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddGrpc();

var connectionString = builder.Configuration.GetConnectionString("PostgresConnection");

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(connectionString));

builder.Services.AddScoped<IEstudianteCursoRepository, EstudianteCursoRepository>();
builder.Services.AddScoped<EstudianteCursoService>();

builder.Services.AddScoped<ICursoRepository, CursoRepository>();
builder.Services.AddScoped<CursoService>();

var app = builder.Build();

app.MapGrpcService<EstudianteCursoService>();
app.MapGrpcService<CursoService>();
app.MapGet("/", () => "Bienvenido a mi servicio gRPC. Proyecto final de 'Patrones de integración Empresarial'");

app.Run();
