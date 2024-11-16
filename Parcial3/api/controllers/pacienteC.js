import PatientService from '../services/pacienteS.js';

class PatientController {
    static async getPatientById(req, res) {
        const { patientId } = req.params;

        try {
            const patient = await PatientService.getPatientById(patientId);

            if (!patient) {
                return res.status(404).json({ message: 'Paciente no encontrado' });
            }

            res.status(200).json(patient);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    }
}

export default PatientController;
