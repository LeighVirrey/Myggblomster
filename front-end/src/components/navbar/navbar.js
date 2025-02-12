import React from 'react'
import { Link } from 'react-router-dom';

function NavBar() {
    return (
        <div>
        <Link className="nav-link" to="/register">Register</Link>
        <br></br>
        <Link className="nav-link" to="/login">Login</Link>
        </div>
    )
}

export default NavBar