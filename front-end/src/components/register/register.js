import { useState } from "react";
import NavBar from "../navbar/navbar";
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        try {
            console.log("Request Body:", { email, password, isAdmin: false });
            const body = {
                email : email,
                password : password,
                isAdmin : false
            }
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
        }
        
    };

    return (
        <div>
            <div className='nav'><NavBar /></div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card mb-3">
                            <h3 className="card-header text-primary">Register</h3>
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <fieldset>
                                        <div>
                                            <label htmlFor="email" className="form-label mt-4">Email: </label>
                                            <input
                                                className="form-control"
                                                type="email"
                                                id="email"
                                                name="email"
                                                required
                                            />
                                            
                                        </div>
                                        <div>
                                            <label htmlFor="password" className="form-label mt-4">Password: </label>
                                            <input
                                                className="form-control"
                                                type="password"
                                                id="password"
                                                name="password"
                                                required
                                            />
                                            
                                        </div>
                                    
                                        <br/>
                                        <input type="submit" value="Register" />
                                    </fieldset>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
