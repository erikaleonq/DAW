import express from "express";
import { UserRoutes } from "./api/routes/UserRoute.js";
import { LoginRoutes } from "./api/routes/LoginRoutes.js";
import { setContentType } from "./api/middleware/setContentType.js";

const app = express();

// Middlewares
app.use(express.json());
app.use(setContentType);


// Rutas
const userRoutes = new UserRoutes();
const loginRoutes = new LoginRoutes();


app.use("/users", userRoutes.router);
app.use("/login", loginRoutes.router);

// Error handler
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


