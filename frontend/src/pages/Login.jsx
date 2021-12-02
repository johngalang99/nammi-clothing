import React from 'react';
import styled from 'styled-components';

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

const Link = styled.p`
  width: min(40vh, 300px);
  font-size: 0.75rem;
  margin: 10px 0;
  text-align: center;
`;

const Button = styled.button`
  margin-top: 10px;
  border: none;
  padding: 10px;
  cursor: pointer;
`;

const Login = () => {
  return (
    <Container>
      <Wrapper>
        <Title>Login</Title>
        <Form>
          <Input placeholder="Username" />
          <Input placeholder="Password" />
          <Button>Login</Button>
          <Link>Forgot password?</Link>
          <Link>Create an account</Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
