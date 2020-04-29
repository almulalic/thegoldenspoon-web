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
import { withRouter } from "react-router-dom";

const LoginRegister = (props) => {
  useEffect(() => {
    localStorage.clear();
  });
  return (
    <Page padding="none" customClassName="main">
      <div className="loginRegister">
        <div id="login">
          <div className="Form-Card">
            <div className="Form-CardHeader">
              <h1>Login</h1>
            </div>
            <div className="Form-CardBody">
              <Login />
            </div>
          </div>
        </div>
        <div id="register">
          <div className="Form-Card">
            <div className="Form-CardHeader">
              <h1>Are you new ?</h1>
              <h2>Come on in !</h2>
            </div>
            <div className="register card">
              <div className="Form-CardBody">
                <Register />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
};
export default withRouter(LoginRegister);
