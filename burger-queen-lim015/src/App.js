import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
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
        <nav>
          <ul>
            <li>
              <Link to="/users">Users</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
            <li>
              <Link to="/orders">Orders</Link>
            </li>
            <li>
              <Link to="/status">Status</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/">Log Out</Link>
            </li>
          </ul>
        </nav>
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
