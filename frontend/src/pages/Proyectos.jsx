import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import Swal from 'sweetalert2';
import { getProyectos, createProyecto, updateProyecto, deleteProyecto } from '../services/proyectosService';
import { getClientes } from '../services/clientesService';

function Proyectos() {
  const [proyectos, setProyectos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [rol, setRol] = useState('');
  const [modal, setModal] = useState(false);
  const [editando, setEditando] = useState(null);
  const [form, setForm] = useState({
    descripcion: '', cuantia: '', fecha_inicio: '', fecha_fin: '', id_cliente: ''
  });

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) setRol(jwtDecode(token).rol);
  }, []);

  const fetchProyectos = async () => {
    try {
      const data = await getProyectos();
      setProyectos(data.data);
    } catch (error) { console.error(error); }
  };

  const fetchClientes = async () => {
    try {
      const data = await getClientes();
      setClientes(data.data);
    } catch (error) { console.error(error); }
  };

  useEffect(() => {
    fetchProyectos();
    fetchClientes();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const abrirModalCrear = () => {
    setEditando(null);
    setForm({ descripcion: '', cuantia: '', fecha_inicio: '', fecha_fin: '', id_cliente: '' });
    setModal(true);
  };

  const abrirModalEditar = (p) => {
    setEditando(p.codigo_proyecto);
    setForm({
      descripcion: p.descripcion,
      cuantia: p.cuantia,
      fecha_inicio: p.fecha_inicio?.slice(0, 10),
      fecha_fin: p.fecha_fin?.slice(0, 10),
      id_cliente: p.id_cliente
    });
    setModal(true);
  };

  const handleGuardar = async () => {
    if (!form.descripcion || !form.cuantia || !form.fecha_inicio || !form.fecha_fin || !form.id_cliente) {
      Swal.fire('Campos incompletos', 'Completa todos los campos', 'warning');
      return;
    }
    try {
      if (editando) {
        await updateProyecto(editando, form);
        Swal.fire('Actualizado', 'Proyecto actualizado correctamente', 'success');
      } else {
        await createProyecto(form);
        Swal.fire('Creado', 'Proyecto creado correctamente', 'success');
      }
      setModal(false);
      fetchProyectos();
    } catch (error) {
      Swal.fire('Error', error.response?.data?.message || 'Error al guardar', 'error');
    }
  };

  const handleEliminar = async (id) => {
    const result = await Swal.fire({
      title: '¿Eliminar proyecto?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });
    if (result.isConfirmed) {
      try {
        await deleteProyecto(id);
        Swal.fire('Eliminado', 'Proyecto eliminado correctamente', 'success');
        fetchProyectos();
      } catch (error) {
        Swal.fire('Error', error.response?.data?.message || 'Error al eliminar', 'error');
      }
    }
  };

  const fmt = (n) => new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(n);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">📁 Proyectos</h2>
        {rol === 'admin' && (
          <button onClick={abrirModalCrear} className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition">
            + Nuevo proyecto
          </button>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Código</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Descripción</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Cliente</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Cuantía</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Inicio</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Fin</th>
              {rol === 'admin' && (
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Acciones</th>
              )}
            </tr>
          </thead>
          <tbody>
            {proyectos.length === 0 ? (
              <tr><td colSpan="7" className="text-center py-10 text-gray-400">No hay proyectos registrados</td></tr>
            ) : (
              proyectos.map((p) => (
                <tr key={p.codigo_proyecto} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono text-blue-600">{p.codigo_proyecto}</td>
                  <td className="px-4 py-3 text-gray-800 max-w-xs truncate">{p.descripcion}</td>
                  <td className="px-4 py-3 text-gray-600">{p.cliente_nombre}</td>
                  <td className="px-4 py-3 font-medium text-emerald-700">{fmt(p.cuantia)}</td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{p.fecha_inicio?.slice(0, 10)}</td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{p.fecha_fin?.slice(0, 10)}</td>
                  {rol === 'admin' && (
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button onClick={() => abrirModalEditar(p)} className="text-xs bg-gray-100 hover:bg-blue-100 hover:text-blue-700 px-3 py-1.5 rounded-md font-medium transition">✏️ Editar</button>
                        <button onClick={() => handleEliminar(p.codigo_proyecto)} className="text-xs bg-gray-100 hover:bg-red-100 hover:text-red-700 px-3 py-1.5 rounded-md font-medium transition">🗑️ Eliminar</button>
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
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">{editando ? 'Editar proyecto' : 'Nuevo proyecto'}</h3>
              <button onClick={() => setModal(false)} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                <textarea name="descripcion" value={form.descripcion} onChange={handleChange} rows={3}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cuantía (COP)</label>
                <input type="number" name="cuantia" value={form.cuantia} onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fecha inicio</label>
                  <input type="date" name="fecha_inicio" value={form.fecha_inicio} onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fecha fin</label>
                  <input type="date" name="fecha_fin" value={form.fecha_fin} onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cliente</label>
                <select name="id_cliente" value={form.id_cliente} onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white">
                  <option value="">Selecciona un cliente...</option>
                  {clientes.map(c => (
                    <option key={c.codigo_cliente} value={c.codigo_cliente}>{c.razon_social}</option>
                  ))}
                </select>
              </div>
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

export default Proyectos;