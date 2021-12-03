import React from 'react';
import styled from 'styled-components';
import { AddShoppingCart, RemoveRedEye } from '@material-ui/icons';
import { Link } from 'react-router-dom';

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 2;
  display: flex;
  justify-content: center;
  transition: all 0.4s ease;
  align-items: center;
`;

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 350px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  position: relative;

  &:hover ${Info} {
    opacity: 1;
  }
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 100%; ;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%50%;
  background-color: #eeeeee;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #ffffff;
    transform: scale(1.1);
  }
`;

const Product = ({ item }) => {
  const { img } = item;
  return (
    <Container>
      <Image src={img} />
      <Info>
        <Icon>
          <AddShoppingCart />
        </Icon>
        <Icon>
          <Link to={`/product/${item._id}`}>
            <RemoveRedEye />
          </Link>
        </Icon>
      </Info>
    </Container>
  );
};

export default Product;
