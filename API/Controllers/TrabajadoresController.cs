using DAL.DB;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MODELS.Models;
using System.Linq;

namespace API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class TrabajadoresController : ControllerBase
    {
        private readonly ApplicationContext context;

        public TrabajadoresController(ApplicationContext _context)
        {
            context = _context;
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<Trabajadores>>> GetAll()
        {

            return await context.Trabajadores.OrderByDescending(u=>u.ID).ToListAsync();
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Trabajadores>>> GetTrabajadoresNumero()
        {
            var List = await context.Trabajadores.Select(u => u.TrabajadorNumero).ToListAsync();
            return Ok(List) ;
        }

        [HttpGet("{valor}")]
        public async Task<ActionResult<IEnumerable<Trabajadores>>> Search(string valor)
        {
            return await context.Trabajadores.Where(u => u.TrabajadorNombre.Contains(valor)).ToListAsync(); ;
        }

        [HttpGet("{number}")]
        public async Task<ActionResult<IEnumerable<Trabajadores>>> SearchNumber(int number)
        {

            var Number = await context.Trabajadores.Where(u => u.TrabajadorNumero == number).SingleOrDefaultAsync();
            if (Number == null)
            {
                return Ok(null);
            }
            return Ok(number);
        }

        [HttpPost]
        public async Task<ActionResult<Trabajadores>> Post([FromBody] Trabajadores Trabajadores)
        {
            try
            {
                context.Trabajadores.Add(Trabajadores);
                await context.SaveChangesAsync();
                CreatedAtAction(nameof(GetAll),new { id = Trabajadores.ID }, Trabajadores);
                return Ok();

            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

        }

        [HttpPut("{number}")]
        public async Task<IActionResult> Put(int number, Trabajadores Trabajadores)
        {

            if (number != Trabajadores.ID)
            {
                return BadRequest();
            }

            context.Entry(Trabajadores).State = EntityState.Modified;

            try
            {
                await context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TrabajadoresExists(number))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok();
        }

        [HttpDelete("{number}")]
        public async Task<ActionResult<Trabajadores>> Delete(int number)
        {
            var Trabajadores = await context.Trabajadores.Where(u => u.ID == number).FirstOrDefaultAsync(); 
            var asignaciones = await context.Asignaciones.Where(u => u.TrabajadorNumero == Trabajadores.TrabajadorNumero).SingleOrDefaultAsync();
            if (asignaciones != null) return Ok(number);
            context.Trabajadores.Remove(Trabajadores);
            await context.SaveChangesAsync();
            return Ok();
        }

        private bool TrabajadoresExists(int number)
        {
            return context.Trabajadores.Any(e => e.ID == number);
        }
    }
}
