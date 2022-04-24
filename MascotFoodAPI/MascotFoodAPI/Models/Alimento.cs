using System;
using System.Collections.Generic;

namespace MascotFoodAPI.Models
{
    public partial class Alimento
    {
        public int IdAlimento { get; set; }
        public string? Descripcion { get; set; }
        public string? Enlace { get; set; }
        public string? EnlaceImagen { get; set; }
    }
}
