using Microsoft.EntityFrameworkCore;

namespace FoodTrack.Models
{
    public class Alimentos
    {
        public int id_alimentos { get; set; }
        public string? descripcion { get; set; }
        public string? enlace { get; set;}
        public string? enlace_imagen { get; set; }

    }
    class FoodTrackDb : DbContext
    {
        public FoodTrackDb(DbContextOptions options) : base(options) { }
        public DbSet<Alimentos> Alimentos { get; set; }
    }
}
