import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import identities from "../../api/identities";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Stack } from "../../elements/stack/Stack";
import { Message } from "primereact/message";
import { useHistory } from "react-router-dom";
import "./Login.scss";

export const Login = ({ setRedirectingState }) => {
  // MAIN STATES
  const [loginCredentialInput, setLoginCredentialInput] = useState("");
  const [loginPasswordInput, setLoginPasswordInput] = useState("");

  let history = useHistory();

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

  const login = (credential, password) => {
    setIsLoadingReposne(true);
    identities
      .login({ credential: credential, password: password })
      .then((res) => {
        if (res !== undefined) {
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
            history.push({
              pathname: `/loginRedirect`,
              state: {
                previousLocation: "loginRegister",
                accessToken: res.data.accessToken,
                refreshToken: res.data.refreshToken,
              },
            });
            setIsLoggedIn(true);
            setIsLoadingReposne(false);
          }
        }
      });
  };

  return (
    <Stack distribution="fill" alignment="center" vertical spacing="loose">
      <Stack vertical distribution="fill" spacing="tight">
        <Stack vertical distribution="fill" spacing="tight">
          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">
              <i className="pi pi-user"></i>
            </span>
            <InputText
              id="float-input"
              label="credential"
              value={loginCredentialInput}
              onChange={(e) => setLoginCredentialInput(e.target.value)}
              size="30"
            />
          </div>

          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">
              <i class="pi pi-lock"></i>
            </span>
            <Password
              label="password"
              value={loginPasswordInput}
              onChange={(e) => setLoginPasswordInput(e.target.value)}
              size="30"
              feedback={false}
            />
          </div>
        </Stack>

        <Button
          className="p-button-raised Login-loginButton"
          label="LOGIN"
          onClick={() => {
            login(loginCredentialInput, loginPasswordInput);
          }}
        />

        <Stack vertical alignment="center" distribution="fillEvenly">
          <span>
            <a href="">Forgot password?</a>
          </span>
        </Stack>
      </Stack>

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

      {isLoggedIn && <p>Successfully logged in !</p>}
    </Stack>
  );
};
