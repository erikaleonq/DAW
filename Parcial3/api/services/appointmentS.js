import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Client } = pg;

class AppointmentService {
    static async getAppointmentsByPatientId(patientId) {
        try {
            const client =  new Client({
                user: process.env.DB_USER,
                host: process.env.DB_HOST,
                database: process.env.DB_NAME,
                password: process.env.DB_PASSWORD,
                port: process.env.DB_PORT,
            });
            await client.connect();
            const result = await client.query(
                `SELECT ma.id, ma.date, ma.hour, ma.doctor_id, d.name as doctor_name, s.name as specialty
                 FROM medicalappointment ma
                 JOIN doctor d ON ma.doctor_id = d.id
                 JOIN specialty s ON d.specialty_id = s.id
                 WHERE ma.patient_id = $1
                 ORDER BY ma.date, ma.hour`,
                [patientId]
            );
            client.end();
            return result.rows;
        } catch (error) {
            console.error('Error al consultar las citas:', error);
            throw new Error('Error al consultar las citas');
        }
    }
}

export default AppointmentService;