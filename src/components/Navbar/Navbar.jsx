import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        window.addEventListener('Login', () => {
            setIsLoggedIn(true)
            const user = JSON.parse(localStorage.getItem('user'));
            console.log(user)
            if (user && user.nome) {
            setUserName(user.nome);
        }
    })


    }, []);

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <img src="/DriveNOW.png" alt="logo" />
            </div>
            <ul className="navbar-menu">
                <li><Link to="/">Início</Link></li>
                <li><Link to="/carros">Carros</Link></li>
                {isLoggedIn && (
                    <>
                        <li><Link to="/aluguel">Novo Empréstimo</Link></li>
                        <li><Link to="/meus-alugueis">Meus Empréstimos</Link></li>
                        <li><span className="navbar-username">Bem-vindo, {userName}</span></li>
        
                    </>
                )}
                {!isLoggedIn ? (
                    <li><Link to="/login">Login</Link></li>
                ) : (
                    <li>
                        <button onClick={handleLogout} className="logout-button">Logout</button>
                    </li>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;
