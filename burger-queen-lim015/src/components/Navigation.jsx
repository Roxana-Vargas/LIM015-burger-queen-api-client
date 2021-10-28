import React from "react";
import { Link } from "react-router-dom";
import { faUsers, faHamburger, faClipboardList, faMortarPestle, faAddressCard, faUserMinus} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navigation = () => {
  const logout = () => {
    localStorage.clear();
    
  }

  return (
   <nav>
        <ul>
            <li>
                <Link to="/users"> <FontAwesomeIcon icon={faUsers}/>Users</Link>
            </li>
            <li>
              <Link to="/products" ><FontAwesomeIcon icon={faClipboardList}/> Products</Link>
            </li>
            <li>
              <Link to="/orders"> <FontAwesomeIcon icon={faHamburger}/>Orders</Link>
            </li>
            <li>
              <Link to="/status"> <FontAwesomeIcon icon={faMortarPestle}/>Status</Link>
            </li>
            <li>
              <Link to="/profile"> <FontAwesomeIcon icon={faAddressCard}/>Profile</Link>
            </li>
            <li>
              <Link onClick={logout}  to="/"> <FontAwesomeIcon icon={faUserMinus}/> Log Out</Link> 
            </li>
        </ul>
    </nav> )
}

export default Navigation


