import React from 'react';
import {BrowserRouter as Router, Route, NavLink} from 'react-router-dom';
// Container components
import ItemsPage from './containers/item/ItemsPage';
import EditItemPage from './containers/item/EditItemPage';
import AddItemPage from './containers/item/AddItemPage';
import BidsPage from './containers/BidsPage';
// Assets
import logo from './images/logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';

import packetPage from "./containers/packet/PacketPage";

const App = () => {
    return (
        <Router>
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <nav className="main-nav">
                        <ul>
                            <li><NavLink activeClassName="selected" to="/items/1">Item list</NavLink></li>
                            <li><NavLink activeClassName="selected" to="/add">Add item</NavLink></li>
                        </ul>
                    </nav>
                </div>

                <div className="container">
                    <Route path="/packets/:pageNo?" component={packetPage}/>
                    <Route path="/items/:pageNo?" component={ItemsPage}/>
                    <Route path="/add" component={AddItemPage}/>
                    <Route path="/edit/:id" component={EditItemPage}/>
                    <Route path="/bids/:id" component={BidsPage}/>
                </div>
            </div>
        </Router>
    );
};

export default App;
