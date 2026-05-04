import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function Layout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: '¿Cerrar sesión?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, salir',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3b82f6',
      cancelButtonColor: '#6b7280',
    });

    if (result.isConfirmed) {
      localStorage.removeItem('token');
      navigate('/login');
    }
  };

  return (
    <div className="flex h-screen">

      {/* SIDEBAR */}
      <aside className="w-56 bg-gray-900 text-white flex flex-col">

        <div className="px-6 py-5 border-b border-gray-700">
          <h1 className="text-lg font-bold">Gestión</h1>
        </div>

        <nav className="flex-1 px-3 py-4 flex flex-col gap-1">

            <NavLink
            to="/dashboard"
            className={({ isActive }) =>
                `px-3 py-2 rounded-lg text-sm transition ${
                isActive ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-800'
                }`
            }
            >
            📊 Dashboard
            </NavLink>

          <NavLink
            to="/clientes"
            className={({ isActive }) =>
              `px-3 py-2 rounded-lg text-sm transition ${
                isActive ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-800'
              }`
            }
          >
            🏢 Clientes
          </NavLink>

          <NavLink
            to="/colaboradores"
            className={({ isActive }) =>
              `px-3 py-2 rounded-lg text-sm transition ${
                isActive ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-800'
              }`
            }
          >
            👥 Colaboradores
          </NavLink>

          <NavLink
            to="/proyectos"
            className={({ isActive }) =>
              `px-3 py-2 rounded-lg text-sm transition ${
                isActive ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-800'
              }`
            }
          >
            📁 Proyectos
          </NavLink>

          <NavLink
            to="/pagos"
            className={({ isActive }) =>
              `px-3 py-2 rounded-lg text-sm transition ${
                isActive ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-800'
              }`
            }
          >
            💰 Pagos
          </NavLink>
          <NavLink
            to="/tipos-pago"
            className={({ isActive }) =>
                `px-3 py-2 rounded-lg text-sm transition ${
                isActive ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-800'
                }`
            }
            >
            🏷️ Tipos de Pago
            </NavLink>
        </nav>

        <div className="px-3 py-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full text-left px-3 py-2 text-sm text-gray-400 hover:text-red-400 hover:bg-gray-800 rounded-lg transition"
          >
            🚪 Cerrar sesión
          </button>
        </div>

      </aside>

      {/* CONTENIDO */}
      <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
        <Outlet />
      </main>

    </div>
  );
}

export default Layout;