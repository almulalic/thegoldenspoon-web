import React, { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import identities from "../../api/identities";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import "./LoginRegister.scss";
import Register from "../../components/register/Register";
import { Stack } from "../../elements/stack/Stack";
import { Page } from "../../elements/page/Page";
import Login from "../../components/login/Login";

const LoginRegister = (props) => {
  return (
    <Page padding="none" customClassName="main">
      <div className="main">
        <div className="login">
          <Login />
        </div>
        <div className="register">
          <Register />
        </div>
      </div>
    </Page>
  );
};

export default LoginRegister;
