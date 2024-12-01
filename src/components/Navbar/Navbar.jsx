import { Link } from 'react-router-dom';
import './Navbar.css';


function Navbar() {
  return (
    
    <nav className="navbar">
      <div className="navbar-logo"><img src="/DriveNOW.png" alt="logo" /></div>
      <ul className="navbar-menu">
        <li><Link to="/">Início</Link></li>
        <li><Link to="/carros">Carros</Link></li>
        <li><Link to="/aluguel">Novo Empréstimo</Link></li>
        <li><Link to="/meus-alugueis">Meus Empréstimos</Link></li>
      </ul>
      
    </nav>
  );
}

export default Navbar;