import { Router } from "express";
import { body } from "express-validator";
import { UserController } from "../controllers/UserController";

class UserRoutes {
    constructor() {
        this.router = Router();
        this.controller = new UserController();

        this.router
        .route("/")
        .get(this.controller.getAll)
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
        .get(this.controller.getOne)
        .put(this.controller.updateUser)
        .delete(this.controller.deleteUser);
    }
}

export { UserRoutes };
