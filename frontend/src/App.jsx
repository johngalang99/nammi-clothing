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

const App = () => {
  const user = true;
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
          <Route path="/cart/">
            <Cart />
          </Route>
          <Route path="/login">
            {user ? <Redirect to="/" /> : <Login />}
            <Login />
          </Route>
          <Route path="/register">
            {user ? <Redirect to="/" /> : <Login />}
            <Register />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default App;
