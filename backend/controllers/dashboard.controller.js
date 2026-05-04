const dashboardModel = require('../models/dashboard.model');

const getEstadisticas = async (req, res) => {
  try {
    const data = await dashboardModel.getEstadisticas();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getEstadisticas };