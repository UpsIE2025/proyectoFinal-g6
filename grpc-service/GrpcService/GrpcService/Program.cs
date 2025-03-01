using GrpcService.Contexts;
using GrpcService.Repositories;
using GrpcService.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
var serverName = Environment.GetEnvironmentVariable("SERVER_NAME") ?? "209.94.59.49";

Console.WriteLine($"ServerName={serverName}");

builder.Services.AddGrpc();

var connectionString = $"Host={serverName};Database=mydatabase;Username=admindatabase;Password=admindatabase";

//var connectionString = builder.Configuration.GetConnectionString("PostgresConnection");

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(connectionString));

builder.Services.AddScoped<IEstudianteCursoRepository, EstudianteCursoRepository>();

builder.Services.AddScoped<ICursoRepository, CursoRepository>();

builder.Services.AddScoped<IEstudianteRepository, EstudianteRepository>();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;

    var context = services.GetRequiredService<ApplicationDbContext>();
    context.Database.EnsureCreated();

    try
    {
        context.Database.Migrate();
        Console.WriteLine($"Migraciones aplicadas.");
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Info: No se aplicaron migraciones: {ex.Message}");
    }
}

app.MapGrpcService<EstudianteCursoService>();
app.MapGrpcService<CursoService>();
app.MapGrpcService<EstudianteService>();
app.MapGet("/", () => "Bienvenido a mi servicio gRPC. Proyecto final de 'Patrones de integración Empresarial'");

app.Run();
