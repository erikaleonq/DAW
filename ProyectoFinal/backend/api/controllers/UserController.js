import { validationResult, matchedData } from "express-validator";
import { UserService } from "../services/UserService.js";
import { CustomError } from "../utils/CustomError.js";

class UserController {
    #service;
    constructor() {
        this.#service = new UserService();
    }

    getAll = async (req, res) => {
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
}

export { UserController };
