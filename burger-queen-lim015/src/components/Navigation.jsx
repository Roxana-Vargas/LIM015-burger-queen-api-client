import React from "react";
import { Link } from "react-router-dom";
import { faUsers, faHamburger, faClipboardList, faMortarPestle, faAddressCard, faUserMinus} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navigation = () => {
  const logout = () => {
    localStorage.clear();
    
  }
  return (
  <nav className="navbar navbar-light me-3 mt-4">
    <div className="container-fluid d-flex justify-content-end ">
      <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
        <span className="navbar-toggler-icon"></span>
      </button>
    </div>
    <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasExampleLabel">Burger Queen</h5>
      <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div className="offcanvas-body">
        <ul>
          <li><Link to="/users"> <FontAwesomeIcon className="me-3" icon={faUsers} /> Users</Link></li>
          <li><Link to="/products"><FontAwesomeIcon className="me-3"  icon={faClipboardList} /> Products</Link></li>
          <li><Link to="/orders"> <FontAwesomeIcon className="me-3"  icon={faHamburger} /> Orders</Link></li>
          <li><Link to="/status"> <FontAwesomeIcon className="me-3"  icon={faMortarPestle} /> Status</Link></li>
          <li><Link to="/profile"> <FontAwesomeIcon className="me-3"  icon={faAddressCard} /> Profile</Link></li>
          <li><Link onClick={logout} to="/"> <FontAwesomeIcon className="me-3"  icon={faUserMinus} /> Log Out</Link></li>
        </ul>
      </div>
    </div>
  </nav>  
  )
}

export default Navigation


