import { Router } from "express";
import { body } from "express-validator";
import { ProjectController } from "../controllers/ProjectController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

class ProjectRoutes {
  constructor() {
    this.router = Router();
    this.controller = new ProjectController();

    this.router
      .route("/")
      .get(this.controller.getAll)
      .post(
        authMiddleware(["emprendedor", "admin"]),
        [
          body("nombre_proyecto")
            .trim()
            .notEmpty()
            .withMessage("El nombre es obligatorio"),
          body("url_logo")
            .notEmpty()
            .isURL()
            .withMessage("La URL del logo debe ser válida"),
          body("descripcion")
            .trim()
            .notEmpty()
            .withMessage("La descripción es obligatoria"),
          body("categorias")
            .isArray()
            .withMessage("Categorías debe ser un arreglo"),
          body("redes").isArray().withMessage("Redes debe ser un arreglo"),
        ],
        this.controller.create
      );

    this.router
      .route("/:id_proyecto")
      .get(this.controller.getOne)
      .put(authMiddleware(["emprendedor", "admin"]), this.controller.update)
      .delete(authMiddleware(["emprendedor", "admin"]), this.controller.delete);
  }
}

export { ProjectRoutes };
