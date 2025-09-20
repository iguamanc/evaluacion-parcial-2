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
    public class EmpleadosApi : ControllerBase
    {
        private readonly DatosDbContext _context;

        public EmpleadosApi(DatosDbContext context)
        {
            _context = context;
        }

        // GET: api/EmpleadosApi
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EmpleadosModel>>> GetEmpleados()
        {
            return await _context.Empleados.ToListAsync();
        }

        // GET: api/EmpleadosApi/5
        [HttpGet("{id}")]
        public async Task<ActionResult<EmpleadosModel>> GetEmpleadosModel(int id)
        {
            var empleadosModel = await _context.Empleados.FindAsync(id);

            if (empleadosModel == null)
            {
                return NotFound();
            }

            return empleadosModel;
        }

        // PUT: api/EmpleadosApi/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmpleadosModel(int id, EmpleadosModel empleadosModel)
        {
            if (id != empleadosModel.Id)
            {
                return BadRequest();
            }

            _context.Entry(empleadosModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmpleadosModelExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(id);
        }

        // POST: api/EmpleadosApi
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<EmpleadosModel>> PostEmpleadosModel(EmpleadosModel empleadosModel)
        {
            _context.Empleados.Add(empleadosModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEmpleadosModel", new { id = empleadosModel.Id }, empleadosModel);
        }

        // DELETE: api/EmpleadosApi/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmpleadosModel(int id)
        {
            var empleadosModel = await _context.Empleados.FindAsync(id);
            if (empleadosModel == null)
            {
                return NotFound();
            }

            _context.Empleados.Remove(empleadosModel);
            await _context.SaveChangesAsync();

            return Ok(id);
        }

        private bool EmpleadosModelExists(int id)
        {
            return _context.Empleados.Any(e => e.Id == id);
        }
    }
}
