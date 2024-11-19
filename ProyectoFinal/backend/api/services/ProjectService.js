import { Db } from "../database/Db.js";
import { CustomError } from "../utils/CustomError.js";

class ProjectService {
  async getAllProjects() {
    try {
      const query = "SELECT * FROM proyectos;";
      const result = await new Db().query_(query);
      return result.rows;
    } catch (error) {
      console.error("Error al obtener los proyectos:", error);
      throw new CustomError(error.code || "DB_ERROR", error.message);
    }
  }

  async getProjectById(id_proyecto) {
    try {
      const query = "SELECT * FROM proyectos WHERE id_proyecto = $1;";
      const result = await new Db().query_(query, [id_proyecto]);
      if (result.rows.length === 0) {
        throw new CustomError(404, "Project not found");
      }
      return result.rows[0];
    } catch (error) {
      console.error("Error al obtener el proyecto:", error);
      throw new CustomError(error.code || "DB_ERROR", error.message);
    }
  }

  async createProject({
    id_emprendedor,
    nombre_proyecto,
    descripcion,
    url_logo,
    categorias,
    redes,
  }) {
    try {
      const query = `
        INSERT INTO proyectos (id_emprendedor, nombre_proyecto, descripcion, url_logo, categorias, redes)
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;
      `;
      const values = [
        id_emprendedor,
        nombre_proyecto,
        descripcion,
        url_logo,
        categorias,
        redes,
      ];
      const result = await new Db().query_(query, values);
      return result.rows[0];
    } catch (error) {
      console.error("Error al crear el proyecto:", error);
      throw new CustomError(error.code || "DB_ERROR", error.message);
    }
  }

  async updateProject(id_proyecto, nombre_proyecto, descripcion, url_logo, categorias, redes) {
    try {
      const query = `
        UPDATE proyectos
        SET 
          nombre_proyecto = COALESCE($1, nombre_proyecto),
          descripcion = COALESCE($2, descripcion),
          url_logo = COALESCE($3, url_logo),
          categorias = COALESCE($4, categorias),
          redes = COALESCE($5, redes)
        WHERE id_proyecto = $6
        RETURNING *;
      `;
      const values = [nombre_proyecto, descripcion, url_logo, categorias, redes, id_proyecto];
      const result = await new Db().query_(query, values);
      if (result.rows.length === 0) {
        throw new CustomError(404, "Project not found");
      }
      return result.rows[0];
    } catch (error) {
      console.error("Error al actualizar el proyecto:", error);
      throw new CustomError(error.code || "DB_ERROR", error.message);
    }
  }

  async deleteProject(id_proyecto) {
    try {
      const query = "DELETE FROM proyectos WHERE id_proyecto = $1 RETURNING *;";
      const result = await new Db().query_(query, [id_proyecto]);
      if (result.rowCount === 0) {
        throw new CustomError(404, "Project not found");
      }
      return true;
    } catch (error) {
      console.error("Error al eliminar el proyecto:", error);
      throw new CustomError(error.code || "DB_ERROR", error.message);
    }
  }
}

export { ProjectService };
