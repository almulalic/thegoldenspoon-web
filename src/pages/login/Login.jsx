import React, { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import identities from "../../api/identities";
import { Password } from "primereact/password";
import { Button } from "primereact/button";

const Login = (props) => {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = (email, password) => {
    identities.login({ email: email, password: password }).then((res) => {
      setIsLoggedIn(res != undefined);
    });
  };

  return (
    <div>
      <InputText
        label="email"
        value={emailInput}
        onChange={(e) => setEmailInput(e.target.value)}
      />
      <Password
        label="password"
        value={passwordInput}
        onChange={(e) => setPasswordInput(e.target.value)}
      />
      <Button
        label="Login"
        onClick={() => {
          login(emailInput, passwordInput);
        }}
      />
      {isLoggedIn ? (
        <p style={{ color: "green" }}>Logged in !</p>
      ) : (
        <p style={{ color: "red" }}>Not logged in !</p>
      )}
    </div>
  );
};

export default Login;
