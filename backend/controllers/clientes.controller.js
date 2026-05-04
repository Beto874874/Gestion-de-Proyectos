const clienteModel = require('../models/clientes.model');

// GET
const getClientes = async (req, res) => {
  try {
    const data = await clienteModel.getClientes();

    res.json({
      success: true,
      data: data,
      message: 'Clientes obtenidos'
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// POST
const createCliente = async (req, res) => {
  try {
    await clienteModel.createCliente(req.body);

    res.json({
      success: true,
      message: 'Cliente creado'
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// PUT
const updateCliente = async (req, res) => {
  try {
    await clienteModel.updateCliente(req.params.id, req.body);

    res.json({
      success: true,
      message: 'Cliente actualizado'
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// DELETE
const deleteCliente = async (req, res) => {
  try {
    await clienteModel.deleteCliente(req.params.id);

    res.json({
      success: true,
      message: 'Cliente eliminado'
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


module.exports = {
  getClientes,
  createCliente,
  deleteCliente,
  updateCliente
};
