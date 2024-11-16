import express from 'express';
import patientRoutes from './api/routes/pacienteR.js';
import appoimentRoutes from './api/routes/appointmentR.js';

const app = express();

// Middleware para manejar JSON
app.use(express.json());

// Configuración de rutas
app.use('/patient', patientRoutes);
app.use('/patient', appoimentRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
