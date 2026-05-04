CREATE DATABASE IF NOT EXISTS gestion_proyectos;
USE gestion_proyectos;

-- Tabla Clientes
CREATE TABLE clientes (
    codigo_cliente INT AUTO_INCREMENT PRIMARY KEY,
    razon_social VARCHAR(150) NOT NULL,
    domicilio VARCHAR(200) NOT NULL,
    telefono VARCHAR(20) NOT NULL
);

-- Tabla Proyectos
CREATE TABLE proyectos (
    codigo_proyecto INT AUTO_INCREMENT PRIMARY KEY,
    descripcion TEXT NOT NULL,
    cuantia DECIMAL(15, 2) NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    id_cliente INT NOT NULL,
    CONSTRAINT fk_cliente_proyecto FOREIGN KEY (id_cliente) 
        REFERENCES clientes(codigo_cliente)
);

-- Tabla Colaboradores
CREATE TABLE colaboradores (
    nif VARCHAR(20) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    domicilio VARCHAR(200) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    banco VARCHAR(100) NOT NULL,
    numero_cuenta VARCHAR(30) NOT NULL
);

-- Tabla Intermedia Participaciones (Muchos a Muchos)
CREATE TABLE participaciones (
    id_proyecto INT NOT NULL,
    nif_colaborador VARCHAR(20) NOT NULL,
    PRIMARY KEY (id_proyecto, nif_colaborador),
    CONSTRAINT fk_proyecto_part FOREIGN KEY (id_proyecto) 
        REFERENCES proyectos(codigo_proyecto),
    CONSTRAINT fk_colaborador_part FOREIGN KEY (nif_colaborador) 
        REFERENCES colaboradores(nif)
);

-- Tabla Tipos de Pago
CREATE TABLE tipos_pago (
    codigo_tipo INT AUTO_INCREMENT PRIMARY KEY,
    descripcion VARCHAR(100) NOT NULL
);

-- Tabla Pagos
CREATE TABLE pagos (
    numero_pago INT AUTO_INCREMENT PRIMARY KEY,
    concepto VARCHAR(200) NOT NULL,
    cantidad DECIMAL(15, 2) NOT NULL,
    fecha_pago DATE NOT NULL,
    nif_colaborador VARCHAR(20) NOT NULL,
    id_tipo_pago INT NOT NULL,
    CONSTRAINT fk_colaborador_pago FOREIGN KEY (nif_colaborador) 
        REFERENCES colaboradores(nif),
    CONSTRAINT fk_tipo_pago_pago FOREIGN KEY (id_tipo_pago) 
        REFERENCES tipos_pago(codigo_tipo)
);

-- Tabla Usuarios
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    rol ENUM('admin','usuario') DEFAULT 'usuario'
);