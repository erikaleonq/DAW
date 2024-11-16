import PatientService from '../services/pacienteS.js';

export const getPatient = async (req, res) => {
    const { patientId } = req.params;

    try {
        const patient = await PatientService.getPatientById(patientId);

        if (!patient) {
        return res.status(404).json({ error: 'Paciente no encontrado' });
        }

        res.status(200).json(patient);
    } catch (error) {
        console.error('Error al obtener el paciente:', error);
        res.status(500).json({ error: 'Error del servidor' });
    }
};
