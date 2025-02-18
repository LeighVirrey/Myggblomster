import { useState } from "react";
import NavBar from "../navbar/navbar";
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        try {
            console.log("Request Body:", { email, password, isAdmin: false });
            const body = {
                email: email,
                password: password,
                isAdmin: false
            };
            const response = await fetch("http://localhost:9000/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            const contentType = response.headers.get("content-type");
            const data = contentType && contentType.includes("application/json")
                ? await response.json()
                : await response.text();
            navigate('/userProfile/' + data.userId);
            console.log("Response Data:", data);
        } catch (error) {
            console.error("Fetch error:", error);
            setMessage("Registration failed. Please try again.");
        }
    };

    return (
        <div>
            <NavBar />
            <div className="container d-flex align-items-center justify-content-center" style={{ height: "100vh" }}>
                <div className="card shadow-lg p-4" style={{ width: "400px" }}>
                    <h3 className="card-header text-center text-primary">Register</h3>
                    <div className="card-body">
                        {message && <div className="alert alert-danger">{message}</div>}
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input
                                    className="form-control"
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input
                                    className="form-control"
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary w-100">Register</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
