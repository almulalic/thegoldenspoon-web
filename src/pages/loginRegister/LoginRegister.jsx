import React, { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import identities from "../../api/identities";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import "./LoginRegister.scss";
import { Stack } from "../../elements/stack/Stack";
import { Page } from "../../elements/page/Page";
// import { Card } from "primereact/card";
import { Card } from "../../elements/card/Card";
import { Login, Register } from "../../components";

const LoginRegister = (props) => {
  return (
    <Page padding="none" customClassName="main">
      <div className="main">
        <div className="container">
          <div className="login">
            <Login />
          </div>
          <Register />
        </div>
      </div>
    </Page>
  );
};

export default LoginRegister;
