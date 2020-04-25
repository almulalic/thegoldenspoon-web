import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import identities from "../../api/identities";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Stack } from "../../elements/stack/Stack";
import { Card } from "primereact/card";
import { Message } from "primereact/message";
import {
  Inplace,
  InplaceDisplay,
  InplaceContent,
} from "primereact/components/inplace/Inplace";
import { Growl } from "primereact/growl";

export default function Login() {
  // MAIN STATES
  const [loginEmailInput, setLoginEmailInput] = useState("");
  const [loginPasswordInput, setLoginPasswordInput] = useState("");
  const [forgetPasswordEmailInput, setForgotPasswordInput] = useState("");
  const [isForgetPasswordVisible, setForgetPasswordVisible] = useState(false);

  // LOADING STATES
  const [isLoadingResponse, setIsLoadingReposne] = useState(false);

  // ERROR HANDLING
  const [userDoesentExistError, setUserDoesentExistError] = useState(false);

  const [loginDataNotValidError, setLoginDataNotValidError] = useState(false);

  const [accountNotConfirmedError, setAccountNotConfirmedError] = useState(
    false
  );

  const [internalServerError, setInternalServerError] = useState(false);

  const handleErrorClear = () => {
    setUserDoesentExistError(false);
    setLoginDataNotValidError(false);
    setAccountNotConfirmedError(false);
    setInternalServerError(false);
    // setLoginPasswordInput("");
  };

  // FINAL STATES
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  var growl = new Growl();

  const login = (email, password) => {
    setIsLoadingReposne(true);
    identities.login({ email: email, password: password }).then((res) => {
      if (res !== undefined) {
        console.log(res);
        if (res.data === 1) {
          handleErrorClear();
          setUserDoesentExistError(true);
          setIsLoggedIn(false);
          setIsLoadingReposne(false);
        } else if (res.data === 2) {
          handleErrorClear();
          setLoginDataNotValidError(true);
          setIsLoggedIn(false);
          setIsLoadingReposne(false);
        } else if (res.data === 3) {
          handleErrorClear();
          setAccountNotConfirmedError(true);
          setIsLoggedIn(false);
          setIsLoadingReposne(false);
        } else if (res.data === 4) {
          handleErrorClear();
          setInternalServerError(true);
          setIsLoggedIn(false);
          setIsLoadingReposne(false);
        } else {
          handleErrorClear();
          localStorage.setItem("token", 123);
          setIsLoggedIn(true);
          setIsLoadingReposne(false);
        }
      }
    });
  };

  return (
    <Stack vertical alignment="center" distribution="fillEvenly">
      <h1>Login</h1>

      <Growl ref={(el) => (growl = el)} />

      <span className="p-float-label">
        <InputText
          id="float-input"
          label="email"
          value={loginEmailInput}
          onChange={(e) => setLoginEmailInput(e.target.value)}
          size="50"
        />
        <label htmlFor="float-input loginLabel">Email</label>
      </span>

      <span className="p-float-label">
        <Password
          label="password"
          value={loginPasswordInput}
          onChange={(e) => setLoginPasswordInput(e.target.value)}
          size="50"
          feedback={false}
        />
        <label htmlFor="float-input ">
          <span className="loginLabel">Password</span>
        </label>
      </span>
      <div className="loginButton">
        <Button
          className="p-button-raised "
          label="Login"
          onClick={() => {
            login(loginEmailInput, loginPasswordInput);
          }}
        />
      </div>

      <Inplace onOpen={isForgetPasswordVisible}>
        <InplaceDisplay>
          <span className="forgotPasswordText">Forgot your password ?</span>
        </InplaceDisplay>
        <InplaceContent>
          <Stack vertical alignment="center">
            <span className="p-float-label">
              <InputText
                id="primaryEmailAdress"
                label="email"
                value={forgetPasswordEmailInput}
                onChange={(e) => setForgotPasswordInput(e.target.value)}
                size="50"
              />
              <label htmlFor="float-input" className="loginLabel">
                Primariy email adress
              </label>
            </span>
            <Button label="Submit" />
          </Stack>
        </InplaceContent>
      </Inplace>

      <div>
        {userDoesentExistError ? (
          <Message
            severity="error"
            text="We couldnt find user with that login information"
          />
        ) : loginDataNotValidError ? (
          <Message
            severity="error"
            text="Login data not correct. Please try again"
          />
        ) : accountNotConfirmedError ? (
          <Message
            severity="error"
            text="You have to confirm your account first"
          />
        ) : internalServerError ? (
          <Message
            severity="error"
            text="Internal server error, if this message persist please contact your administrator"
          />
        ) : null}
      </div>

      {isLoggedIn && (
        // growl.show({
        //   severity: "success",
        //   summary: "Successfully logged in",
        //   detail: "Enjoy",
        // })
        <p>Successfully logged in !</p>
      )}
    </Stack>
  );
}
