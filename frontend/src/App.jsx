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
import Users from './pages/Users';

const App = () => {
    const token = localStorage.getItem('token');
    const admin = localStorage.getItem('isAdmin');
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
                        {!JSON.parse(admin) ? (
                            <Redirect to="/" />
                        ) : (
                            <AddProduct />
                        )}
                    </Route>
                    <Route path="/users">
                        {!JSON.parse(admin) ? <Redirect to="/" /> : <Users />}
                    </Route>
                </Switch>
            </Router>
        </>
    );
};

export default App;
