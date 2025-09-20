using Empleados_backend.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Obtener la cadena de conexión desde appsettings.json
var conexion = builder.Configuration.GetConnectionString("cn");

// Cambiar el proveedor de MySQL a SQL Server
builder.Services.AddDbContext<DatosDbContext>(
    op => op.UseSqlServer(conexion)
);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(op =>
{
    op.AddPolicy("empleados", credenciales =>
    {
        credenciales.WithOrigins("http://localhost:65061")
                    .AllowAnyHeader()
                    .AllowAnyMethod();
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("empleados");
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();

