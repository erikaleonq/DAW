require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const port = process.env.PORT || 3000;

// Configuración de la base de datos
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

app.use(express.json());

// Endpoint para registrar un usuario
app.post('/register', async (req, res) => {
    const { fullName, email, password, role } = req.body;

    // Validación de entrada
    if (!fullName || !email || !password || !role) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    // Validar que el rol sea correcto
    if (role !== 'inversionista' && role !== 'emprendedor') {
        return res.status(400).json({ message: 'El rol debe ser "inversionista" o "emprendedor"' });
    }

    try {
        const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (existingUser.rows.length > 0) {
            return res.status(400).json({ message: 'El email ya está registrado' });
        }

      // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

      // Insertar el nuevo usuario en la base de datos
        await pool.query('INSERT INTO users (full_name, email, password, role) VALUES ($1, $2, $3, $4)',
            [fullName, email, hashedPassword, role]
        );

        res.status(201).json({ message: 'Usuario registrado exitosamente' });
        } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al registrar usuario' });
    }
});

// Endpoint para iniciar sesión
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

        if (result.rows.length === 0) {
            return res.status(400).json({ message: 'Usuario no encontrado' });
        }

        const user = result.rows[0];

        // Verificar la contraseña
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

    // Generar token JWT
        const token = jwt.sign({ id: user.id, username: user.username }, 'secreto', {
        expiresIn: '1h',
        });

        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al iniciar sesión' });
    }
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});