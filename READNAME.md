# 📁 Sistema de Gestión de Proyectos — Ejercicio 15

**Autores:** JUAN ALBERTO TRUJILLO HERRERA & MARTÍN CAMILO CORREDOR PESCADOR  
**Universidad Libre Seccional Pereira · Facultad de Ingeniería**

Este proyecto es una aplicación web full-stack para la gestión de proyectos, clientes, colaboradores y pagos, desarrollada para la asignatura de **Programación II (Cliente/Servidor)**.

---

## 🛠️ Stack Tecnológico

**Frontend:**
- React 19 (Vite)
- TailwindCSS 4 (Estilizado moderno)
- React Router Dom 7 (Navegación)
- Axios (Peticiones HTTP)
- SweetAlert2 (Alertas interactivas)

**Backend:**
- Node.js & Express 5
- MySQL2 (Base de datos relacional)
- JWT (JSON Web Tokens) & Bcrypt (Seguridad y Autenticación)
- CORS & Dotenv

---

## 🏗️ Estructura del Proyecto

```
gestion-proyectos/
├── backend/                 # API REST (Node/Express)
│   ├── config/              # Configuración de variables y servidor
│   ├── controllers/         # Lógica de negocio (manejadores de rutas y errores)
│   ├── database/            # Conexión a MySQL
│   ├── middleware/          # Protección de rutas (JWT)
│   ├── models/              # Lógica de datos
│   ├── routes/              # Definición de Endpoints
│   └── index.js             # Punto de entrada del servidor
├── frontend/                # Cliente (React/Vite)
│   ├── src/
│   │   ├── components/      # Componentes UI reutilizables
│   │   ├── pages/           # Vistas principales (Login, Dashboard, etc.)
│   │   ├── services/        # Configuración de Axios
│   │   └── main.jsx         # Punto de entrada
│   └── index.html
├── database/                # Scripts SQL
│   ├── schema.sql           # Estructura de tablas
│   └── seeds.sql            # Datos de prueba
└── README.md
```

---

## 🚀 Configuración e Instalación

### 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd gestion-proyectos
```

### 2. Confirgurar la bd
Entra a la carpeta `database`, allí encontraras el script sql que deberas ejecutar en mysql, (recomendado en mysql workbench). Y encontraras otro archivo para sembrar los datos de prueba, ejecutalo también.

### 3. Configurar el Backend

Entra en la carpeta `backend`, instala las dependencias y configura las variables de entorno:

```bash
cd backend
npm install
```

Crea un archivo `.env` en la raíz de la carpeta `backend` con lo siguiente:

```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_contraseña
DB_NAME=gestion_proyectos
JWT_SECRET=tu_clave_secreta
```

Inicia el servidor en modo desarrollo:

```bash
npm run dev
```

### 4. Configurar el Frontend

Entra en la carpeta `frontend` e instala las dependencias:

```bash
cd ../frontend
npm install
```

Inicia la aplicación:

```bash
npm run dev
```

---

## 📡 Endpoints Principales de la API

| Método | Endpoint              | Descripción                  |
|--------|-----------------------|------------------------------|
| POST   | /api/auth/login       | Autenticación de usuario     |
| GET    | /api/proyectos        | Listar todos los proyectos   |
| POST   | /api/clientes         | Registrar nuevo cliente      |
| GET    | /api/colaboradores    | Obtener lista de colaboradores |
| POST   | /api/pagos            | Registrar un nuevo pago      |

---

## 🔐 Seguridad y Roles

- **Autenticación:** Implementada con JWT almacenado en el cliente.
- **Encriptación:** Las contraseñas se almacenan cifradas con bcrypt.
- **Roles:** El sistema diferencia entre `admin` (gestión completa) y `usuario` (solo lectura/consultas).

---

