import { Db } from "../database/Db.js";
import { CustomError } from "../utils/CustomError.js";

class FollowService {
  // Seguir un proyecto
  async followProject(id_usuario, id_proyecto) {
    try {
      const query = `
        INSERT INTO proyectos_seguidos (id_usuario, id_proyecto)
        VALUES ($1, $2)
        RETURNING *;
      `;
      const result = await new Db().query_(query, [id_usuario, id_proyecto]);
      return result.rows[0];
    } catch (error) {
      if (error.code === "23505") {
        throw new CustomError(400, "Ya estás siguiendo este proyecto");
      }
      console.error("Error al seguir proyecto:", error);
      throw new CustomError(error.code || "DB_ERROR", error.message);
    }
  }

  // Dejar de seguir un proyecto
  async unfollowProject(id_usuario, id_proyecto) {
    try {
      const query = `
        DELETE FROM proyectos_seguidos
        WHERE id_usuario = $1 AND id_proyecto = $2
        RETURNING *;
      `;
      const result = await new Db().query_(query, [id_usuario, id_proyecto]);
      if (result.rowCount === 0) {
        throw new CustomError(404, "No estás siguiendo este proyecto");
      }
      return true;
    } catch (error) {
      console.error("Error al dejar de seguir proyecto:", error);
      throw new CustomError(error.code || "DB_ERROR", error.message);
    }
  }

  // Obtener proyectos seguidos por un usuario
  async getFollowedProjects(id_usuario) {
    try {
      const query = `
        SELECT p.*
        FROM proyectos_seguidos ps
        JOIN proyectos p ON ps.id_proyecto = p.id_proyecto
        WHERE ps.id_usuario = $1;
      `;
      const result = await new Db().query_(query, [id_usuario]);
      return result.rows;
    } catch (error) {
      console.error("Error al obtener proyectos seguidos:", error);
      throw new CustomError(error.code || "DB_ERROR", error.message);
    }
  }
}

export { FollowService };
