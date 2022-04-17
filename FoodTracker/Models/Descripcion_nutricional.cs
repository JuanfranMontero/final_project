using Microsoft.EntityFrameworkCore;

namespace FoodTrack.Models
{
    public class Descripcion_Nutricional
    {
        public int id_descripcion { get; set; }
        public string? ingredientes { get; set; }
    }
    class FoodTrackDb : DbContext
    {
        public FoodTrackDb(DbContextOptions options) : base(options) { }
        public DbSet<Descripcion_Nutricional> Descripcion_Nutricionales { get; set; }
    }
}