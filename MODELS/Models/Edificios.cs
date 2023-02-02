using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODELS.Models
{
    public class Edificios
    {

        [Key]
        public int ID { get; set; }
        [Required]
        public int EdificioNumero { get; set; }
        [Required, MaxLength(100)]
        public string? EdificioDireccion { get; set; }
        [Required, MaxLength(50)]
        public string? TipoEdificio { get; set; }
        [Required]
        public int NivelCalidad { get; set; }
        [Required]
        public int Categoria { get; set; }
    }
}
