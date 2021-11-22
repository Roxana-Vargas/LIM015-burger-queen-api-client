import React from "react";
import { Link } from "react-router-dom";
import { faUsers, faHamburger, faClipboardList, faMortarPestle, faAddressCard, faUserMinus} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navigation = () => {
  const logout = () => {
    localStorage.clear();
    
  }
  return (
  <nav class="navbar navbar-light me-3 mt-4">
    <div class="container-fluid d-flex justify-content-end ">
      <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
        <span class="navbar-toggler-icon"></span>
      </button>
    </div>
    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasExampleLabel">Menú</h5>
      <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <ul>
          <li><Link to="/users"> <FontAwesomeIcon icon={faUsers} />Users</Link></li>
          <li><Link to="/products"><FontAwesomeIcon icon={faClipboardList} /> Products</Link></li>
          <li><Link to="/orders"> <FontAwesomeIcon icon={faHamburger} />Orders</Link></li>
          <li><Link to="/status"> <FontAwesomeIcon icon={faMortarPestle} />Status</Link></li>
          <li><Link to="/profile"> <FontAwesomeIcon icon={faAddressCard} />Profile</Link></li>
          <li><Link onClick={logout} to="/"> <FontAwesomeIcon icon={faUserMinus} /> Log Out</Link></li>
        </ul>
      </div>
    </div>
  </nav>  
  )
}

export default Navigation


