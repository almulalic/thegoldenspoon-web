import React, { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import identities from "../../api/identities";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import "./Login.css";
import { Dropdown } from "primereact/dropdown";

const Login = (props) => {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [usernameInput, setUsernameInput] = useState("");
  const [genderInput, setGender] = useState("");
  const [selectCity, setCity] = useState("");

  const login = (email, password) => {
    identities.login({ email: email, password: password }).then((res) => {});
  };
  const register = (email, username, password) => {
    identities
      .register({
        email: email,
        username: username,
        password: password,
      })
      .then((res) => {});
  };
  const genderSelectItems = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
    { label: "Rather not say", value: "RNT" },
  ];
  const citiesSelectItems = [
    { name: "New York", code: "NY" },
    { name: "Rome", code: "RM" },
    { name: "London", code: "LDN" },
    { name: "Istanbul", code: "IST" },
    { name: "Paris", code: "PRS" },
  ];

  return (
    <div>
      <div id="column" className="left">
        <h1>Welcome back!</h1>
        <h1>Please Login</h1>
        <div className="login">
          <InputText
            label="email"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            size="50"
          />
        </div>
        <div className="login">
          <Password
            label="password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            size="50"
          />
        </div>
        <div className="login">
          <Button
            className="p-button-raised p-button-rounded"
            label="Login"
            onClick={() => {
              login(emailInput, passwordInput);
            }}
          />
        </div>
        <h3>
          <a href="">Forgot password?</a>
        </h3>
      </div>
      <div id="column" className="right">
        <h1>Are you new? Come on in</h1>
        <div className="register">
          <InputText
            placeholder="Email "
            label="email"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            size="40"
          />
        </div>
        <div className="register">
          <InputText
            placeholder="Username "
            label="username"
            value={usernameInput}
            onChange={(e) => setUsernameInput(e.target.value)}
            size="40"
          />
        </div>
        <div className="register">
          <Password
            placeholder="Password "
            label="password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            size="40"
          />
        </div>
        <div className="register">
          <Dropdown
            value={setGender}
            options={genderSelectItems}
            onChange={(e) => {
              setGender({ gender: e.value });
            }}
            placeholder="Set gender"
          />
          <Dropdown
            value={setCity}
            options={citiesSelectItems}
            onChange={(e) => {
              setCity({ city: e.value });
            }}
            placeholder="Select a City"
          />
        </div>
        <div className="register">
          <Button
            className="p-button-raised p-button-rounded"
            label="Login"
            onClick={() => {
              login(emailInput, passwordInput);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
