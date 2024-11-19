import { verifyToken } from "../utils/jwtUtils.js";

export const authMiddleware = (roles = []) => (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = verifyToken(token);
    req.user = decoded;

    // Verificar roles si se especifican
    if (roles.length > 0 && !roles.includes(decoded.role)) {
      return res.status(403).json({ message: "Access forbidden" });
    }

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
