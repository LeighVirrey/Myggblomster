import React, { useState } from 'react';
import NavBar from '../navbar/navbar';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validate = () => {
        let errors = {};
        if (!formData.email) errors.email = 'Email is required';
        if (!formData.password) errors.password = 'Password is required';
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        
        try {
            const response = await fetch("http://localhost:9000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Credentials": "true"
                },
                body: JSON.stringify(formData),
                credentials: 'include'
            });
            
            const data = await response.json();
            
            if (data.alreadyExisted === false) {
                navigate('/register');
            }else if (data.message == "Login failed") {
                setMessage("Login failed")
            }else {
                console.log("DATA: ", data)
                Cookies.set('userId', data.user.id, { path: '/' })
                Cookies.set('isAdmin', data.user.isAdmin, { path: '/' })
                navigate('/userprofile/' + data.user.id)
        }
    } catch (error) {
        console.error("Error:", error);
    }
    };

    return (
        <div>
            <NavBar />
            <div className="container d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                <div className="card shadow-lg p-4" style={{ width: "400px" }}>
                    <h3 className="card-header text-center text-primary">Login</h3>
                    <div className="card-body">
                        {message && <div className="alert alert-danger">{message}</div>}
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input
                                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input
                                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                            </div>
                            <button type="submit" className="btn btn-primary w-100">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
