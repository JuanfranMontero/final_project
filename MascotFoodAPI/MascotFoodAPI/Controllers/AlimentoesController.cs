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
    public class AlimentoesController : ControllerBase
    {
        private readonly pruebasContext _context;

        public AlimentoesController(pruebasContext context)
        {
            _context = context;
        }

        // GET: api/Alimentoes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Alimento>>> GetAlimentos()
        {
            return await _context.Alimentos.ToListAsync();
        }

        // GET: api/Alimentoes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Alimento>> GetAlimento(int id)
        {
            var alimento = await _context.Alimentos.FindAsync(id);

            if (alimento == null)
            {
                return NotFound();
            }

            return alimento;
        }

        // PUT: api/Alimentoes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAlimento(int id, Alimento alimento)
        {
            if (id != alimento.IdAlimento)
            {
                return BadRequest();
            }

            _context.Entry(alimento).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AlimentoExists(id))
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

        // POST: api/Alimentoes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Alimento>> PostAlimento(Alimento alimento)
        {
            _context.Alimentos.Add(alimento);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAlimento", new { id = alimento.IdAlimento }, alimento);
        }

        // DELETE: api/Alimentoes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAlimento(int id)
        {
            var alimento = await _context.Alimentos.FindAsync(id);
            if (alimento == null)
            {
                return NotFound();
            }

            _context.Alimentos.Remove(alimento);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AlimentoExists(int id)
        {
            return _context.Alimentos.Any(e => e.IdAlimento == id);
        }
    }
}
