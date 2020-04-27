import React, { useState } from "react";
import { Link, withRouter, useHistory } from "react-router-dom";
import "./Navbar.scss";
import { InputText } from "primereact/inputtext";

export const Navbar = (props) => {
  const [searchUserInput, setSearchUserInput] = useState("");
  const userData = JSON.parse(localStorage.getItem("user"));
  let history = useHistory();

  return (
    <div className="NavbarContainer">
      <div className="Logo"></div>
      <div className="SearchBar">
        <InputText
          id="float-input"
          placeholder="Search users..."
          value={searchUserInput}
          onChange={(e) => setSearchUserInput(e.target.value)}
          size="50"
        />
      </div>
      <div className="UserProfile">
        {userData.username}
        <img
          className="icon"
          src="https://cdn2.iconfinder.com/data/icons/avatar-profile/458/avatar_contact_starwars_user_default_mickey-512.png"
          alt=""
        />
      </div>
      <div className="logout">
        <p
          onClick={() => {
            localStorage.clear();
            history.push("/loginRegister");
          }}
        >
          Logout
        </p>
      </div>
    </div>
  );
};
