import { MedicalAppointment } from '../models/appoint.mjs';

export const createAppointment = async (req, res) => {
    const { doctorId, patientId, date, hour } = req.body;

    try {
        const appointment = await MedicalAppointment.createAppointment(doctorId, patientId, date, hour);
        res.status(201).json(appointment);
    } catch (error) {
        console.error('Error al crear la cita:', error);
        res.status(400).json({ error: error.message });
    }
};
