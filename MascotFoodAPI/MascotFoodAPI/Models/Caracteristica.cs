using System;
using System.Collections.Generic;

namespace MascotFoodAPI.Models
{
    public partial class Caracteristica
    {
        public int IdCaracteristica { get; set; }
        public string? Tipo { get; set; }
        public string? Edad { get; set; }
        public string? IngredientePrincipal { get; set; }
        public string? Raza { get; set; }
        public string? CodigoEan { get; set; }
        public string? Observaciones { get; set; }
    }
}
