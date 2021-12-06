import React, { useState } from 'react';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(77, 77, 77, 0.8)),
    url('https://images.unsplash.com/photo-1523380677598-64d85d015339?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80');
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

const Button = styled.button`
  border: none;
  padding: 15px 20px;
  margin-top: 10px;
  cursor: pointer;
`;

const AddProduct = () => {
  let token = localStorage.getItem('token');
  let categories;
  let sizes;
  let colors;
  const [state, setState] = useState({
    title: '',
    desc: '',
    img: '',
    categories: [],
    size: [],
    color: [],
    price: '',
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const toArray = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value.split(' '),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:4000/api/products/create', state, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        if (data.status === 200) {
          alert(`Product Added`);
        }
      });
  };
  return (
    <div>
      <Navbar></Navbar>
      <Container>
        <Wrapper>
          <Title>Add Product</Title>
          <Form>
            <Input
              type="string"
              placeholder="Title"
              id="title"
              onInput={handleChange}
              value={state.title}
            />
            <Input
              type="string"
              placeholder="Description"
              id="desc"
              onChange={handleChange}
              value={state.desc}
            />
            <Input
              type="string"
              placeholder="Image Link"
              id="img"
              onChange={handleChange}
              value={state.img}
            />
            <Input
              type="string"
              placeholder="Categories"
              id="categories"
              onChange={toArray}
              value={categories}
            />
            <Input
              type="string"
              placeholder="Sizes"
              id="size"
              onChange={toArray}
              value={sizes}
            />
            <Input
              type="string"
              placeholder="Colors"
              id="color"
              onChange={toArray}
              value={colors}
            />
            <Input
              type="number"
              placeholder="Price"
              id="price"
              onChange={handleChange}
              value={state.price}
            />
            <Button onClick={handleSubmit}>Add Product</Button>
          </Form>
        </Wrapper>
      </Container>
      <Footer></Footer>
    </div>
  );
};

export default AddProduct;
