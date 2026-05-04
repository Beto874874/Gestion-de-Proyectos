# 📁 Sistema de Gestión de Proyectos — Ejercicio 15
# JUAN ALBERTO TRUJILLO HERRERA - MARTÍN CAMILO CORREDOR PESCADOR

**Universidad Libre Seccional Pereira · Facultad de Ingeniería**
**Programación II — Cliente/Servidor · Semestre 2026-1**

Stack: React + Vite + TailwindCSS · Node.js + Express · MySQL · JWT + bcrypt

---

## 🏗️ Arquitectura
| Frontend (React/Vite) | Backend (Node/Express) | Base de Datos (MySQL) |
| :--- | :--- | :--- |
| `http://localhost:5173` | `http://localhost:5000` | `localhost:3306` |
---


## 🔐 Credenciales de prueba

| Usuario    | Contraseña| Rol     |
|---------   |-----------|---------|
| admin      | admin123  | admin   |
| betolio    | 123456    | usuario |

---

## 📡 Endpoints de la API

| Método | URL                      | Descripción               | Rol mínimo |
|--------|--------------------------|---------------------------|------------|
| POST   | /api/auth/login          | Iniciar sesión            | —          |
| POST   | /api/auth/register       | Crear usuario             | —          |
| GET    | /api/dashboard           | Estadísticas generales    | usuario    |
| GET    | /api/clientes            | Listar clientes           | usuario    |
| POST   | /api/clientes            | Crear cliente             | admin      |
| PUT    | /api/clientes/:id        | Actualizar cliente        | admin      |
| DELETE | /api/clientes/:id        | Eliminar cliente          | admin      |
| GET    | /api/colaboradores       | Listar colaboradores      | usuario    |
| POST   | /api/colaboradores       | Crear colaborador         | admin      |
| PUT    | /api/colaboradores/:id   | Actualizar colaborador    | admin      |
| DELETE | /api/colaboradores/:id   | Eliminar colaborador      | admin      |
| GET    | /api/proyectos           | Listar proyectos          | usuario    |
| POST   | /api/proyectos           | Crear proyecto            | admin      |
| PUT    | /api/proyectos/:id       | Actualizar proyecto       | admin      |
| DELETE | /api/proyectos/:id       | Eliminar proyecto         | admin      |
| GET    | /api/pagos               | Listar pagos              | usuario    |
| POST   | /api/pagos               | Crear pago                | admin      |
| PUT    | /api/pagos/:id           | Actualizar pago           | admin      |
| DELETE | /api/pagos/:id           | Eliminar pago             | admin      |
| GET    | /api/tipos-pago          | Listar tipos de pago      | usuario    |
| POST   | /api/tipos-pago          | Crear tipo de pago        | admin      |
| PUT    | /api/tipos-pago/:id      | Actualizar tipo de pago   | admin      |
| DELETE | /api/tipos-pago/:id      | Eliminar tipo de pago     | admin      |

---

## 📂 Estructura del proyecto

```text
gestion-proyectos/
├── frontend/
│   └── src/
│       ├── components/      # Layout y componentes reutilizables
│       ├── context/         # Estado global de la aplicación
│       ├── hooks/           # Custom hooks
│       ├── pages/           # Vistas (Auth, Dashboard, Clientes, etc.)
│       └── services/        # Consumo de APIs (Axios/Fetch)
├── backend/
│   ├── controllers/         # Lógica de las rutas
│   ├── routes/              # Definición de endpoints
│   ├── middleware/          # Validaciones y seguridad
│   ├── models/              # Definición de esquemas o modelos
│   └── config/              # Configuración de DB y variables
├── database/
│   ├── schema.sql           # Estructura de tablas
│   └── seeds.sql            # Datos de prueba iniciales
└── README.md
