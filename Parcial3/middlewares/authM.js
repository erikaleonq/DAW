import jwt from 'jsonwebtoken';

export const authMiddleware = (roles) => (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Token no proporcionado' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        if (!roles.includes(decoded.role)) {
        return res.status(403).json({ error: 'Permisos insuficientes' });
        }

        next();
    } catch (error) {
        return res.status(401).json({ error: 'Token inválido' });
    }
};
