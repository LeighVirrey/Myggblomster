import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UsersPage = ({ currentUser }) => {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [updatedEmail, setUpdatedEmail] = useState('');
    
    useEffect(() => {
        axios.get('http://localhost:9000/users').then(response => {
            setUsers(response.data.users);
        });
    }, []);

    const handleEditClick = (user) => {
        setEditingUser(user);
        setUpdatedEmail(user.email);
    };

    const handleSave = (id) => {
        axios.put(`http://localhost:9000/user/${id}`, { email: updatedEmail })
            .then(() => {
                setUsers(users.map(user => user._id === id ? { ...user, email: updatedEmail } : user));
                setEditingUser(null);
            });
    };

    return (
        <div>
            <h2>Users</h2>
            {users.map(user => (
                <div key={user._id}>
                    {editingUser && editingUser._id === user._id ? (
                        <input value={updatedEmail} onChange={e => setUpdatedEmail(e.target.value)} />
                    ) : (
                        <span>{user.email}</span>
                    )}
                    {currentUser.isAdmin || currentUser._id === user._id ? (
                        <>
                            {editingUser && editingUser._id === user._id ? (
                                <button onClick={() => handleSave(user._id)}>Save</button>
                            ) : (
                                <button onClick={() => handleEditClick(user)}>Edit</button>
                            )}
                        </>
                    ) : null}
                </div>
            ))}
        </div>
    );
};

export default UsersPage;