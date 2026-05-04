const colaboradorModel = require('../models/colaboradores.model');

const getColaboradores = async (req, res) => {
  try {
    const data = await colaboradorModel.getColaboradores();
    res.json({ success: true, data, message: 'Colaboradores obtenidos' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createColaborador = async (req, res) => {
  try {
    await colaboradorModel.createColaborador(req.body);
    res.json({ success: true, message: 'Colaborador creado' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateColaborador = async (req, res) => {
  try {
    await colaboradorModel.updateColaborador(req.params.id, req.body);
    res.json({ success: true, message: 'Colaborador actualizado' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteColaborador = async (req, res) => {
  try {
    await colaboradorModel.deleteColaborador(req.params.id);
    res.json({ success: true, message: 'Colaborador eliminado' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getColaboradores,
  createColaborador,
  updateColaborador,
  deleteColaborador
};