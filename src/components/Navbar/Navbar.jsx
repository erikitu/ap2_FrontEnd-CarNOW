import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Verifica o estado de login no localStorage ao montar o componente
        const isUserLoggedIn = localStorage.getItem('isLoggedIn');
        const user = localStorage.getItem('user');

        if (isUserLoggedIn === 'true' && user) {
            setIsLoggedIn(true);
            const parsedUser = JSON.parse(user);
            if (parsedUser && parsedUser.nome) {
                setUserName(parsedUser.nome);
            }
        }

        // Atualiza o estado quando o evento "Login" é disparado
        const handleLoginEvent = () => {
            setIsLoggedIn(true);
            const loggedInUser = JSON.parse(localStorage.getItem('user'));
            if (loggedInUser && loggedInUser.nome) {
                setUserName(loggedInUser.nome);
            }
        };

        window.addEventListener('Login', handleLoginEvent);

        return () => {
            // Limpa o listener ao desmontar o componente
            window.removeEventListener('Login', handleLoginEvent);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        setUserName('');
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
