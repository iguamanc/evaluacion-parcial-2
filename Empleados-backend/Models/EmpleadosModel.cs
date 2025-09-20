using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Empleados_backend.Models
{
    [Table("Empleados")]
    public class EmpleadosModel
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Campo Requerido")]
        public string Nombres { get; set; }

        [Required(ErrorMessage = "Campo Requerido")]
        public string Apellidos { get; set; }


        [Required(ErrorMessage = "Campo Requerido")]
        [EmailAddress]
        public string Email { get; set; }

        [Required(ErrorMessage = "Campo Requerido")]
        public string Telefono { get; set; }        

    }
}
