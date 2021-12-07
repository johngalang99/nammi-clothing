import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Product from './pages/Product';
import ProductList from './pages/ProductList';
import Register from './pages/Register';
import Cart from './pages/Cart';
import AddProduct from './pages/AddProduct';
import Orders from './pages/Orders';

const App = () => {
  const token = localStorage.getItem('token');
  const isAdmin = localStorage.getItem('isAdmin');

  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/products">
            <ProductList />
          </Route>
          <Route path="/product/:id">
            <Product />
          </Route>
          <Route path="/cart/:id">
            <Cart />
          </Route>
          <Route path="/login">
            {token ? <Redirect to="/" /> : <Login />}
            <Login />
          </Route>
          <Route path="/register">
            {token ? <Redirect to="/" /> : <Register />}
            <Register />
          </Route>
          <Route path="/order/:id">
            <Orders />
          </Route>
          <Route path="/add-product">
            {isAdmin == true ? <Redirect to="/" /> : <AddProduct />}
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default App;
