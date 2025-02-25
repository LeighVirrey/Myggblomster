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
            <div className="container-fluid d-flex align-items-center">
                {/* Left Section - Home Link */}
                <div className='left-nav'>
                    <Link className="navbar-brand" to="/">Home</Link>
                </div>

                {/* Center Section - Title */}
                <div className="flex-grow-1 text-center">
                    <h1 className="navbar-title m-0">MYGGBLOMSTER</h1>
                </div>

                {/* Right Section - Login/Register/Logout Buttons */}
                <div className='right-nav'>
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
        </nav>
    );
}

export default NavBar;
