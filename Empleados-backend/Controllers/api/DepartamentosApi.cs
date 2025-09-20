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
    public class DepartamentosApi : ControllerBase
    {
        private readonly DatosDbContext _context;

        public DepartamentosApi(DatosDbContext context)
        {
            _context = context;
        }

        // GET: api/DepartamentosApi
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DepartamentosModel>>> GetDepartamentos()
        {
            return await _context.Departamentos.ToListAsync();
        }

        // GET: api/DepartamentosApi/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DepartamentosModel>> GetDepartamentosModel(int id)
        {
            var departamentosModel = await _context.Departamentos.FindAsync(id);

            if (departamentosModel == null)
            {
                return NotFound();
            }

            return departamentosModel;
        }

        // PUT: api/DepartamentosApi/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDepartamentosModel(int id, DepartamentosModel departamentosModel)
        {
            if (id != departamentosModel.Id)
            {
                return BadRequest();
            }

            _context.Entry(departamentosModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DepartamentosModelExists(id))
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

        // POST: api/DepartamentosApi
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<DepartamentosModel>> PostDepartamentosModel(DepartamentosModel departamentosModel)
        {
            _context.Departamentos.Add(departamentosModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDepartamentosModel", new { id = departamentosModel.Id }, departamentosModel);
        }

        // DELETE: api/DepartamentosApi/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDepartamentosModel(int id)
        {
            var departamentosModel = await _context.Departamentos.FindAsync(id);
            if (departamentosModel == null)
            {
                return NotFound();
            }

            _context.Departamentos.Remove(departamentosModel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DepartamentosModelExists(int id)
        {
            return _context.Departamentos.Any(e => e.Id == id);
        }
    }
}
