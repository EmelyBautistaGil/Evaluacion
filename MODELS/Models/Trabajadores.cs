using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODELS.Models
{
    public class Trabajadores
    {

        [Key]
        public int ID { get; set; }
        [Required]
        public int TrabajadorNumero { get; set; }
        [Required, MaxLength(100)]
        public string? TrabajadorNombre { get; set; }
        [Required]
        public float TrabajadorTarifa { get; set; }
        [Required, MaxLength(100)]
        public string? Oficio { get; set; }
        [Required]
        public int TrabajadorSupervisor { get; set; }
    }
}
