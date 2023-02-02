using DAL.DB;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MODELS.Models;

namespace API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AsignacionesController : ControllerBase
    {
        private readonly ApplicationContext context;

        public AsignacionesController(ApplicationContext _context)
        {
            context = _context;
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<Asignaciones>>> GetAll()
        {

            return await context.Asignaciones.ToListAsync();
        }


        [HttpGet("{valor}")]
        public async Task<ActionResult<IEnumerable<Asignaciones>>> Search(string valor)
        {
            return await context.Asignaciones.Where(u => u.AsignacionFechaInicio.Contains(valor)).ToListAsync(); ;
        }

        [HttpGet("{number}")]
        public async Task<ActionResult<IEnumerable<Asignaciones>>> SearchNumber(int number)
        {

            var Number = await context.Asignaciones.Where(u => u.AsignacionNo == number).SingleOrDefaultAsync();
            if (Number == null)
            {
                return Ok(null);
            }
            return Ok(number);
        }

        [HttpPost]
        public async Task<ActionResult<Asignaciones>> Post([FromBody] Asignaciones Asignaciones)
        {
            try
            {
                Asignaciones.AsignacionFechaInicio = Asignaciones.AsignacionFechaInicio.Replace("-", "/");
                context.Asignaciones.Add(Asignaciones);
                await context.SaveChangesAsync();
                return Ok();

            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

        }

        [HttpPut("{number}")]
        public async Task<IActionResult> Put(int number, Asignaciones Asignaciones)
        {
            Asignaciones.AsignacionFechaInicio = Asignaciones.AsignacionFechaInicio.Replace("-", "/");

            if (number != Asignaciones.ID)
            {
                return BadRequest();
            }

            context.Entry(Asignaciones).State = EntityState.Modified;

            try
            {
                await context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AsignacionesExists(number))
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
        public async Task<ActionResult<Asignaciones>> Delete(int number)
        {
            var Asignaciones = await context.Asignaciones.Where(u => u.AsignacionNo == number).FirstOrDefaultAsync();
            context.Asignaciones.Remove(Asignaciones);
            await context.SaveChangesAsync();
            return Ok();
        }

        private bool AsignacionesExists(int number)
        {
            return context.Asignaciones.Any(e => e.AsignacionNo == number);
        }
    }
}
