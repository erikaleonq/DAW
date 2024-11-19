import { Router } from "express";
import { body } from "express-validator";
import { UserController } from "../controllers/UserController.js";

class LoginRoutes {
  constructor() {
    this.router = Router();
    this.controller = new UserController();

    this.router.post(
      "/",
      [
        body("email").isEmail().withMessage("Invalid email format"),
        body("password").notEmpty().withMessage("Password is required"),
      ],
      this.controller.login
    );
  }
}

export { LoginRoutes };
