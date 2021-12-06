import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Info = styled.div`
  opacity: 0;
  background-color: rgba(0, 0, 0, 0.2);
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
  transition: all 0.2s ease;
`;

const Container = styled.div`
  flex: 1;
  margin: 3px;
  height: 40vh;
  position: relative;

  &:hover ${Info} {
    opacity: 1;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Title = styled.h1`
  font-weight: 500;
  text-align: center;
  color: white;
`;
const Button = styled.button`
  width: 25%;
  margin: 10px auto;
  border: none;
  padding: 5px;
  cursor: pointer;
  background-color: white;
  color: gray;
  font-weight: 500;
`;

const CategoryItem = ({ item }) => {
  const { img, title } = item;
  return (
    <Container>
      <Link to={`/products/`}>
        <Image src={img} />
        <Info>
          <Title>{title}</Title>
          <Button>Shop Now</Button>
        </Info>
      </Link>
    </Container>
  );
};

export default CategoryItem;
