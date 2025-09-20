using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Empleados_backend.Data;
using Empleados_backend.Models;

namespace Empleados_backend.Controllers.api
{
    [Route("api/[controller]")]
    [ApiController]
    public class AsignacionesApi : ControllerBase
    {
        private readonly DatosDbContext _context;

        public AsignacionesApi(DatosDbContext context)
        {
            _context = context;
        }

        // GET: api/AsignacionesApi
        /* [HttpGet]
         public async Task<ActionResult<IEnumerable<AsignacionesModel>>> GetAsignaciones()
         {
             return await _context.Asignaciones.ToListAsync();
         }*/

        // GET: api/Asignaciones
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AsignacionesModel>>> GetAsignaciones()
        {
            var asignaciones = await _context.Asignaciones
                .Include(a => a.Empleados)
                .Include(a => a.Departamentos)
                .ToListAsync();

            return Ok(asignaciones);
        }



        // GET: api/AsignacionesApi/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AsignacionesModel>> GetAsignacionesModel(int id)
        {
            var asignacionesModel = await _context.Asignaciones.FindAsync(id);

            if (asignacionesModel == null)
            {
                return NotFound();
            }

            return asignacionesModel;
        }

        // PUT: api/AsignacionesApi/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAsignacionesModel(int id, AsignacionesModel asignacionesModel)
        {
            if (id != asignacionesModel.Id)
            {
                return BadRequest();
            }

            _context.Entry(asignacionesModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AsignacionesModelExists(id))
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

        // POST: api/AsignacionesApi
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<AsignacionesModel>> PostAsignacionesModel(AsignacionesModel asignacionesModel)
        {
            _context.Asignaciones.Add(asignacionesModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAsignacionesModel", new { id = asignacionesModel.Id }, asignacionesModel);
        }

        // DELETE: api/AsignacionesApi/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsignacionesModel(int id)
        {
            var asignacionesModel = await _context.Asignaciones.FindAsync(id);
            if (asignacionesModel == null)
            {
                return NotFound();
            }

            _context.Asignaciones.Remove(asignacionesModel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AsignacionesModelExists(int id)
        {
            return _context.Asignaciones.Any(e => e.Id == id);
        }
    }
}
