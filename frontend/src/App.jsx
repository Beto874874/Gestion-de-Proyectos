import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Auth from './pages/Auth';
import Clientes from './pages/Clientes';
import Layout from './components/Layout';
import Colaboradores from './pages/Colaboradores';
import Proyectos from './pages/Proyectos';
import Pagos from './pages/Pagos';
import TiposPago from './pages/TiposPago';
import Dashboard from './pages/Dashboard';


function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
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
          <Route path="clientes"      element={<Clientes />} />
          <Route path="colaboradores" element={<Colaboradores />} />
          <Route path="proyectos"     element={<Proyectos />} />
          <Route path="pagos"         element={<Pagos />} />
          <Route index element={<Navigate to="clientes" />} />
          <Route path="tipos-pago" element={<TiposPago />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route index element={<Navigate to="dashboard" />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;