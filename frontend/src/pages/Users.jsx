import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';
import styled from 'styled-components';
import { Delete } from '@material-ui/icons';

const Wrapper = styled.div`
    padding: 20px;
    display: flex;
    justify-content: space-evenly;
    border-bottom: 1px solid lightgray;
`;

const Header = styled.div`
    padding: 20px;
    display: flex;
    justify-content: space-evenly;
    border-bottom: 1px solid lightgray;
`;

const FirstName = styled.p`
    flex: 1;
`;
const LastName = styled.p`
    flex: 1;
`;
const Username = styled.p`
    flex: 1;
`;
const Email = styled.p`
    flex: 1;
`;
const Admin = styled.p`
    flex: 0.5;
    text-align: center;
`;

const Action = styled.p`
    flex: 0.5;
    text-align: center;
`;

const Button = styled.button`
    flex: 0.5;
    text-align: center;
`;

const Users = () => {
    let token = localStorage.getItem('token');
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await axios.get(
                    'https://nammi-clothing-api.herokuapp.com/api/user/',
                    {
                        headers: {
                            authorization: `Bearer ${token}`,
                        },
                    }
                );
                setUsers(res.data);
            } catch (err) {}
        };
        getProducts();
    }, [token]);

    const makeAdmin = async (id) => {
        try {
            await axios.put(
                `https://nammi-clothing-api.herokuapp.com/api/user/${id}/update`,
                { isAdmin: true },
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                }
            );
            alert(`Admin Added`);
            window.location.reload();
        } catch (error) {}
    };

    const deleteUser = async (id) => {
        try {
            await axios.delete(
                `https://nammi-clothing-api.herokuapp.com/api/user/${id}/delete`,
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                }
            );
            alert(`User Deleted`);
            window.location.reload();
        } catch (error) {}
    };

    return (
        <div>
            <Navbar />
            <Header>
                <FirstName style={{ fontWeight: 600 }}>First Name</FirstName>
                <LastName style={{ fontWeight: 600 }}>Last Name</LastName>
                <Username style={{ fontWeight: 600 }}>Username</Username>
                <Email style={{ fontWeight: 600 }}>Email</Email>
                <Admin style={{ fontWeight: 600 }}>Status</Admin>
                <Action style={{ fontWeight: 600 }}>Action</Action>
            </Header>
            {users?.map((user) => (
                <div key={user._id}>
                    <Wrapper>
                        <FirstName>{user.firstName}</FirstName>
                        <LastName>{user.lastName}</LastName>
                        <Username>{user.username}</Username>
                        <Email>{user.email}</Email>
                        {!user.isAdmin && (
                            <Button onClick={() => makeAdmin(user._id)}>
                                Make Admin
                            </Button>
                        )}
                        {user.isAdmin && <Admin>ADMIN</Admin>}
                        <Action>
                            <Delete
                                onClick={() => deleteUser(user._id)}
                                style={{ cursor: 'pointer' }}
                            />
                        </Action>
                    </Wrapper>
                </div>
            ))}
            <Footer />
        </div>
    );
};

export default Users;
