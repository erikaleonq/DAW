import pool from './db.mjs';

export class MedicalAppointment {
    static async validateAppointment(doctorId, patientId, date, hour) {
        const query = `
        SELECT * FROM medicalappointment
        WHERE (doctor_id = $1 AND date = $2 AND hour = $3)
        OR (patient_id = $4 AND date = $2 AND hour = $3)
        `;
        const { rows } = await pool.query(query, [doctorId, date, hour, patientId]);
        if (rows.length > 0) {
            throw new Error('Ya hay una cita registrada para esta fecha y hora.');
        }
    }

    static async createAppointment(doctorId, patientId, date, hour) {
        await this.validateAppointment(doctorId, patientId, date, hour);
        const query = `
        INSERT INTO medicalappointment (doctor_id, patient_id, date, hour)
        VALUES ($1, $2, $3, $4) RETURNING *
        `;
        const { rows } = await pool.query(query, [doctorId, patientId, date, hour]);
        return rows[0];
    }
}
