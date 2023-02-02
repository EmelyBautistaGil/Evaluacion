using DAL.DB;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MODELS.Models;
using System.Data;
using System.Reflection.Metadata;
using System.Text;

namespace API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ReportsController : ControllerBase
    {
        private readonly ApplicationContext context;

        public ReportsController(ApplicationContext _context)
        {
            context = _context;
        }

        public static void SaveStreamAsFile(string filePath, Stream inputStream, string fileName)
        {
            DirectoryInfo info = new DirectoryInfo(filePath);
            if (!info.Exists)
            {
                info.Create();
            }

            string path = Path.Combine(filePath, fileName);
            using (FileStream outputFileStream = new FileStream(path, FileMode.Create, FileAccess.Write, FileShare.ReadWrite))
            {
                inputStream.CopyTo(outputFileStream);
            }
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Trabajadores>>> TrabajadoresTarifa()
        {
            return await context.Trabajadores.Where(u => u.TrabajadorTarifa >= 10 && u.TrabajadorTarifa <= 12).ToListAsync();
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Asignaciones>>> TrabajadorAs435()
        {
            var List =  await context.Asignaciones.Where(u => u.EdificioNumero == 435).ToListAsync();
            var Trabajadores =  await context.Trabajadores.ToListAsync();
            var Search = Trabajadores.Where(p=> List.Any(u=>u.TrabajadorNumero == p.TrabajadorNumero)).ToList();
            var res = Search.Join(// outer sequence 
               List,  // inner sequence 
               Search => Search.TrabajadorNumero,    // outerKeySelector
               List => List.TrabajadorNumero,  // innerKeySelector
               (List, Search) => new  // result selector
               {
                   List.TrabajadorNumero,
                   List.TrabajadorNombre,
                   List.TrabajadorTarifa,
                   List.Oficio,
                   List.TrabajadorSupervisor,
                   Search.EdificioNumero,
               }).OrderBy(u => u.TrabajadorNumero).ToList();
            return Ok(res);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Asignaciones>>> CantidadEd312()
        {
            var List = await context.Asignaciones.Where(u => u.EdificioNumero == 312).ToListAsync();
            var Trabajadores = await context.Trabajadores.ToListAsync();
            var Search = Trabajadores.Where(p => List.Any(u => u.TrabajadorNumero == p.TrabajadorNumero)).ToList();
            var res = List.Join(// outer sequence 
               Trabajadores,  // inner sequence 
               List => List.TrabajadorNumero,    // outerKeySelector
               Trabajadores => Trabajadores.TrabajadorNumero,  // innerKeySelector
               (List, Trabajadores) => new  // result selector
               {
                   List.TrabajadorNumero,
                   Trabajadores.TrabajadorNombre,
                   Trabajadores.Oficio,
                   Trabajadores.TrabajadorTarifa,
                   Trabajadores.TrabajadorSupervisor,
                   List.EdificioNumero,
                   List.AsignacionNoDias
               }).OrderBy(u => u.TrabajadorNumero).ToList();
            return Ok(res);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Asignaciones>>> TotalDias()
        {
            var Asignaciones = await context.Asignaciones.Where(u => u.EdificioNumero == 312).ToListAsync();
            var Trabajadores = await context.Trabajadores.ToListAsync();
            var List = Asignaciones.Where(p => Trabajadores.Any(u => u.TrabajadorNumero == p.TrabajadorNumero && u.Oficio.Contains("FONTANERO"))).ToList();
            float Calculate = 0;
            foreach (var li in List)
            {
                Calculate += li.AsignacionNoDias;
            }
            var result = Trabajadores.Where(p => List.Any(u => u.TrabajadorNumero == p.TrabajadorNumero)).ToList();
            var res = List.Join(// outer sequence 
                Trabajadores,  // inner sequence 
                List => List.TrabajadorNumero,    // outerKeySelector
                Trabajadores => Trabajadores.TrabajadorNumero,  // innerKeySelector
                (List, Trabajadores) => new  // result selector
                {
                    List.TrabajadorNumero,
                    Trabajadores.TrabajadorNombre,
                    Trabajadores.Oficio,
                    List.EdificioNumero,
                    List.AsignacionNoDias,
                    Calculate
                }).OrderBy(u=>u.TrabajadorNumero).ToList();

            return Ok(res);
        }

    }
}
