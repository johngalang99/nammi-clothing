import React from 'react';
import styled from 'styled-components';
import { Search, ShoppingCart } from '@material-ui/icons';
import { Badge } from '@material-ui/core';

const Nav = styled.div`
  height: 50px;
`;

const Container = styled.div`
  display: flex;
  justify-content: spaced-between;
  padding: 10px 20px;
  border: 1px solid black;
`;

const Left = styled.div`
  flex: 1;
`;

const Logo = styled.h1`
  font-weight: bold;
`;

const Center = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: row;
`;

const Input = styled.input`
  border: none;
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
  return (
    <Nav>
      <Container>
        <Left>
          <Logo>NAMMI</Logo>
        </Left>
        <Center>
          <SearchContainer>
            <Input placeholder=" Search" />
            <Search style={{ color: 'gray' }} />
          </SearchContainer>
        </Center>
        <Right>
          <Items>Sign Up</Items>
          <Items>Log In</Items>
          <Items>
            <Badge badgeContent={1} color="secondary">
              <ShoppingCart />
            </Badge>
          </Items>
        </Right>
      </Container>
    </Nav>
  );
};

export default Navbar;
