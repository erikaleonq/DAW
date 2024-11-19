import jwt from "jsonwebtoken";

// Generar un token JWT
export const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET);
};

// Verificar un token JWT
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error("Invalid token");
  }
};
