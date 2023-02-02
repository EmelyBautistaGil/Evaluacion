using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODELS.Models
{
    public class Asignaciones
    {

        [Key]
        public int ID { get; set; }
        [Required]
        public int AsignacionNo { get; set; }
        [Required]
        [ForeignKey("Edificios")]
        public int EdificioNumero { get; set; }
        [Required]
        [ForeignKey("Trabajadores")]
        public int TrabajadorNumero { get; set; }
        [Required, MaxLength(10)]
        public string? AsignacionFechaInicio { get; set; }
        [Required]
        public int AsignacionNoDias { get; set; }
    }
}
