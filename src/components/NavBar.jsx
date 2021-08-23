import "./Navbar.scss";

import { Link } from "react-router-dom";
import React from "react";

const NavBar = ({ logoImage, title, firstName }) => (
  <div className="nav-bar flex-row">
    <Link to="/">
      <img className="logo" src={logoImage} alt="Logo" />
    </Link>
    <h1>{title}</h1>
    <Link to="/profile">{`Welcome ${firstName}`}</Link>
  </div>
);

export default NavBar;
