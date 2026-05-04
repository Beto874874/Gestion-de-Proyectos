const express = require('express');
const cors = require('cors');
require('dotenv').config();

const pool = require('./database/conexion');

const authRoutes = require('./routes/auth.routes');
const clientesRoutes = require('./routes/clientes.routes');

const colaboradoresRoutes = require('./routes/colaboradores.routes');
const proyectosRoutes     = require('./routes/proyectos.routes');
const pagosRoutes         = require('./routes/pagos.routes');
const tiposPagoRoutes = require('./routes/tiposPago.routes');
const dashboardRoutes = require('./routes/dashboard.routes');


const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares globales
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/clientes', clientesRoutes);

app.use('/api/colaboradores', colaboradoresRoutes);
app.use('/api/proyectos',     proyectosRoutes);
app.use('/api/pagos',         pagosRoutes);
app.use('/api/tipos-pago', tiposPagoRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Servidor
app.listen(PORT, () => {
    console.log(` Servidor corriendo en http://localhost:${PORT}`);
});
