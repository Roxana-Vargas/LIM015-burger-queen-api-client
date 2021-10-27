import React from "react";

import { Link } from "react-router-dom";

const Navigation = () => {

  const logout = () => {
    localStorage.clear();
  }

  return (
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
              <Link onClick={logout} to="/">Log Out</Link> 
            </li>
        </ul>
    </nav> )
}

export default Navigation


