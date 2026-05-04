import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, register } from '../services/authService';
import Swal from 'sweetalert2';

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [form, setForm] = useState({ usuario: '', password: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        const data = await login(form);
        localStorage.setItem('token', data.token);
        await Swal.fire({
          icon: 'success',
          title: '¡Bienvenido!',
          timer: 1200,
          showConfirmButton: false
        });
        navigate('/dashboard');
      } else {
        await register({ ...form, rol: 'usuario' });
        await Swal.fire({
          icon: 'success',
          title: 'Registrado correctamente',
          timer: 1200,
          showConfirmButton: false
        });
        setIsLogin(true);
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.msg || 'Revisa los datos ingresados'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">

      {/* FONDO DECORATIVO */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-600 rounded-full opacity-10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-violet-600 rounded-full opacity-10 blur-3xl" />
      </div>

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 rounded-3xl overflow-hidden shadow-2xl relative z-10">

        {/* PANEL IZQUIERDO */}
        <div className="bg-gradient-to-br from-blue-600 to-violet-700 p-10 flex flex-col justify-between text-white">
          <div>
            <div className="text-4xl mb-4">📁</div>
            <h1 className="text-3xl font-bold leading-tight">
              Gestión de<br />Proyectos
            </h1>
            <p className="text-blue-200 mt-3 text-sm leading-relaxed">
              Sistema de administración de proyectos, clientes y colaboradores.
            </p>
          </div>

          <div className="space-y-3 mt-8">
            {['Gestión de clientes y colaboradores', 'Control de proyectos', 'Registro de pagos', 'Control por roles'].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                  <span className="text-xs">✓</span>
                </div>
                <span className="text-sm text-blue-100">{item}</span>
              </div>
            ))}
          </div>

          <p className="text-blue-300 text-xs mt-8">
            Universidad Libre · Programación II · 2026
          </p>
        </div>

        {/* PANEL DERECHO */}
        <div className="bg-white p-10 flex flex-col justify-center">

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800">
              {isLogin ? 'Iniciar sesión' : 'Crear cuenta'}
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              {isLogin ? 'Ingresa tus credenciales para continuar' : 'Completa los datos para registrarte'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Usuario
              </label>
              <input
                type="text"
                name="usuario"
                value={form.usuario}
                onChange={handleChange}
                placeholder="Tu nombre de usuario"
                className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contraseña
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-all duration-200 mt-2"
            >
              {loading ? 'Cargando...' : isLogin ? 'Ingresar' : 'Registrarse'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <span className="text-sm text-gray-500">
              {isLogin ? '¿No tienes cuenta? ' : '¿Ya tienes cuenta? '}
            </span>
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-blue-600 font-medium hover:underline"
            >
              {isLogin ? 'Regístrate' : 'Inicia sesión'}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Auth;