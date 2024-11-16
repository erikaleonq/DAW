import { Patient } from '../models/pacienteM.mjs';

class PatientService {
    static async getPatientById(patientId) {
        return await Patient.findById(patientId);
    }
}

export default PatientService;

