import React, { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import identities from "../../api/identities";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { InputMask } from "primereact/inputmask";
import { Dropdown } from "primereact/dropdown";
import { Stack } from "../../elements/stack/Stack";
import { Card } from "primereact/card";
import CountiresData from "../../shared/json/countriesByAbbreviation.json";
import { Message } from "primereact/message";
import { Captcha } from "primereact/captcha";
import "./Register.scss";
import { ProgressSpinner } from "primereact/progressspinner";

export default function Register() {
  // MAIN STATES
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [confirmPasswordInput, setConfirmPasswordInput] = useState("");
  const [usernameInput, setUsernameInput] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedCountry, setSelectedCity] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [surnameInput, setSurnameInput] = useState("");
  const [adressInput, setAdressInput] = useState("");
  const [dateInput, setDateInput] = useState("");

  const genderSelectItems = [
    { label: "Male", value: 0 },
    { label: "Female", value: 1 },
    { label: "Rather not say", value: 2 },
  ];

  // LOADING STATES
  const [isValidatingFormData, setIsValidatingFormData] = useState(false);

  // ERROR HANDLING
  const [emptyFieldsError, setEmptyFieldsError] = useState(false);
  const [invalidEmailTypeError, setInvalidEmailTypeError] = useState(false);
  const [passwordDontMatchError, setPasswordDontMatchError] = useState(false);
  const [passwordNotStrongError, setPasswordNotStrongError] = useState(false);
  const [emailNotUnique, setEmailNotUnique] = useState(false);
  const [usernameNotUnique, setUsernameNotUnique] = useState(false);

  const handleErrorClear = () => {
    setEmptyFieldsError(false);
    setInvalidEmailTypeError(false);
    setPasswordDontMatchError(false);
    setPasswordNotStrongError(false);
    setEmailNotUnique(false);
    setUsernameNotUnique(false);
  };

  const isUniqueEmail = () => {
    identities
      .isUniqueEmail(emailInput)
      .then((response) => {
        if (response == 1) return 1;
        else return 0;
      })
      .catch((err) => {
        console.log(err);
        return 0;
      });
  };

  const isUniqueUsername = () => {
    identities
      .isUniqueUsername(usernameInput)
      .then((response) => {
        if (response == 1) return 1;
        else return 0;
      })
      .catch((err) => {
        console.log(err);
        return 0;
      });
  };

  const checkEmail = (email) => {
    return /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
      email
    );
  };

  // API CALL

  const RegisterUser = () => {
    identities
      .register({
        firstName: nameInput,
        lastName: surnameInput,
        username: usernameInput,
        email: emailInput,
        password: passwordInput,
        sex: selectedGender,
        country: selectedCountry,
      })
      .then(() => {
        console.log("all gucci");
      })
      .catch(() => {
        console.log("nevalajti nesto");
      });
  };

  const ValidateForm = () => {
    setIsValidatingFormData(true);
    if (
      nameInput.length <= 0 ||
      surnameInput.length <= 0 ||
      emailInput.length <= 0 ||
      passwordInput.length <= 0 ||
      confirmPasswordInput.length <= 0 ||
      usernameInput.length <= 0 ||
      selectedGender === "" ||
      selectedCountry === ""
    ) {
      setEmptyFieldsError(true);
      setIsValidatingFormData(false);
    } else if (!checkEmail(emailInput)) {
      handleErrorClear();
      setInvalidEmailTypeError(true);
      setIsValidatingFormData(false);
      return;
    }

    identities
      .isUniqueEmail(emailInput)
      .then((response) => {
        if (response.data !== 1) {
          handleErrorClear();
          setEmailNotUnique(true);
          setIsValidatingFormData(false);
          return;
        } else {
          identities
            .isUniqueUsername(usernameInput)
            .then((response) => {
              if (response.data !== 1) {
                handleErrorClear();
                setUsernameNotUnique(true);
                setIsValidatingFormData(false);
                return;
              } else {
                handleErrorClear();
                setIsValidatingFormData(false);
              }

              if (passwordInput !== confirmPasswordInput) {
                handleErrorClear();
                setPasswordDontMatchError(true);
                setIsValidatingFormData(false);
                return;
              } else {
                setIsValidatingFormData(false);
                RegisterUser();
              }
            })
            .catch((err) => {
              console.log(err);
              return;
            });
        }
      })
      .catch((err) => {
        console.log(err);
        return;
      });

    // isUniqueEmail
    //   .then((res) => {
    //     if (res !== 1)
    //   })
    //   .finally(() => {
    //     isUniqueUsername.then((res) => {
    //       if (res !== 1) {
    //         handleErrorClear();
    //         setUsernameNotUnique(true);
    //         setIsValidatingFormData(false);
    //       } else if (passwordInput !== confirmPasswordInput) {
    //         handleErrorClear();
    //         setPasswordDontMatchError(true);
    //         setIsValidatingFormData(false);
    //         return;
    //       } else setIsValidatingFormData(false);
    //     });
    //   });

    // }
  };

  return (
    <div className="register">
      <div className="overlay"></div>
      <Stack alignment="center" vertical>
        <h1>Are you new? Come on in</h1>
        <Stack distribution="fillEvenly" alignment="center">
          <span className="p-float-label">
            <InputText
              id="firstName"
              label="name"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              size="16"
            />
            <label htmlFor="float-input">Name</label>
          </span>
          <span className="p-float-label">
            <InputText
              id="lastName"
              label="surname"
              value={surnameInput}
              onChange={(e) => setSurnameInput(e.target.value)}
              size="16"
            />
            <label htmlFor="float-input">Surname</label>
          </span>
        </Stack>

        <span className="p-float-label">
          <InputText
            id="email"
            label="email"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            size="40"
          />
          <label htmlFor="float-input">Email</label>
        </span>

        <span className="p-float-label">
          <InputText
            id="username"
            label="username"
            value={usernameInput}
            onChange={(e) => setUsernameInput(e.target.value)}
            size="40"
          />
          <label htmlFor="float-input">Username</label>
        </span>

        <Stack vertical distribution="fill">
          <span className="p-float-label">
            <Password
              id="password"
              label="password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              size="40"
            />
            <label htmlFor="float-input">Password</label>
          </span>
          <span className="p-float-label">
            <Password
              id="password"
              label="password"
              value={confirmPasswordInput}
              onChange={(e) => setConfirmPasswordInput(e.target.value)}
              size="40"
              feedback={false}
            />
            <label htmlFor="float-input">Confirm password</label>
          </span>
        </Stack>
        {/* <InputMask
        mask="99/99/9999"
        placeholder="Birth date (dd/mm/yyyy)"
        label="date"
        value={dateInput}
        onChange={(e) => setDateInput({ value: e.value })}
        size="40"
      ></InputMask>

      <div className="register">
        <InputText
          placeholder="Adress"
          label="adress"
          value={adressInput}
          onChange={(e) => setAdressInput(e.target.value)}
          size="40"
        />
      </div> */}
        <Stack vertical>
          <Stack distribution="fillEvenly" alignment="center">
            <Dropdown
              id="genderDropdown"
              className="dropdown"
              placeholder="Select gender"
              label="gender"
              value={selectedGender}
              options={genderSelectItems}
              onChange={(e) => {
                setSelectedGender(e.value);
              }}
            />

            <Dropdown
              id="countryDropdown"
              className="dropdown"
              placeholder="Select country"
              label="country"
              value={selectedCountry}
              options={CountiresData}
              onChange={(e) => {
                setSelectedCity(e.value);
              }}
              filter
              filterPlaceholder="Search by name"
            />
          </Stack>

          <Captcha
            siteKey="ASTAKVIRULLAH"
            onResponse={() => console.log("a")}
          />
        </Stack>

        <div>
          {emptyFieldsError ? (
            <Message severity="error" text="You must fill out every field" />
          ) : invalidEmailTypeError ? (
            <Message severity="error" text="Invalid email format" />
          ) : emailNotUnique ? (
            <Message
              severity="error"
              text="Account with that email already exists"
            />
          ) : usernameNotUnique ? (
            <Message severity="error" text="Username already exists" />
          ) : passwordDontMatchError ? (
            <Message severity="error" text="Password's doesen't match" />
          ) : null}
        </div>
        <div className="registerButton">
          <Button
            disabled={isValidatingFormData}
            onClick={() => {
              ValidateForm();
            }}
            className="button"
            label="Register"
          />
        </div>
      </Stack>
    </div>
  );
}
