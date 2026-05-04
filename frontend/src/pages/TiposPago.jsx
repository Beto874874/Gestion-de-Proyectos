import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import Swal from 'sweetalert2';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/tipos-pago';

function TiposPago() {
  const [tipos, setTipos] = useState([]);
  const [rol, setRol] = useState('');
  const [modal, setModal] = useState(false);
  const [editando, setEditando] = useState(null);
  const [form, setForm] = useState({ descripcion: '' });

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) setRol(jwtDecode(token).rol);
  }, []);

  const fetchTipos = async () => {
    try {
      const res = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTipos(res.data.data);
    } catch (error) { console.error(error); }
  };

  useEffect(() => { fetchTipos(); }, []);

  const handleChange = (e) => setForm({ descripcion: e.target.value });

  const abrirModalCrear = () => {
    setEditando(null);
    setForm({ descripcion: '' });
    setModal(true);
  };

  const abrirModalEditar = (t) => {
    setEditando(t.codigo_tipo);
    setForm({ descripcion: t.descripcion });
    setModal(true);
  };

  const handleGuardar = async () => {
    if (!form.descripcion) {
      Swal.fire('Campo vacío', 'Escribe una descripción', 'warning');
      return;
    }
    try {
      if (editando) {
        await axios.put(`${API_URL}/${editando}`, form, {
          headers: { Authorization: `Bearer ${token}` }
        });
        Swal.fire('Actualizado', 'Tipo de pago actualizado', 'success');
      } else {
        await axios.post(API_URL, form, {
          headers: { Authorization: `Bearer ${token}` }
        });
        Swal.fire('Creado', 'Tipo de pago creado', 'success');
      }
      setModal(false);
      fetchTipos();
    } catch (error) {
      Swal.fire('Error', error.response?.data?.message || 'Error al guardar', 'error');
    }
  };

  const handleEliminar = async (id, descripcion) => {
    const result = await Swal.fire({
      title: '¿Eliminar tipo de pago?',
      text: `¿Seguro que deseas eliminar "${descripcion}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });
    if (result.isConfirmed) {
      try {
        await axios.delete(`${API_URL}/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        Swal.fire('Eliminado', 'Tipo de pago eliminado', 'success');
        fetchTipos();
      } catch (error) {
        Swal.fire('Error', error.response?.data?.message || 'Error al eliminar', 'error');
      }
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">🏷️ Tipos de Pago</h2>
        {rol === 'admin' && (
          <button onClick={abrirModalCrear} className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition">
            + Nuevo tipo
          </button>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden max-w-lg">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Código</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Descripción</th>
              {rol === 'admin' && (
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Acciones</th>
              )}
            </tr>
          </thead>
          <tbody>
            {tipos.length === 0 ? (
              <tr><td colSpan="3" className="text-center py-10 text-gray-400">No hay tipos de pago registrados</td></tr>
            ) : (
              tipos.map((t) => (
                <tr key={t.codigo_tipo} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono text-blue-600">{t.codigo_tipo}</td>
                  <td className="px-4 py-3 text-gray-800">{t.descripcion}</td>
                  {rol === 'admin' && (
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button onClick={() => abrirModalEditar(t)} className="text-xs bg-gray-100 hover:bg-blue-100 hover:text-blue-700 px-3 py-1.5 rounded-md font-medium transition">✏️ Editar</button>
                        <button onClick={() => handleEliminar(t.codigo_tipo, t.descripcion)} className="text-xs bg-gray-100 hover:bg-red-100 hover:text-red-700 px-3 py-1.5 rounded-md font-medium transition">🗑️ Eliminar</button>
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {modal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">{editando ? 'Editar tipo' : 'Nuevo tipo de pago'}</h3>
              <button onClick={() => setModal(false)} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
              <input type="text" value={form.descripcion} onChange={handleChange}
                placeholder="Ej: Honorarios, Anticipo..."
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div className="flex justify-end gap-3 mt-5">
              <button onClick={() => setModal(false)} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">Cancelar</button>
              <button onClick={handleGuardar} className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg">Guardar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TiposPago;