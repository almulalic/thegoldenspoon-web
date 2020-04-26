import React, { useState } from "react";
import { Link, withRouter, useHistory } from "react-router-dom";
import "./Navbar.css";
import { InputText } from "primereact/inputtext";

export const Navbar = (props) => {
  return (
    <div className="NavbarContainer">
      <div className="Logo"></div>
      <div className="SearchBar">
        <input type="text" size="50" placeholder="Search user..." />
      </div>
      <div className="UserProfile">
        <img
          className="icon"
          src="https://cdn2.iconfinder.com/data/icons/avatar-profile/458/avatar_contact_starwars_user_default_mickey-512.png"
          alt=""
        />
        Emily Disney
      </div>
    </div>
  );
};
