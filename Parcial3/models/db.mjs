import pkg from 'pg'; // Importa todo el módulo como un objeto
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg; // Desestructura 'Pool' desde la exportación por defecto

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export default pool;
