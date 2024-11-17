import { Db } from "../database/Db.js";
import { CustomError } from "../utils/CustomError.js";

class UserService {
    getAll = async () => {
        try {
        const results = await new Db().query("SELECT * FROM users");
        return results.rows;
        } catch (error) {
        throw new CustomError(error.code, error.detail);
        }
    };

    createUser = async (full_name, email, password, telefono, role) => {
        try {
        const result = await new Db().query(
            `INSERT INTO users (full_name, email, password, telefono, role) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [full_name, email, password, telefono, role]
        );
        return result.rows[0];
        } catch (error) {
        throw new CustomError(error.code, error.detail);
        }
    };

    getOne = async (id) => {
        try {
        const result = await new Db().query("SELECT * FROM users WHERE id = $1", [
            id,
        ]);
        return result.rows[0];
        } catch (error) {
        throw new CustomError(error.code, error.detail);
        }
    };

    updateUser = async (id, full_name, telefono) => {
        try {
        const result = await new Db().query(
            `UPDATE users SET full_name = $1, telefono = $2 WHERE id = $3 RETURNING *`,
            [full_name, telefono, id]
        );
        return result.rows[0];
        } catch (error) {
        throw new CustomError(error.code, error.detail);
        }
    };

    deleteUser = async (id) => {
        try {
        const result = await new Db().query(
            `DELETE FROM users WHERE id = $1 RETURNING *`,
            [id]
        );
        return result.rowCount > 0;
        } catch (error) {
        throw new CustomError(error.code, error.detail);
        }
    };
}

export { UserService };
