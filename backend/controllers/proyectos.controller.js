const proyectoModel = require('../models/proyectos.model');

const getProyectos = async (req, res) => {
  try {
    const data = await proyectoModel.getProyectos();
    res.json({ success: true, data, message: 'Proyectos obtenidos' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createProyecto = async (req, res) => {
  try {
    await proyectoModel.createProyecto(req.body);
    res.json({ success: true, message: 'Proyecto creado' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateProyecto = async (req, res) => {
  try {
    await proyectoModel.updateProyecto(req.params.id, req.body);
    res.json({ success: true, message: 'Proyecto actualizado' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteProyecto = async (req, res) => {
  try {
    await proyectoModel.deleteProyecto(req.params.id);
    res.json({ success: true, message: 'Proyecto eliminado' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getProyectos,
  createProyecto,
  updateProyecto,
  deleteProyecto
};