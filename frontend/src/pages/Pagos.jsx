import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import Swal from 'sweetalert2';
import { getPagos, createPago, updatePago, deletePago } from '../services/pagosService';
import { getColaboradores } from '../services/colaboradoresService';
import axios from 'axios';

const TIPOS_URL = 'http://localhost:5000/api/tipos-pago';

function Pagos() {
  const [pagos, setPagos] = useState([]);
  const [colaboradores, setColaboradores] = useState([]);
  const [tiposPago, setTiposPago] = useState([]);
  const [rol, setRol] = useState('');
  const [modal, setModal] = useState(false);
  const [editando, setEditando] = useState(null);
  const [form, setForm] = useState({
    concepto: '', cantidad: '', fecha_pago: '', nif_colaborador: '', id_tipo_pago: ''
  });

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) setRol(jwtDecode(token).rol);
  }, []);

  const fetchPagos = async () => {
    try {
      const data = await getPagos();
      setPagos(data.data);
    } catch (error) { console.error(error); }
  };

  const fetchColaboradores = async () => {
    try {
      const data = await getColaboradores();
      setColaboradores(data.data);
    } catch (error) { console.error(error); }
  };

  const fetchTiposPago = async () => {
    try {
      const res = await axios.get(TIPOS_URL, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTiposPago(res.data.data);
    } catch (error) { console.error(error); }
  };

  useEffect(() => {
    fetchPagos();
    fetchColaboradores();
    fetchTiposPago();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const abrirModalCrear = () => {
    setEditando(null);
    setForm({ concepto: '', cantidad: '', fecha_pago: '', nif_colaborador: '', id_tipo_pago: '' });
    setModal(true);
  };

  const abrirModalEditar = (p) => {
    setEditando(p.numero_pago);
    setForm({
      concepto: p.concepto,
      cantidad: p.cantidad,
      fecha_pago: p.fecha_pago?.slice(0, 10),
      nif_colaborador: p.nif_colaborador,
      id_tipo_pago: p.id_tipo_pago
    });
    setModal(true);
  };

  const handleGuardar = async () => {
    if (!form.concepto || !form.cantidad || !form.fecha_pago || !form.nif_colaborador || !form.id_tipo_pago) {
      Swal.fire('Campos incompletos', 'Completa todos los campos', 'warning');
      return;
    }
    try {
      if (editando) {
        await updatePago(editando, form);
        Swal.fire('Actualizado', 'Pago actualizado correctamente', 'success');
      } else {
        await createPago(form);
        Swal.fire('Creado', 'Pago registrado correctamente', 'success');
      }
      setModal(false);
      fetchPagos();
    } catch (error) {
      Swal.fire('Error', error.response?.data?.message || 'Error al guardar', 'error');
    }
  };

  const handleEliminar = async (id) => {
    const result = await Swal.fire({
      title: '¿Eliminar pago?',
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
        await deletePago(id);
        Swal.fire('Eliminado', 'Pago eliminado correctamente', 'success');
        fetchPagos();
      } catch (error) {
        Swal.fire('Error', error.response?.data?.message || 'Error al eliminar', 'error');
      }
    }
  };

  const fmt = (n) => new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(n);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">💰 Pagos</h2>
        {rol === 'admin' && (
          <button onClick={abrirModalCrear} className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition">
            + Nuevo pago
          </button>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">N° Pago</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Concepto</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Colaborador</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Tipo</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Cantidad</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Fecha</th>
              {rol === 'admin' && (
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Acciones</th>
              )}
            </tr>
          </thead>
          <tbody>
            {pagos.length === 0 ? (
              <tr><td colSpan="7" className="text-center py-10 text-gray-400">No hay pagos registrados</td></tr>
            ) : (
              pagos.map((p) => (
                <tr key={p.numero_pago} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono text-blue-600">{p.numero_pago}</td>
                  <td className="px-4 py-3 text-gray-800">{p.concepto}</td>
                  <td className="px-4 py-3 text-gray-600">{p.colaborador_nombre}</td>
                  <td className="px-4 py-3">
                    <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">{p.tipo_pago_nombre}</span>
                  </td>
                  <td className="px-4 py-3 font-medium text-emerald-700">{fmt(p.cantidad)}</td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{p.fecha_pago?.slice(0, 10)}</td>
                  {rol === 'admin' && (
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button onClick={() => abrirModalEditar(p)} className="text-xs bg-gray-100 hover:bg-blue-100 hover:text-blue-700 px-3 py-1.5 rounded-md font-medium transition">✏️ Editar</button>
                        <button onClick={() => handleEliminar(p.numero_pago)} className="text-xs bg-gray-100 hover:bg-red-100 hover:text-red-700 px-3 py-1.5 rounded-md font-medium transition">🗑️ Eliminar</button>
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
              <h3 className="text-lg font-semibold text-gray-800">{editando ? 'Editar pago' : 'Nuevo pago'}</h3>
              <button onClick={() => setModal(false)} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Concepto</label>
                <input type="text" name="concepto" value={form.concepto} onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cantidad (COP)</label>
                  <input type="number" name="cantidad" value={form.cantidad} onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de pago</label>
                  <input type="date" name="fecha_pago" value={form.fecha_pago} onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Colaborador</label>
                <select name="nif_colaborador" value={form.nif_colaborador} onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white">
                  <option value="">Selecciona un colaborador...</option>
                  {colaboradores.map(c => (
                    <option key={c.nif} value={c.nif}>{c.nombre}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de pago</label>
                <select name="id_tipo_pago" value={form.id_tipo_pago} onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white">
                  <option value="">Selecciona un tipo...</option>
                  {tiposPago.map(t => (
                    <option key={t.codigo_tipo} value={t.codigo_tipo}>{t.descripcion}</option>
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

export default Pagos;