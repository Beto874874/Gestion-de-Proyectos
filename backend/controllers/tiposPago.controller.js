const tiposPagoModel = require('../models/tiposPago.model');

const getTiposPago = async (req, res) => {
  try {
    const data = await tiposPagoModel.getTiposPago();
    res.json({ success: true, data, message: 'Tipos de pago obtenidos' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createTipoPago = async (req, res) => {
  try {
    await tiposPagoModel.createTipoPago(req.body);
    res.json({ success: true, message: 'Tipo de pago creado' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateTipoPago = async (req, res) => {
  try {
    await tiposPagoModel.updateTipoPago(req.params.id, req.body);
    res.json({ success: true, message: 'Tipo de pago actualizado' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteTipoPago = async (req, res) => {
  try {
    await tiposPagoModel.deleteTipoPago(req.params.id);
    res.json({ success: true, message: 'Tipo de pago eliminado' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getTiposPago, createTipoPago, updateTipoPago, deleteTipoPago };