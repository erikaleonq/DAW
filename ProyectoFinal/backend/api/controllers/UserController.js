import { validationResult, matchedData } from "express-validator";
import { UserService } from "../services/UserService.js";
import { CustomError } from "../utils/CustomError.js";
import { generateToken } from "../utils/jwtUtils.js";

class UserController {
    #service;
    constructor() {
        this.#service = new UserService();
    }

    getAll = async (req, res) => {
        console.log("Usercontroller")
        const users = await this.#service.getAll();
        res.send(users);
    };

    createUser = async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array() });
        }

        const { full_name, email, password, telefono, role } = matchedData(req);
        try {
        const user = await this.#service.createUser(
            full_name,
            email,
            password,
            telefono,
            role
        );
        res.status(201).send(user);
        } catch (error) {
        if (error instanceof CustomError) {
            return res
            .status(500)
            .send({ code: error.code, message: error.message });
        }
        throw error;
        }
    };

    getOne = async (req, res) => {
        const { id } = req.params;
        try {
        const user = await this.#service.getOne(id);
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        res.send(user);
        } catch (error) {
        res.status(500).send({ message: error.message });
        }
    };

    updateUser = async (req, res) => {
        const { id } = req.params;
        const { full_name, telefono } = req.body;
        try {
        const updatedUser = await this.#service.updateUser(id, full_name, telefono);
        if (!updatedUser) {
            return res.status(404).send({ message: "User not found" });
        }
        res.status(200).send(updatedUser);
        } catch (error) {
        res.status(500).send({ message: error.message });
        }
    };

    deleteUser = async (req, res) => {
        const { id } = req.params;
        try {
        const deletedUser = await this.#service.deleteUser(id);
        if (!deletedUser) {
            return res.status(404).send({ message: "User not found" });
        }
        res.status(204).send();
        } catch (error) {
        res.status(500).send({ message: error.message });
        }
    };


    login = async (req, res) => {
        const { email, password } = req.body;

        console.log("UserController-login", email, password)
        try {
        const user = await this.#service.getByEmailAndPassword(email, password);
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Generar token JWT
        const token = generateToken({ id: user.id, role: user.role });
        res.json({ token });
        } catch (error) {
        res.status(500).json({ message: error.message });
        }
    };
}

export { UserController };
