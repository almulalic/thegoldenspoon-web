import React, { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import identities from "../../api/identities";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import "./Login.css";
import { Dropdown } from "primereact/dropdown";
import { InputMask } from "primereact/inputmask";

const Login = (props) => {
  const [loginEmailInput, setLoginEmailInput] = useState("");
  const [registerEmailInput, setRegisterEmailInput] = useState("");
  const [loginPasswordInput, setLoginPasswordInput] = useState("");
  const [registerPasswordInput, setRegisterPasswordInput] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [usernameInput, setUsernameInput] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [surnameInput, setSurnameInput] = useState("");
  const [adressInput, setAdressInput] = useState("");
  const [dateInput, setDateInput] = useState("");

  const login = (email, password) => {
    identities.login({ email: email, password: password }).then((res) => {});
  };
  const register = (
    email,
    name,
    surname,
    username,
    password,
    adress,
    date,
    gender,
    city
  ) => {
    identities
      .register({
        name: name,
        surname: surname,
        date: date,
        email: email,
        username: username,
        password: password,
        gender: gender,
        city: city,
        adress: adress,
      })
      .then((res) => {});
  };
  const genderSelectItems = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
    { label: "Rather not say", value: "RNT" },
  ];
  const citiesSelectItems = [
    { label: "New York", value: "NY" },
    { label: "Rome", value: "RM" },
    { label: "London", value: "LDN" },
    { label: "Istanbul", value: "IST" },
    { label: "Paris", value: "PRS" },
  ];

  return (
    <div className="body">
      <div id="column" className="left">
        <h1>Welcome back!</h1>
        <h1>Please Login</h1>
        <div className="login">
          <InputText
            placeholder="Email"
            label="email"
            value={loginEmailInput}
            onChange={(e) => setLoginEmailInput(e.target.value)}
            size="50"
          />
        </div>
        <div className="login">
          <Password
            placeholder="Password"
            label="password"
            value={loginPasswordInput}
            onChange={(e) => setLoginPasswordInput(e.target.value)}
            size="50"
          />
        </div>
        <div className="login">
          <Button
            className="button"
            label="Login"
            onClick={() => {
              login(loginEmailInput, loginPasswordInput);
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
            id="names"
            placeholder="Name"
            label="name"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            size="16"
          />
          <InputText
            id="names"
            placeholder="Surname"
            label="suename"
            value={surnameInput}
            onChangemailInpute={(e) => setSurnameInput(e.target.value)}
            size="16"
          />
        </div>

        <div className="register">
          <InputMask
            mask="99/99/9999"
            placeholder="Birth date (dd/mm/yyyy)"
            label="date"
            value={dateInput}
            onChange={(e) => setDateInput({ value: e.value })}
            size="40"
          ></InputMask>
        </div>
        <div className="register">
          <InputText
            id="names"
            placeholder="Email"
            label="email"
            value={registerEmailInput}
            onChange={(e) => setRegisterEmailInput(e.target.value)}
            size="16"
          />
          <InputText
            id="names"
            placeholder="Username"
            label="username"
            value={usernameInput}
            onChange={(e) => setUsernameInput(e.target.value)}
            size="16"
          />
        </div>
        <div className="register">
          <Password
            id="names"
            placeholder="Password "
            label="password"
            value={registerPasswordInput}
            onChange={(e) => setRegisterPasswordInput(e.target.value)}
            size="16"
          />
          <Password
            id="names"
            placeholder="Confirm assword "
            label="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            size="16"
          />
        </div>
        <div className="register">
          <InputText
            placeholder="Adress"
            label="adress"
            value={adressInput}
            onChange={(e) => setAdressInput(e.target.value)}
            size="40"
          />
        </div>
        <div className="register">
          <Dropdown
            className="dropdown"
            placeholder="Set gender"
            label="gender"
            value={selectedGender}
            options={genderSelectItems}
            onChange={(e) => {
              setSelectedGender({ gender: e.value });
            }}
          />

          <Dropdown
            className="dropdown"
            placeholder="Select a City"
            label="city"
            value={selectedCity}
            options={citiesSelectItems}
            onChange={(e) => {
              setSelectedCity({ city: e.value });
            }}
          />
        </div>

        <div className="register">
          <Button
            className="button"
            label="Register"
            onClick={() => {
              login(
                registerEmailInput,
                registerPasswordInput,
                usernameInput,
                selectedGender,
                selectedCity,
                nameInput,
                surnameInput,
                adressInput,
                dateInput
              );
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
