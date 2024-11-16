import express from 'express';
import AppointmentController from '../controllers/appointmentC.js';
import validatePatientId from '../middlewares/validateM.js';

const router = express.Router();

router.get('/:patientId/appointment', validatePatientId, AppointmentController.getAppointmentsByPatientId);

export default router;