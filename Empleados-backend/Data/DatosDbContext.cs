using Empleados_backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Empleados_backend.Data
{
    public class DatosDbContext:DbContext
    {
        public DatosDbContext(DbContextOptions op) : base(op) { }
        public DbSet<EmpleadosModel> Empleados { get; set; }
        public DbSet<DepartamentosModel> Departamentos { get; set; }
        public DbSet<AsignacionesModel> Asignaciones{ get; set; }
     
    }
}
