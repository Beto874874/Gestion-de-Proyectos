const express = require('express');
const router = express.Router();
const controller = require('../controllers/dashboard.controller');
const verificarToken = require('../middleware/auth.middleware');

router.get('/', verificarToken, controller.getEstadisticas);

module.exports = router;