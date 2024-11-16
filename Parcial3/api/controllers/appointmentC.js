import AppointmentService from '../services/appointmentS.js';

class AppointmentController {
    static async getAppointmentsByPatientId(req, res) {
        const { patientId } = req.params;

        try {
            const appointments = await AppointmentService.getAppointmentsByPatientId(patientId);

            if (appointments.length === 0) {
                return res.status(404).json({ message: 'No se encontraron citas para el paciente especificado' });
            }

            res.status(200).json(appointments);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    }
}

export default AppointmentController;