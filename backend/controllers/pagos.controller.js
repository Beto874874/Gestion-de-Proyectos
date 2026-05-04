const pagoModel = require('../models/pagos.model');

const getPagos = async (req, res) => {
  try {
    const data = await pagoModel.getPagos();
    res.json({ success: true, data, message: 'Pagos obtenidos' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createPago = async (req, res) => {
  try {
    await pagoModel.createPago(req.body);
    res.json({ success: true, message: 'Pago creado' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updatePago = async (req, res) => {
  try {
    await pagoModel.updatePago(req.params.id, req.body);
    res.json({ success: true, message: 'Pago actualizado' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deletePago = async (req, res) => {
  try {
    await pagoModel.deletePago(req.params.id);
    res.json({ success: true, message: 'Pago eliminado' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getPagos,
  createPago,
  updatePago,
  deletePago
};