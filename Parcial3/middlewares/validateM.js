import { body, param, validationResult } from 'express-validator';

export const validateMiddleware = (method) => {
    switch (method) {
        case 'getPatient':
        return [
            param('patientId').isInt().withMessage('El ID del paciente debe ser un número entero'),
            (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            next();
            },
        ];
        default:
        return (req, res, next) => next();
    }
};

