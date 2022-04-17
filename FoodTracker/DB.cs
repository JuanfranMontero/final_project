namespace FoodTrack.DB;

public record FoodTracker
{
    public int Id { get; set; }
    public string? Name { get; set; }
}

public class FoodTrackerDB
{
    private static List<FoodTracker> _foodTrackers = new List<FoodTracker>()
   {
     new FoodTracker{ Id=1, Name="Pienso Hills" },
     new FoodTracker{ Id=2, Name="Pienso Advance"},
     new FoodTracker{ Id=3, Name="Pienso Dingo"}
   };

    public static List<FoodTracker> GetFoodTrack()
    {
        return _foodTrackers;
    }

    public static FoodTracker? GetFoodTracker(int id)
    {
        return _foodTrackers.SingleOrDefault(ft => ft.Id == id);
    }

    public static FoodTracker CreateFoodTracker(FoodTracker fd)
    {
        _foodTrackers.Add(fd);
        return fd;
    }

    public static FoodTracker UpdateFoodTracker(FoodTracker update)
    {
        _foodTrackers = _foodTrackers.Select(fd =>
        {
            if (fd.Id == update.Id)
            {
                fd.Name = update.Name;
            }
            return fd;
        }).ToList();
        return update;
    }
   
    public static void RemoveFoodTracker(int id)
    {
        _foodTrackers = _foodTrackers.FindAll(fd => fd.Id == id).ToList();
    }
}