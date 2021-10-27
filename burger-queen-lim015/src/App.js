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

function App() {

  

  return (
    
    <Router>
      <div className="App">
        <header className='header'>
        <img src={logo} className='logo' alt='logo'/>
        </header>
        <Switch>
          <Route path= "/" exact>
            <Login />
          </Route>
          <Route path= "/users">
            <Users />
          </Route>
          <Route path= "/products">
            <Products />
          </Route>
          <Route path= "/orders">
            <Orders />
          </Route>
          <Route path= "/status">
            <StatusOfOrder />
          </Route>
          <Route path= "/profile">
            <Profile />
          </Route>
        </Switch>
      </div> 
    </Router>
  );
}

export default App;
