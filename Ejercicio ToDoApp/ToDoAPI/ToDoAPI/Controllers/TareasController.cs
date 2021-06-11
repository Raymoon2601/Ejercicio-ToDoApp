using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using ToDoAPI.Models;
using System.Web.Http.Cors;

namespace ToDoAPI.Controllers
{
    [EnableCors( origins: "*", headers: "*", methods: "*")]
    public class TareasController : ApiController
    {
        private ToDoModelContainer db = new ToDoModelContainer();

        // GET: api/Tareas
        public IQueryable<Tareas> GetTareasSet()
        {
            return db.TareasSet;
        }

        // GET: api/Tareas/5
        [ResponseType(typeof(Tareas))]
        public IHttpActionResult GetTareas(int id)
        {
            Tareas tareas = db.TareasSet.Find(id);
            if (tareas == null)
            {
                return NotFound();
            }

            return Ok(tareas);
        }

        // PUT: api/Tareas/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutTareas(int id, Tareas tareas)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != tareas.Id)
            {
                return BadRequest();
            }

            db.Entry(tareas).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TareasExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Tareas
        [ResponseType(typeof(Tareas))]
        public IHttpActionResult PostTareas(Tareas tareas)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.TareasSet.Add(tareas);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = tareas.Id }, tareas);
        }

        // DELETE: api/Tareas/5
        [ResponseType(typeof(Tareas))]
        public IHttpActionResult DeleteTareas(int id)
        {
            Tareas tareas = db.TareasSet.Find(id);
            if (tareas == null)
            {
                return NotFound();
            }

            db.TareasSet.Remove(tareas);
            db.SaveChanges();

            return Ok(tareas);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TareasExists(int id)
        {
            return db.TareasSet.Count(e => e.Id == id) > 0;
        }
    }
}