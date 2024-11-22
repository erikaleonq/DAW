import { Db } from "../database/Db.js";
import { CustomError } from "../utils/CustomError.js";

class UserService {

    getUser = async (userId) => {
        try {
            const result = await new Db().query_('SELECT id, full_name, email, role FROM users WHERE id = $1', [userId]);
            
            return result.rows[0];
        } catch (error) {
            throw new CustomError(error.code, error.detail);
        }
    }

    getAll = async () => {
        try {
        const results = await new Db().query_("SELECT * FROM users");
        return results.rows;
        } catch (error) {
            console.log(error)
            console.error('Database query error:', error); // Log the full error object
            throw new CustomError(error.code || 'UNKNOWN_ERROR', error.detail || error.message);
        }
    };

    createUser = async (full_name, email, password, telefono, role) => {
        try {
        const result = await new Db().query_(
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
        const result = await new Db().query_("SELECT * FROM users WHERE id = $1", [
            id,
        ]);
        return result.rows[0];
        } catch (error) {
        throw new CustomError(error.code, error.detail);
        }
    };

    updateUser = async (id, full_name, telefono) => {
        try {
        const result = await new Db().query_(
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
        const result = await new Db().query_(
            `DELETE FROM users WHERE id = $1 RETURNING *`,
            [id]
        );
        return result.rowCount > 0;
        } catch (error) {
        throw new CustomError(error.code, error.detail);
        }
    };

    getByEmailAndPassword = async (email, password) => {
        try {
          const result = await new Db().query_(`SELECT * FROM users WHERE email = $1`, [
            email,
          ]);
          const user = result.rows[0];
          console.log(user)

          if (user && password == user.password) {
            return user;
          }
          return null;
        } catch (error) {
          throw new CustomError(error.code, error.detail);
        }
    };
}

export { UserService };
