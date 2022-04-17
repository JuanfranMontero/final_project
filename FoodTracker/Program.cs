using Microsoft.OpenApi.Models;
using Microsoft.EntityFrameworkCore;
using FoodTrack.DB;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "FoodTracker API", Description = "Let us do the hard work, you go and save your patient", Version = "v1" });
});


var app = builder.Build();

if (app.Environment.IsDevelopment()) 
    app.UseDeveloperExceptionPage();

app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "FoodTracker API V1");
});

app.MapGet("/", () => "Hello World!");

app.MapGet("/food/{id}", (int id) => FoodTrackerDB.GetFoodTracker(id));
app.MapPost("/food",(FoodTracker ft) => FoodTrackerDB.CreateFoodTracker(ft));
app.MapPut("/food", (FoodTracker ft) => FoodTrackerDB.UpdateFoodTracker(ft));
app.MapDelete("/food/{id}", (int id) => FoodTrackerDB.RemoveFoodTracker(id));
app.MapGet()
app.Run();
