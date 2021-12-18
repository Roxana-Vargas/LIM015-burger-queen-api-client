import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  
} from "react-router-dom";
import './App.css';
import Login from "./components/Login";
import Orders from "./components/Orders";
import Products from "./components/Products";
import Profile from "./components/Profile";
import StatusOfOrder from "./components/Status-orders";
import Users from "./components/Users";
import logo from './images/logo-bq.png';
import { Redirect } from 'react-router';

function App() {

  const token = localStorage.getItem('token')

  return (
    
    <Router>
      <div className="App">
        <header className='header'>
          <img src={logo} className='logo' alt='logo'/>
        </header>
        <Switch>
          <Route path= "/" exact> 
            {token ? (<Redirect to="/users"/>) : (<Redirect to="/"/>)}
            <Login />
          </Route>
          <Route path= "/users"> 
            {token ? (<Redirect to="/users"/>) : (<Redirect to="/"/>)}
            <Users />
          </Route>
          <Route path= "/products"> 
            {token ? (<Redirect to="/products"/>) : (<Redirect to="/"/>)}
            <Products />
          </Route>
          <Route path= "/orders"> 
            {token ? (<Redirect to="/orders"/>) : (<Redirect to="/"/>)}  
            <Orders />
          </Route>
          <Route path= "/status">
            {token ? (<Redirect to="/status"/>) : (<Redirect to="/"/>)}
            <StatusOfOrder />
          </Route>
          <Route path= "/profile"> 
            {token ? (<Redirect to="/profile"/>) : (<Redirect to="/"/>)}
            <Profile />
          </Route>
        </Switch>
      </div> 
    </Router>
  );
}

export default App;
