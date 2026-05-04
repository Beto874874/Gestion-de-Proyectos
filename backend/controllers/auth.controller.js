const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const usuarioModel = require('../models/usuario.model');

// REGISTRO
const register = async (req, res) => {
    try {
        const { usuario, password, rol } = req.body;

        if (!usuario || !password) {
            return res.status(400).json({ msg: 'Faltan datos' });
        }

        // Encriptar contraseña
        const hash = await bcrypt.hash(password, 10);

        await usuarioModel.crearUsuario(usuario, hash, rol || 'usuario');

        res.json({ msg: 'Usuario registrado correctamente' });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// LOGIN
const login = async (req, res) => {
    try {
        const { usuario, password } = req.body;

        const user = await usuarioModel.buscarPorUsuario(usuario);

        if (!user) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }

        // Comparar contraseña
        const valid = await bcrypt.compare(password, user.password);

        if (!valid) {
            return res.status(401).json({ msg: 'Contraseña incorrecta' });
        }

        // Generar token
        const token = jwt.sign(
            { id: user.id, rol: user.rol },
            process.env.JWT_SECRET,
            { expiresIn: '8h' }
        );

        res.json({
            msg: 'Login exitoso',
            token
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    register,
    login
};
