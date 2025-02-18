import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function NavBar() {
    const navigate = useNavigate();
    const userId = Cookies.get('userId');

    const handleLogout = () => {
        Cookies.remove('userId');
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-dark bg-dark p-3 justify-content-end">
            <div className="container-fluid">
                <div className="d-flex ms-auto">
                    <a className="nav-item nav-link text-white mx-2" href="/">Home</a>
                    {!userId ? (
                        <>
                            <a className="nav-item nav-link text-white mx-2" href="/login">Login</a>
                            <a className="nav-item nav-link text-white mx-2" href="/register">Register</a>
                        </>
                    ) : (
                        
                        <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
