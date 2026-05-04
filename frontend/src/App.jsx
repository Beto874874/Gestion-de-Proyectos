import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Clientes from './pages/Clientes';
import Colaboradores from './pages/Colaboradores';
import Proyectos from './pages/Proyectos';
import Pagos from './pages/Pagos';
import TiposPago from './pages/TiposPago';
import Layout from './components/Layout';

function PrivateRoute({ children, adminOnly = false }) {
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to="/login" />;

  if (adminOnly) {
    const decoded = jwtDecode(token);
    if (decoded.rol !== 'admin') return <Navigate to="/dashboard" />;
  }

  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Auth />} />

        <Route path="/" element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }>
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard"     element={<Dashboard />} />
          <Route path="clientes"      element={<Clientes />} />
          <Route path="colaboradores" element={<Colaboradores />} />
          <Route path="proyectos"     element={<Proyectos />} />
          <Route path="pagos"         element={
            <PrivateRoute adminOnly>
              <Pagos />
            </PrivateRoute>
          } />
          <Route path="tipos-pago"    element={
            <PrivateRoute adminOnly>
              <TiposPago />
            </PrivateRoute>
          } />
        </Route>

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;