const validatePatientId = (req, res, next) => {
    const { patientId } = req.params;
    console.log(patientId)

    if (isNaN(patientId)) {
        return res.status(400).json({ message: 'El ID del paciente debe ser un número válido' });
    }

    next();
};


export default validatePatientId;

