import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Client } = pg;


class PatientService {
    static async getPatientById(patientId) {
        try {
            const client =  new Client({
                user: process.env.DB_USER,
                host: process.env.DB_HOST,
                database: process.env.DB_NAME,
                password: process.env.DB_PASSWORD,
                port: process.env.DB_PORT,
            });
            await client.connect();
            console.log("Conectando")
            const result = await client.query('SELECT * FROM patient WHERE id = $1', [patientId]);
            console.log(result.rows)

            client.end();
        
            if (result.rows.length === 0) {
                return null;
            }
            const { id, name, age, email, password } = result.rows[0];
            return { id, name, age, email, password };
        } catch (error) {
            throw new Error('Error al consultar la base de datos');
        }
    }
}

export default PatientService;

