import express from 'express';
import PatientController from '../controllers/pacienteC.js';
import validatePatientId from '../middlewares/validateM.js';

const router = express.Router();

router.get('/:patientId', validatePatientId, PatientController.getPatientById);

export default router;