import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../components/Navbar';

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(77, 77, 77, 0.8)),
        url('https://images.unsplash.com/photo-1621959245005-1157d0c7508e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const Wrapper = styled.div`
    width: min(70vh, 400px);
    padding: 20px;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 10px;
`;

const Title = styled.h1`
    font-size: 2rem;
    font-weight: 500;
`;

const Form = styled.form`
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: center;
`;

const Input = styled.input`
    width: min(40vh, 300px);
    margin: 20px 10px 0 0;
    padding: 3px;
`;

const Agreement = styled.p`
    width: min(40vh, 300px);
    font-size: 0.75rem;
    margin: 5px 0;
`;

const Button = styled.button`
    border: none;
    padding: 15px 20px;
    margin-top: 10px;
    cursor: pointer;
`;

const Register = () => {
    const [state, setState] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setState((prevState) => ({
            ...prevState,
            [id]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (
            !state.firstName &&
            !state.lastName &&
            !state.username &&
            !state.email &&
            !state.password &&
            !state.confirmPassword
        ) {
            alert(`Please completely input your details.`);
        } else if (state.password != state.confirmPassword) {
            alert(`Password did not match.`);
        } else
            axios
                .post('http://localhost:4000/api/auth/register', state)
                .then((data) => {
                    if (data.status === 201) {
                        window.location.href = 'http://localhost:3000/login';
                    }
                });
    };
    return (
        <div>
            <Navbar />
            <Container>
                <Wrapper>
                    <Title>Register</Title>
                    <Form>
                        <Input
                            type="string"
                            placeholder="First Name"
                            id="firstName"
                            onInput={handleChange}
                            value={state.firstName}
                        />
                        <Input
                            type="string"
                            placeholder="Last Name"
                            id="lastName"
                            onChange={handleChange}
                            value={state.lastName}
                        />
                        <Input
                            type="string"
                            placeholder="Username"
                            id="username"
                            onChange={handleChange}
                            value={state.username}
                        />
                        <Input
                            type="email"
                            placeholder="Email"
                            id="email"
                            onChange={handleChange}
                            value={state.email}
                        />
                        <Input
                            type="password"
                            placeholder="Password"
                            id="password"
                            onChange={handleChange}
                            value={state.password}
                        />
                        <Input
                            type="password"
                            placeholder="Confirm Password"
                            id="confirmPassword"
                            onChange={handleChange}
                            value={state.confirmPassword}
                        />
                        <Agreement>
                            By creating an account, I consent to the processing
                            of my personal data in accordance with the{' '}
                            <b>PRIVACY POLICY</b>
                        </Agreement>
                        <Agreement>
                            Already have an account?{' '}
                            <Link to="/login">Login</Link>
                        </Agreement>
                        <Agreement>
                            Back to{' '}
                            <Link to="/" style={{ textDecoration: 'none' }}>
                                homepage
                            </Link>
                        </Agreement>
                        <Button onClick={handleSubmit}>Create Account</Button>
                    </Form>
                </Wrapper>
            </Container>
        </div>
    );
};

export default Register;
