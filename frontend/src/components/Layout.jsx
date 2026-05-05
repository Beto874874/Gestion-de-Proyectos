import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import Swal from 'sweetalert2';
import {
  LayoutDashboard,
  Building2,
  Users,
  FolderKanban,
  Wallet,
  Tag,
  LogOut
} from 'lucide-react';

function Layout() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const decoded = token ? jwtDecode(token) : {};
  const rol = decoded.rol || '';
  const usuario = decoded.usuario || '';

  const rolColor = {
    admin:   'bg-amber-400 text-amber-900',
    usuario: 'bg-blue-400 text-blue-900',
  };

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
          <p className="text-xs text-gray-400">Proyectos</p>
        </div>

        <nav className="flex-1 px-3 py-4 flex flex-col gap-1">

          {/* rutas visibles para todos */}
          {[
            { to: '/dashboard',     label: 'Dashboard',     icon: <LayoutDashboard size={16} /> },
            { to: '/clientes',      label: 'Clientes',      icon: <Building2 size={16} /> },
            { to: '/colaboradores', label: 'Colaboradores', icon: <Users size={16} /> },
            { to: '/proyectos',     label: 'Proyectos',     icon: <FolderKanban size={16} /> },
          ].map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg text-sm transition flex items-center gap-2 ${
                  isActive ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-800'
                }`
              }
            >
              {icon}{label}
            </NavLink>
          ))}

          {/* rutas solo admin */}
          {rol === 'admin' && (
            <>
              <NavLink
                to="/pagos"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-sm transition flex items-center gap-2 ${
                    isActive ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-800'
                  }`
                }
              >
                <Wallet size={16} />Pagos
              </NavLink>

              <NavLink
                to="/tipos-pago"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-sm transition flex items-center gap-2 ${
                    isActive ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-800'
                  }`
                }
              >
                <Tag size={16} />Tipos de Pago
              </NavLink>
            </>
          )}

        </nav>

        {/* USUARIO */}
        <div className="px-4 py-4 border-t border-gray-700">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-sm font-bold">
              {usuario?.[0]?.toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-white truncate">{usuario}</p>
              <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${rolColor[rol] || 'bg-gray-600 text-white'}`}>
                {rol}
              </span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full text-left px-3 py-2 text-sm text-gray-400 hover:text-red-400 hover:bg-gray-800 rounded-lg transition flex items-center gap-2"
          >
            <LogOut size={16} />Cerrar sesión
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