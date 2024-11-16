import express from 'express';
import { createAppointment } from '../controllers/appointC.js';
import { authMiddleware } from '../middlewares/authM.js';
import { validateAppointment } from '../middlewares/validateM.js';

const router = express.Router();

router.post('/', authMiddleware(['admin', 'doctor']), createAppointment);

export default router;
