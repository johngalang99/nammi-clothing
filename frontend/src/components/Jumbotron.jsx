import React from 'react';
import styled from 'styled-components';

const Section = styled.div`
  width: 100%;
  height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-image: linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.8),
      rgba(255, 255, 255, 0.5)
    ),
    url('https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80');
  background-size: cover;
  background-repeat: no-repeat;
`;

const Container = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 3rem;
  font-weight: 400;
`;

const Description = styled.p`
  width: min(70vh, 1000px);
  color: #242424;
  margin-bottom: 1rem;
`;

const Button = styled.button`
  padding: 10px 15px;
  margin-top: 1rem;
  font-weight: 500;
  font-size: 1.1rem;
  cursor: pointer;
  border: none;
  border-radius: 5px;
`;

const Line = styled.hr`
  width: 80%;
`;

const Link = styled.a``;

const Jumbotron = () => {
  return (
    <Section>
      <Container>
        <Title>Welcome to Nammi Clothing</Title>
        <Description>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
          facilis dolorem eligendi distinctio neque libero molestias animi.
          Aliquam atque obcaecati laboriosam expedita natus impedit maxime.
        </Description>
        <Line />
        <Link href="/products" role="button">
          <Button>Shop Now!</Button>
        </Link>
      </Container>
    </Section>
  );
};

export default Jumbotron;
