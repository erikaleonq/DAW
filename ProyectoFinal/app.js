import express from "express";
import { UserRoutes } from "./api/routers/UserRoutes.js";
import { setContentType } from "./api/middlewares/setContentType.js";

const app = express();

// Middlewares
app.use(express.json());
app.use(setContentType);

// Rutas
const userRoutes = new UserRoutes();
app.use("/api/users", userRoutes.router);

// Error handler
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
});

export default app;

