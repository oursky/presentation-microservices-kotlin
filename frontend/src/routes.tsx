import React from 'react';
import { Route, Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import App from './Components/App';
import Navbar from './Components/Navbar';
import NewProductPage from './Components/NewProduct';
import ShoppingCart from './Components/ShoppingCart';
import Login from './Components/Login';
import Register from './Components/Register';

const history = createBrowserHistory();

export default (
    <Router history = {history}>
        <Navbar/>
        <br />
        <Route path = "/" exact component = {App} />
        <Route path = "/new" exact component = {NewProductPage} />
        <Route path = "/cart" exact component = {ShoppingCart} />
        <Route path = "/login" exact component = {Login} />
        <Route path = "/register" exact component = {Register} />
    </Router>
);