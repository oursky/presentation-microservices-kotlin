import React from 'react';
import { Route, Router } from "react-router-dom";
import { createBrowserHistory } from "history";
/**
 * Import all page components here
 */
import App from './Components/App';
import Navbar from './Components/Navbar';
import NewProductPage from './Components/NewProduct';
import ShoppingCart from './Components/ShoppingCart';

const history = createBrowserHistory();

/**
 * All routes go here.
 * Don't forget to import the components above after adding new route.
 */
export default (
    <Router history = {history}>
        <Navbar/>
        <br />
        <Route path = "/" exact component = {App} />
        <Route path = "/new" exact component = {NewProductPage} />
        <Route path = "/cart" exact component = {ShoppingCart} />
    </Router>
);