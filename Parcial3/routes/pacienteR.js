import express from 'express';
import { getPatient } from '../controllers/pacienteC.js';
import { authMiddleware } from '../middlewares/authM.js';
import { validateMiddleware } from '../middlewares/validateM.js';

const router = express.Router();

router.get('/:patientId', authMiddleware(['admin', 'doctor']), validateMiddleware('getPatient'), getPatient);

export default router;
