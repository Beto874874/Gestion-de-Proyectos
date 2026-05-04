const express = require('express');
const router = express.Router();
const controller = require('../controllers/proyectos.controller');
const verificarToken = require('../middleware/auth.middleware');
const verificarRol = require('../middleware/roleMiddleware');

router.get('/', verificarToken, controller.getProyectos);
router.post('/', verificarToken, verificarRol(['admin']), controller.createProyecto);
router.put('/:id', verificarToken, verificarRol(['admin']), controller.updateProyecto);
router.delete('/:id', verificarToken, verificarRol(['admin']), controller.deleteProyecto);

module.exports = router;