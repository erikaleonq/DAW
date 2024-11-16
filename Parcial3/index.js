import express from 'express';
import dotenv from 'dotenv';
import patientRoutes from './routes/pacienteR.js';
import appointmentRoutes from './routes/appointR.js';
import { errorHandler } from './middlewares/errorM.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use('/paciente', patientRoutes);
app.use('/appoint', appointmentRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
