import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ShoppingCart } from '@material-ui/icons';
import { Badge } from '@material-ui/core';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Nav = styled.div`
    width: 100%;
    height: 50px;
    overflow-x: hidden;
`;

const Container = styled.div`
    display: flex;
    padding: 10px 20px;
`;

const Left = styled.div`
    flex: 1;
    align-items: center;
`;

const Logo = styled.h1`
    font-weight: 600;
`;

const Center = styled.div`
    display: flex;
    flex: 1;
    justify-content: flex-end;
    align-items: center;
`;

const Right = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
`;

const Items = styled.div`
    font-size: 14px;
    cursor: pointer;
`;

const Navbar = () => {
    let token = localStorage.getItem('token');
    let admin = localStorage.getItem('isAdmin');
    let userId = localStorage.getItem('userId');

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('isAdmin');
        localStorage.removeItem('userId');
        window.location.href = 'http://localhost:3000/login';
    };

    const [badge, setBadge] = useState('');

    useEffect(() => {
        if (token) {
            const updateBadge = async () => {
                try {
                    const res = await axios.get(
                        `http://localhost:4000/api/cart/${userId}`,
                        {
                            headers: {
                                authorization: `Bearer ${token}`,
                            },
                        }
                    );
                    setBadge(res.data.products.length);
                } catch (error) {}
            };
            updateBadge();
        }
    }, [token, userId]);

    return (
        <Nav>
            <Container>
                <Left>
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <Logo>NAMMI</Logo>
                    </Link>
                </Left>
                <Center></Center>
                <Right>
                    <Link to="/products" style={{ textDecoration: 'none' }}>
                        <Items>Shop</Items>
                    </Link>
                    {JSON.parse(admin) && (
                        <Link
                            to="/add-product"
                            style={{ textDecoration: 'none' }}
                        >
                            <Items>Add Product</Items>
                        </Link>
                    )}
                    {JSON.parse(admin) && (
                        <Link to="/users" style={{ textDecoration: 'none' }}>
                            <Items>Users</Items>
                        </Link>
                    )}
                    {token != null && (
                        <Link to="/login" style={{ textDecoration: 'none' }}>
                            <Items onClick={logout}>Log Out</Items>
                        </Link>
                    )}
                    {token != null && (
                        <Items>
                            <Badge badgeContent={badge || 0} color="secondary">
                                <Link to={`/cart/${userId}`}>
                                    <ShoppingCart />
                                </Link>
                            </Badge>
                        </Items>
                    )}
                    {token == null && (
                        <Link to="/login" style={{ textDecoration: 'none' }}>
                            <Items>Log In</Items>
                        </Link>
                    )}
                    {token == null && (
                        <Link to="/register" style={{ textDecoration: 'none' }}>
                            <Items>Sign Up</Items>
                        </Link>
                    )}
                </Right>
            </Container>
        </Nav>
    );
};

export default Navbar;
