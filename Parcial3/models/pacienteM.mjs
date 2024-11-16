import pool from './db.mjs';

export class Patient {
    static async findById(patientId) {
        const query = 'SELECT * FROM patient WHERE id = $1';
        const { rows } = await pool.query(query, [patientId]);
        return rows[0]; // Retorna un solo paciente
    }
}
