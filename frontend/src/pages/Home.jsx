import Categories from '../components/Categories';
import React from 'react';
import Jumbotron from '../components/Jumbotron';
import Navbar from '../components/Navbar';
import Products from '../components/Products';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div>
      <Navbar />
      <Jumbotron />
      <Products />
      <Categories />
      <Footer />
    </div>
  );
};

export default Home;
