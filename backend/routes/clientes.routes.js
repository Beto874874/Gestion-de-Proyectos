const express = require('express');
const router = express.Router();
const controller = require('../controllers/clientes.controller');
const verificarToken = require('../middleware/auth.middleware');
const verificarRol= require('../middleware/roleMiddleware')


// todos pueden ver
router.get('/', verificarToken, controller.getClientes);

// solo admin
router.post('/', verificarToken, verificarRol(['admin']), controller.createCliente);
router.put('/:id', verificarToken, verificarRol(['admin']), controller.updateCliente);
router.delete('/:id', verificarToken, verificarRol(['admin']), controller.deleteCliente);

module.exports = router;

