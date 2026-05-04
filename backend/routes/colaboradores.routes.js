const express = require('express');
const router = express.Router();
const controller = require('../controllers/colaboradores.controller');
const verificarToken = require('../middleware/auth.middleware');
const verificarRol = require('../middleware/roleMiddleware');

router.get('/', verificarToken, controller.getColaboradores);
router.post('/', verificarToken, verificarRol(['admin']), controller.createColaborador);
router.put('/:id', verificarToken, verificarRol(['admin']), controller.updateColaborador);
router.delete('/:id', verificarToken, verificarRol(['admin']), controller.deleteColaborador);

module.exports = router;