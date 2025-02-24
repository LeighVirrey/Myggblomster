import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function NavBar() {
    const navigate = useNavigate();
    const userId = Cookies.get('userId');

    const handleLogout = () => {
        Cookies.remove('userId');
        Cookies.remove('isAdmin');
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarColor01" 
                    aria-controls="navbarColor01" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarColor01">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        
                    </ul>

                    <form className="d-flex">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-info" type="submit">Search</button>
                    </form>

                    <div className="d-flex ms-3">
                        {!userId ? (
                            <>
                                <Link className="btn btn-outline-info mx-1" to="/login">Login</Link>
                                <Link className="btn btn-outline-info mx-1" to="/register">Register</Link>
                            </>
                        ) : (
                            <button className="btn btn-danger mx-1" onClick={handleLogout}>Logout</button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
