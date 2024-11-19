import { Router } from "express";
import { body } from "express-validator";
import { UserController } from "../controllers/UserController.js" ;
import { authMiddleware } from "../middleware/authMiddleware.js";

class UserRoutes {
    constructor() {
        this.router = Router();
        this.controller = new UserController();

        this.router
        .route("/")
        .get(authMiddleware(["admin"]), this.controller.getAll)
        .post(
            [
            body("full_name").trim().notEmpty(),
            body("email").isEmail(),
            body("password").isLength({ min: 6 }),
            body("role").isIn(["inversionista", "emprendedor"]),
            ],
            this.controller.createUser
        );

        this.router
        .route("/:id")
        .get(authMiddleware(["inversionista", "emprendedor"]), this.controller.getOne)
        .put(authMiddleware(["inversionista", "emprendedor"]), this.controller.updateUser)
        .delete(authMiddleware(["admin"]), this.controller.deleteUser);
    }
}

export { UserRoutes };
