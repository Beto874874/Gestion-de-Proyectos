import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/dashboard';

const StatCard = ({ icon, label, value, color }) => (
  <div className={`bg-white rounded-2xl p-5 shadow-sm border-l-4 ${color}`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500 font-medium">{label}</p>
        <p className="text-3xl font-bold text-gray-800 mt-1">{value ?? '...'}</p>
      </div>
      <span className="text-4xl">{icon}</span>
    </div>
  </div>
);

export default function Dashboard() {
  const [stats, setStats]   = useState(null);
  const [usuario, setUsuario] = useState('');
  const [rol, setRol]       = useState('');
  const [nombre, setNombre] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      setUsuario(decoded.usuario || decoded.id);
      setRol(decoded.rol);
    }
    axios.get(API_URL, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(r => setStats(r.data.data)).catch(console.error);
  }, []);

  const fmt = (n) => new Intl.NumberFormat('es-CO', {
    style: 'currency', currency: 'COP', maximumFractionDigits: 0
  }).format(n);

  const rolColor = {
    admin:   'bg-amber-100 text-amber-800',
    usuario: 'bg-blue-100 text-blue-800',
  };

  return (
    <div className="max-w-5xl mx-auto">

      {/* ENCABEZADO */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Bienvenido, {usuario} 👋
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Resumen general del sistema
          </p>
        </div>
        <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${rolColor[rol] || 'bg-gray-100 text-gray-600'}`}>
          {rol}
        </span>
      </div>

      {/* TARJETAS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon="🏢" label="Clientes"       value={stats?.total_clientes}       color="border-blue-500" />
        <StatCard icon="👥" label="Colaboradores"  value={stats?.total_colaboradores}  color="border-violet-500" />
        <StatCard icon="📁" label="Proyectos"      value={stats?.total_proyectos}      color="border-emerald-500" />
        <StatCard icon="💰" label="Total pagado"   value={stats ? fmt(stats.total_pagos) : '...'} color="border-amber-500" />
      </div>

      {/* ÚLTIMOS PROYECTOS */}
      <div className="bg-white rounded-2xl shadow-sm p-5">
        <h3 className="font-semibold text-gray-700 mb-4">
          Últimos proyectos registrados
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-gray-500">
                <th className="text-left py-2 font-medium">Descripción</th>
                <th className="text-left py-2 font-medium">Cliente</th>
                <th className="text-left py-2 font-medium">Cuantía</th>
                <th className="text-left py-2 font-medium">Fecha fin</th>
              </tr>
            </thead>
            <tbody>
              {stats?.ultimos_proyectos?.map((p, i) => (
                <tr key={i} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="py-2.5 text-gray-700 max-w-xs truncate">{p.descripcion}</td>
                  <td className="py-2.5 text-gray-600">{p.razon_social}</td>
                  <td className="py-2.5 font-medium text-emerald-700">{fmt(p.cuantia)}</td>
                  <td className="py-2.5 text-gray-400 text-xs">{p.fecha_fin?.slice(0, 10)}</td>
                </tr>
              ))}
              {!stats?.ultimos_proyectos?.length && (
                <tr>
                  <td colSpan="4" className="py-8 text-center text-gray-400">
                    Sin proyectos aún
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}