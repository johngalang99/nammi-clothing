import React from 'react';
import styled from 'styled-components';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import MapIcon from '@mui/icons-material/Map';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

const Container = styled.div`
  display: flex;
  background-color: #ffede7;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Desc = styled.p`
  margin: 20px 0;
`;

const SocialContainer = styled.div`
  display: flex;
`;

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #${(props) => props.color};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 30px;
  color: white;
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
`;

const Title = styled.h3`
  margin-bottom: 30px;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
`;

const ContactItem = styled.p`
  margin-bottom: 7px;
`;

const Payment = styled.img``;

const Logo = styled.h1``;

const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>NAMMI</Logo>
        <Desc>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam, qui.
          Tempora veniam ea expedita fugit dignissimos, fugiat culpa qui sunt id
          placeat numquntium sint.
        </Desc>
        <SocialContainer>
          <SocialIcon color="3b5998">
            <FacebookIcon />
          </SocialIcon>
          <SocialIcon color="00acee">
            <TwitterIcon />
          </SocialIcon>
          <SocialIcon color="E4405F">
            <InstagramIcon />
          </SocialIcon>
        </SocialContainer>
      </Left>

      <Center>
        <Title>Navigate</Title>
        <List>
          <ListItem>Home</ListItem>
          <ListItem>About Us</ListItem>
          <ListItem>Shop</ListItem>
          <ListItem>Cart</ListItem>
          <ListItem>Register</ListItem>
          <ListItem>Login</ListItem>
          <ListItem>Careers</ListItem>
          <ListItem>Terms</ListItem>
        </List>
      </Center>
      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <MapIcon style={{ marginRight: '10px' }} />
          0429 Malitlit, Los Baños 4030
        </ContactItem>
        <ContactItem>
          <PhoneEnabledIcon style={{ marginRight: '10px' }} />
          +63 243 4432
        </ContactItem>
        <ContactItem>
          <MailOutlineIcon style={{ marginRight: '10px' }} />
          contact@nammi.dev
        </ContactItem>
        <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
      </Right>
    </Container>
  );
};

export default Footer;
