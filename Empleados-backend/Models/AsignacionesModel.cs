using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Empleados_backend.Models
{
    [Table("Asignaciones")]
    public class AsignacionesModel
    {
        public int Id { get; set; }

        // Claves foráneas
        public int EmpleadosId { get; set; }
        public int DepartamentosId { get; set; }

        // Relaciones
        public EmpleadosModel Empleados { get; set; } = null;
        public DepartamentosModel Departamentos { get; set; } = null;

        public DateTime FechaAsignacion { get; set; } = DateTime.UtcNow;


    }
}
