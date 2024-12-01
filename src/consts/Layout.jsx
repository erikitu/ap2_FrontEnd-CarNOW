import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';

function Layout() {
  return (
    <div>
      <Navbar />
      <Outlet /> {/* Renderiza o conteúdo específico da rota */}
    </div>
  );
}

export default Layout
