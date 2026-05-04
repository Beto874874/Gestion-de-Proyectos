-- CLIENTES
INSERT INTO clientes (codigo_cliente, razon_social, domicilio, telefono) VALUES
(1, 'Tech Solutions SAS', 'Calle 10 #20-30', '3001234567'),
(2, 'Constructora Andes', 'Carrera 15 #45-60', '3109876543');

-- COLABORADORES
INSERT INTO colaboradores (nif, nombre, domicilio, telefono, banco, numero_cuenta) VALUES
('123456789', 'Juan Perez', 'Calle 5 #12-34', '3001112222', 'Bancolombia', '1234567890'),
('987654321', 'Maria Gomez', 'Carrera 8 #22-11', '3013334444', 'Davivienda', '0987654321');

-- TIPOS DE PAGO
INSERT INTO tipos_pago (codigo_tipo, descripcion) VALUES
(1, 'Transferencia'),
(2, 'Efectivo'),
(3, 'Cheque');

-- PROYECTOS
INSERT INTO proyectos (codigo_proyecto, descripcion, cuantia, fecha_inicio, fecha_fin, id_cliente) VALUES
(1, 'Sistema Web Inventario', 5000000, '2026-01-10', '2026-03-15', 1),
(2, 'App Movil Ventas', 8000000, '2026-02-01', '2026-04-30', 2);

-- PARTICIPACIONES
INSERT INTO participaciones (id_proyecto, nif_colaborador) VALUES
(1, '123456789'),
(1, '987654321'),
(2, '987654321');

-- PAGOS
INSERT INTO pagos (numero_pago, concepto, cantidad, fecha_pago, nif_colaborador, id_tipo_pago) VALUES
(1, 'Pago inicial', 1000000, '2026-01-15', '123456789', 1),
(2, 'Pago avance', 2000000, '2026-02-20', '987654321', 2);
