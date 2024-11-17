import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

class Db {
    constructor() {
        if (!Db.instance) {
        Db.instance = new Pool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            port: process.env.DB_PORT || 5432,
        });
        }
        return Db.instance;
    }

    async query(query, params) {
        const client = await Db.instance.connect();
        try {
        const result = await client.query(query, params);
        return result;
        } finally {
        client.release();
        }
    }
}

export { Db };
