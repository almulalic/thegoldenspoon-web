import React, { useState } from "react";
import { Link, withRouter, useHistory } from "react-router-dom";

const Navbar = (props) => {
  const [nameInput, setNameInput] = useState("");
  let history = useHistory();
  const logOut = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    history.push("/");
  };
  return (
    <div>
      <Link to="/login">LOGIN</Link>
      <br />
      <Link to="/register">REGISTER</Link>
      <br />
      <a
        onClick={(e) => {
          logOut(e);
        }}
      >
        LOGOUT
      </a>
    </div>
  );
};

export default Navbar;
