using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Empleados_backend.Models
{
    [Table("Departamentos")]
    public class DepartamentosModel
    {

        public int Id { get; set; }

        [Required(ErrorMessage = "Campo Requerido")]
        public string Nombre { get; set; }

        [Required(ErrorMessage = "Campo Requerido")]
        public string Ubicacion { get; set; }

        [Required(ErrorMessage = "Campo Requerido")]
        public string Jefe_Departamento { get; set; }

        [Required(ErrorMessage = "Campo Requerido")]
        public string Extension { get; set; }


    }
}
