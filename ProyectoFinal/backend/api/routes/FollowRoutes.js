import { Router } from "express";
import { FollowController } from "../controllers/FollowController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

class FollowRoutes {
  constructor() {
    this.router = Router();
    this.controller = new FollowController();

    this.router
      .route("/")
      .get(authMiddleware(["inversionista", "admin"]), this.controller.getFollowed); // Obtener proyectos seguidos

    this.router
      .route("/:id_proyecto")
      .post(authMiddleware(["inversionista", "admin"]), this.controller.follow) // Seguir un proyecto
      .delete(authMiddleware(["inversionista", "admin"]), this.controller.unfollow); // Dejar de seguir un proyecto
  }
}

export { FollowRoutes };
