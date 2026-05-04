const express = require('express');
const router = express.Router();
const controller = require('../controllers/pagos.controller');
const verificarToken = require('../middleware/auth.middleware');
const verificarRol = require('../middleware/roleMiddleware');

router.get('/', verificarToken, controller.getPagos);
router.post('/', verificarToken, verificarRol(['admin']), controller.createPago);
router.put('/:id', verificarToken, verificarRol(['admin']), controller.updatePago);
router.delete('/:id', verificarToken, verificarRol(['admin']), controller.deletePago);

module.exports = router;