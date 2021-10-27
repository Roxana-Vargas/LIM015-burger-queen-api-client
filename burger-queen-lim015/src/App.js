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
          <Route path= "/" exact> <Login />
            {token ? (<Redirect to="/users"/>) : (<Redirect to="/"/>)}
          </Route>
          <Route path= "/users"> <Users />
            {token ? (<Redirect to="/users"/>) : (<Redirect to="/"/>)}
          </Route>
          <Route path= "/products"> <Products />
            {token ? (<Redirect to="/products"/>) : (<Redirect to="/"/>)}
          </Route>
          <Route path= "/orders"> <Orders />
            {token ? (<Redirect to="/orders"/>) : (<Redirect to="/"/>)}  
          </Route>
          <Route path= "/status"><StatusOfOrder />
            {token ? (<Redirect to="/status"/>) : (<Redirect to="/"/>)}
          </Route>
          <Route path= "/profile"> <Profile />
            {token ? (<Redirect to="/profile"/>) : (<Redirect to="/"/>)}
          </Route>
        </Switch>
      </div> 
    </Router>
  );
}

export default App;
