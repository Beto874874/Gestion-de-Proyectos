const express = require('express');
const router = express.Router();
const controller = require('../controllers/tiposPago.controller');
const verificarToken = require('../middleware/auth.middleware');
const verificarRol = require('../middleware/roleMiddleware');

router.get('/', verificarToken, controller.getTiposPago);
router.post('/', verificarToken, verificarRol(['admin']), controller.createTipoPago);
router.put('/:id', verificarToken, verificarRol(['admin']), controller.updateTipoPago);
router.delete('/:id', verificarToken, verificarRol(['admin']), controller.deleteTipoPago);

module.exports = router;