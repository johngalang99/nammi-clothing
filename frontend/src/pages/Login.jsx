import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(rgba(26, 26, 26, 0.5), rgba(43, 43, 43, 0.7)),
    url('https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80');
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

const Links = styled.p`
  width: min(40vh, 300px);
  font-size: 0.75rem;
  margin: 5px 0;
  text-align: center;
`;

const Button = styled.button`
  margin: 10px 0;
  border: none;
  padding: 10px;
  cursor: pointer;
`;

const Login = () => {
  const [state, setState] = useState({
    username: '',
    password: '',
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
    if (!state.username && !state.password) {
      alert(`Please input credentials`);
    } else
      axios
        .post('http://localhost:4000/api/auth/login', state)
        .then((res) => {
          const { _id, isAdmin, token } = res.data;
          localStorage.setItem('isAdmin', isAdmin);
          localStorage.setItem('userId', _id);
          localStorage.setItem('token', token);
          window.location.href = 'http://localhost:3000/';
        })
        .catch((error) => {
          alert(`Invalid username or password`);
        });
  };

  return (
    <Container>
      <Wrapper>
        <Title>Login</Title>
        <Form>
          <Input
            type="string"
            placeholder="Username"
            id="username"
            onChange={handleChange}
            value={state.username}
          />
          <Input
            type="password"
            placeholder="Password"
            id="password"
            onChange={handleChange}
            value={state.password}
          />
          <Button onClick={handleSubmit}>Login</Button>
          <Links>
            <Link to="#" style={{ textDecoration: 'none' }}>
              Forgot password?
            </Link>
          </Links>
          <Links>
            <Link to="/register" style={{ textDecoration: 'none' }}>
              Create an account
            </Link>
          </Links>
          <Links>
            <Link to="/" style={{ textDecoration: 'none' }}>
              Back to homepage
            </Link>
          </Links>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
