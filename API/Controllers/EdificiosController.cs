using DAL.DB;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MODELS.Models;

namespace API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class EdificiosController : ControllerBase
    {
        private readonly ApplicationContext context;

        public EdificiosController(ApplicationContext _context)
        {
            context = _context;
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<Edificios>>> GetAll()
        {

            return await context.Edificios.OrderByDescending(u=>u.ID).ToListAsync();
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Edificios>>> GetEdificioNumero()
        {
            var List = await context.Edificios.Select(u => u.EdificioNumero).ToListAsync();
            return Ok(List);
        }


        [HttpGet("{valor}")]
        public async Task<ActionResult<IEnumerable<Edificios>>> Search(string valor)
        {
            return await context.Edificios.Where(u => u.EdificioDireccion.Contains(valor)).ToListAsync(); ;
        }

        [HttpGet("{number}")]
        public async Task<ActionResult<IEnumerable<Edificios>>> SearchNumber(int number)
        {

            var Number = await context.Edificios.Where(u => u.EdificioNumero == number).SingleOrDefaultAsync();
            if (Number == null)
            {
                return Ok(null);
            }
            return Ok(number);
        }

        [HttpPost]
        public async Task<ActionResult<Edificios>> Post([FromBody] Edificios Edificios)
        {
            try
            {
                context.Edificios.Add(Edificios);
                await context.SaveChangesAsync();
                CreatedAtAction(nameof(GetAll),new { id = Edificios.ID }, Edificios);
                return Ok();

            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

        }

        [HttpPut("{number}")]
        public async Task<IActionResult> Put(int number, Edificios Edificios)
        {

            if (number != Edificios.ID)
            {
                return BadRequest();
            }

            context.Entry(Edificios).State = EntityState.Modified;

            try
            {
                await context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EdificiosExists(number))
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
        public async Task<ActionResult<Edificios>> Delete(int number)
        {
            var Edificios = await context.Edificios.Where(u => u.ID == number).FirstOrDefaultAsync();
            var asignaciones = await context.Asignaciones.Where(u => u.EdificioNumero == Edificios.EdificioNumero).SingleOrDefaultAsync();
            if (asignaciones != null) return Ok(number);
            context.Edificios.Remove(Edificios);
            await context.SaveChangesAsync();
            return Ok();
        }

        private bool EdificiosExists(int number)
        {
            return context.Edificios.Any(e => e.EdificioNumero == number);
        }
    }
}
