import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import Swal from 'sweetalert2';
import { getColaboradores, createColaborador, updateColaborador, deleteColaborador } from '../services/colaboradoresService';

function Colaboradores() {
  const [colaboradores, setColaboradores] = useState([]);
  const [rol, setRol] = useState('');
  const [modal, setModal] = useState(false);
  const [editando, setEditando] = useState(null);
  const [form, setForm] = useState({
    nif: '', nombre: '', domicilio: '',
    telefono: '', banco: '', numero_cuenta: ''
  });

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) setRol(jwtDecode(token).rol);
  }, []);

  const fetchColaboradores = async () => {
    try {
      const data = await getColaboradores();
      setColaboradores(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => { fetchColaboradores(); }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const abrirModalCrear = () => {
    setEditando(null);
    setForm({ nif: '', nombre: '', domicilio: '', telefono: '', banco: '', numero_cuenta: '' });
    setModal(true);
  };

  const abrirModalEditar = (c) => {
    setEditando(c.nif);
    setForm({
      nif: c.nif, nombre: c.nombre, domicilio: c.domicilio,
      telefono: c.telefono, banco: c.banco, numero_cuenta: c.numero_cuenta
    });
    setModal(true);
  };

  const handleGuardar = async () => {
    if (!form.nif || !form.nombre || !form.domicilio || !form.telefono || !form.banco || !form.numero_cuenta) {
      Swal.fire('Campos incompletos', 'Completa todos los campos', 'warning');
      return;
    }
    try {
      if (editando) {
        await updateColaborador(editando, form);
        Swal.fire('Actualizado', 'Colaborador actualizado correctamente', 'success');
      } else {
        await createColaborador(form);
        Swal.fire('Creado', 'Colaborador creado correctamente', 'success');
      }
      setModal(false);
      fetchColaboradores();
    } catch (error) {
      Swal.fire('Error', error.response?.data?.message || 'Error al guardar', 'error');
    }
  };

  const handleEliminar = async (nif, nombre) => {
    const result = await Swal.fire({
      title: '¿Eliminar colaborador?',
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
        await deleteColaborador(nif);
        Swal.fire('Eliminado', 'Colaborador eliminado correctamente', 'success');
        fetchColaboradores();
      } catch (error) {
        Swal.fire('Error', error.response?.data?.message || 'Error al eliminar', 'error');
      }
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">👥 Colaboradores</h2>
        {rol === 'admin' && (
          <button onClick={abrirModalCrear} className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition">
            + Nuevo colaborador
          </button>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">NIF</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Nombre</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Domicilio</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Teléfono</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Banco</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">N° Cuenta</th>
              {rol === 'admin' && (
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Acciones</th>
              )}
            </tr>
          </thead>
          <tbody>
            {colaboradores.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-10 text-gray-400">No hay colaboradores registrados</td>
              </tr>
            ) : (
              colaboradores.map((c) => (
                <tr key={c.nif} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono text-blue-600">{c.nif}</td>
                  <td className="px-4 py-3 font-medium text-gray-800">{c.nombre}</td>
                  <td className="px-4 py-3 text-gray-600">{c.domicilio}</td>
                  <td className="px-4 py-3 text-gray-600">{c.telefono}</td>
                  <td className="px-4 py-3 text-gray-600">{c.banco}</td>
                  <td className="px-4 py-3 font-mono text-xs text-gray-600">{c.numero_cuenta}</td>
                  {rol === 'admin' && (
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button onClick={() => abrirModalEditar(c)} className="text-xs bg-gray-100 hover:bg-blue-100 hover:text-blue-700 px-3 py-1.5 rounded-md font-medium transition">
                          ✏️ Editar
                        </button>
                        <button onClick={() => handleEliminar(c.nif, c.nombre)} className="text-xs bg-gray-100 hover:bg-red-100 hover:text-red-700 px-3 py-1.5 rounded-md font-medium transition">
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

      {modal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">{editando ? 'Editar colaborador' : 'Nuevo colaborador'}</h3>
              <button onClick={() => setModal(false)} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
            </div>
            <div className="space-y-3">
              {[
                { label: 'NIF', name: 'nif', disabled: !!editando },
                { label: 'Nombre', name: 'nombre' },
                { label: 'Domicilio', name: 'domicilio' },
                { label: 'Teléfono', name: 'telefono' },
                { label: 'Banco', name: 'banco' },
                { label: 'Número de cuenta', name: 'numero_cuenta' },
              ].map(({ label, name, disabled }) => (
                <div key={name}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                  <input
                    type="text"
                    name={name}
                    value={form[name]}
                    onChange={handleChange}
                    disabled={disabled}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none disabled:bg-gray-100"
                  />
                </div>
              ))}
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

export default Colaboradores;