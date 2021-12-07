import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';

const Users = () => {
    let token = localStorage.getItem('token');
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await axios.get('http://localhost:4000/api/user/', {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                });
                setUsers(res.data);
            } catch (err) {}
        };
        getProducts();
    }, []);
    console.log(users);
    return (
        <div>
            <Navbar />
            {users?.map((user) => (
                <div key={user._id}>
                    <p>users</p>
                </div>
            ))}
            <Footer />
        </div>
    );
};

export default Users;
