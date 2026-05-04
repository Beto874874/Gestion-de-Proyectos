import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import Swal from 'sweetalert2';
import { getClientes } from '../services/clientesService';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/clientes';

function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [rol, setRol] = useState('');
  const [modal, setModal] = useState(false);
  const [editando, setEditando] = useState(null);
  const [form, setForm] = useState({
    razon_social: '',
    domicilio: '',
    telefono: ''
  });

  const token = localStorage.getItem('token');

  // Leer rol del token
  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      setRol(decoded.rol);
    }
  }, []);

  // Cargar clientes
  const fetchClientes = async () => {
    try {
      const data = await getClientes();
      setClientes(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Abrir modal para crear
  const abrirModalCrear = () => {
    setEditando(null);
    setForm({ razon_social: '', domicilio: '', telefono: '' });
    setModal(true);
  };

  // Abrir modal para editar
  const abrirModalEditar = (cliente) => {
    setEditando(cliente.codigo_cliente);
    setForm({
      razon_social: cliente.razon_social,
      domicilio: cliente.domicilio,
      telefono: cliente.telefono
    });
    setModal(true);
  };

  // Guardar (crear o editar)
  const handleGuardar = async () => {
    if (!form.razon_social || !form.domicilio || !form.telefono) {
      Swal.fire('Campos incompletos', 'Completa todos los campos', 'warning');
      return;
    }

    try {
      if (editando) {
        await axios.put(`${API_URL}/${editando}`, form, {
          headers: { Authorization: `Bearer ${token}` }
        });
        Swal.fire('Actualizado', 'Cliente actualizado correctamente', 'success');
      } else {
        await axios.post(API_URL, form, {
          headers: { Authorization: `Bearer ${token}` }
        });
        Swal.fire('Creado', 'Cliente creado correctamente', 'success');
      }

      setModal(false);
      fetchClientes();

    } catch (error) {
      Swal.fire('Error', error.response?.data?.message || 'Error al guardar', 'error');
    }
  };

  // Eliminar
  const handleEliminar = async (id, nombre) => {
    const result = await Swal.fire({
      title: '¿Eliminar cliente?',
      text: `¿Seguro que deseas eliminar a ${nombre}?`,
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
        Swal.fire('Eliminado', 'Cliente eliminado correctamente', 'success');
        fetchClientes();
      } catch (error) {
        Swal.fire('Error', error.response?.data?.message || 'Error al eliminar', 'error');
      }
    }
  };

  return (
    <div>
      {/* ENCABEZADO */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">🏢 Clientes</h2>
        {rol === 'admin' && (
          <button
            onClick={abrirModalCrear}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition"
          >
            + Nuevo cliente
          </button>
        )}
      </div>

      {/* TABLA */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Código</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Razón Social</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Domicilio</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Teléfono</th>
              {rol === 'admin' && (
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Acciones</th>
              )}
            </tr>
          </thead>
          <tbody>
            {clientes.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-10 text-gray-400">
                  No hay clientes registrados
                </td>
              </tr>
            ) : (
              clientes.map((c) => (
                <tr key={c.codigo_cliente} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="px-4 py-3 text-blue-600 font-mono">{c.codigo_cliente}</td>
                  <td className="px-4 py-3 font-medium text-gray-800">{c.razon_social}</td>
                  <td className="px-4 py-3 text-gray-600">{c.domicilio}</td>
                  <td className="px-4 py-3 text-gray-600">{c.telefono}</td>
                  {rol === 'admin' && (
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => abrirModalEditar(c)}
                          className="text-xs bg-gray-100 hover:bg-blue-100 hover:text-blue-700 px-3 py-1.5 rounded-md font-medium transition"
                        >
                          ✏️ Editar
                        </button>
                        <button
                          onClick={() => handleEliminar(c.codigo_cliente, c.razon_social)}
                          className="text-xs bg-gray-100 hover:bg-red-100 hover:text-red-700 px-3 py-1.5 rounded-md font-medium transition"
                        >
                          🗑️ Eliminar
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {modal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">

            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {editando ? 'Editar cliente' : 'Nuevo cliente'}
              </h3>
              <button
                onClick={() => setModal(false)}
                className="text-gray-400 hover:text-gray-600 text-xl"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Razón Social</label>
                <input
                  type="text"
                  name="razon_social"
                  value={form.razon_social}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Domicilio</label>
                <input
                  type="text"
                  name="domicilio"
                  value={form.domicilio}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                <input
                  type="text"
                  name="telefono"
                  value={form.telefono}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-5">
              <button
                onClick={() => setModal(false)}
                className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                Cancelar
              </button>
              <button
                onClick={handleGuardar}
                className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg"
              >
                Guardar
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

export default Clientes;
