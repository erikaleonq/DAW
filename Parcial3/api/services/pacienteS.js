import client from '../../database.js';

class PatientService {
    static async getPatientById(patientId) {
        try {
            await client.connect();
            console.log("Conectando")
            const result = await client.query('SELECT * FROM patient WHERE id = $1', [patientId]);
            console.log(result.rows)
        
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

