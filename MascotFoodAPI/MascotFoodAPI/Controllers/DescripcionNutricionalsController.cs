#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MascotFoodAPI.Models;

namespace MascotFoodAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DescripcionNutricionalsController : ControllerBase
    {
        private readonly pruebasContext _context;

        public DescripcionNutricionalsController(pruebasContext context)
        {
            _context = context;
        }

        // GET: api/DescripcionNutricionals
        [HttpGet]
        public IQueryable<DescripcionNutricional> GetDescripcionNutricionals(string ingredientInclude, string serchString)
        {
            var result1 = from Version in _context.DescripcionNutricionals
                          where Version.Ingredientes.Contains(serchString)
                          select Version.IdDescripcion;

            var result = _context.DescripcionNutricionals.Where(x => x.Ingredientes.Contains(serchString));

            return result;
        }

        // GET: api/DescripcionNutricionals/5
        // [HttpGet("{}")]
        // public async Task<ActionResult<DescripcionNutricional>> GetDescripcionNutricional(int id)
        // {
        //     var descripcionNutricional = await _context.DescripcionNutricionals.FindAsync(id);

        //     if (descripcionNutricional == null)
        //     {
        //         return NotFound();
        //     }

        //     return descripcionNutricional;
        // }

        // PUT: api/DescripcionNutricionals/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDescripcionNutricional(int id, DescripcionNutricional descripcionNutricional)
        {
            if (id != descripcionNutricional.IdDescripcion)
            {
                return BadRequest();
            }

            _context.Entry(descripcionNutricional).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DescripcionNutricionalExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/DescripcionNutricionals
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<DescripcionNutricional>> PostDescripcionNutricional(DescripcionNutricional descripcionNutricional)
        {
            _context.DescripcionNutricionals.Add(descripcionNutricional);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDescripcionNutricional", new { id = descripcionNutricional.IdDescripcion }, descripcionNutricional);
        }

        // DELETE: api/DescripcionNutricionals/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDescripcionNutricional(int id)
        {
            var descripcionNutricional = await _context.DescripcionNutricionals.FindAsync(id);
            if (descripcionNutricional == null)
            {
                return NotFound();
            }

            _context.DescripcionNutricionals.Remove(descripcionNutricional);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DescripcionNutricionalExists(int id)
        {
            return _context.DescripcionNutricionals.Any(e => e.IdDescripcion == id);
        }
    }
}
