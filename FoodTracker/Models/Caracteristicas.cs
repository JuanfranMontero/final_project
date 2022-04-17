using Microsoft.EntityFrameworkCore;

namespace FoodTrack.Models
{
    public class Caracteristicas
    {
        public int id_caracteristicas{ get; set; }
        public string? tipo { get; set; }
        public string? edad { get; set; }
        public string? ingrediente_principañ { get; set; }
        public string? raza { get; set; }
        public string? codigo_EAN { get; set; }
        public string? observaciones { get; set; }
    }
    class FoodTrackDb : DbContext
    {
        public FoodTrackDb(DbContextOptions options) : base(options) { }
        public DbSet<Caracteristicas> caracteristicas { get; set; }
    }
}
