import CountiresData from "../../shared/json/countriesList.json";
import { ProgressSpinner } from "primereact/progressspinner";
import { Stack } from "../../elements/stack/Stack";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Dropdown } from "primereact/dropdown";
import identities from "../../api/identities";
import { Message } from "primereact/message";
import { Captcha } from "primereact/captcha";
import { Button } from "primereact/button";
import React, { useState } from "react";
import "./Register.scss";

export const Register = () => {
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
  const [isRegisteringUser, setIsRegisteringUser] = useState(false);

  // ERROR HANDLING PRE-API
  const [emptyFieldsError, setEmptyFieldsError] = useState(false);
  const [invalidEmailTypeError, setInvalidEmailTypeError] = useState(false);
  const [passwordDontMatchError, setPasswordDontMatchError] = useState(false);
  const [passwordNotStrongError, setPasswordNotStrongError] = useState(false);
  const [emailNotUniqueError, setEmailNotUniqueError] = useState(false);
  const [usernameNotUniqueError, setUsernameNotUniqueError] = useState(false);

  // ERROR HANDLING POST-API
  const [notUniqueError, setNotUniqueError] = useState(false);
  const [internalServerError, setInternalServerError] = useState(false);
  const [registerConfirmationError, setRegisterConfirmationError] = useState(
    false
  );

  // SUCCESSFULL STATES
  const [registrationSuccessfull, setRegistrationSuccessfull] = useState(false);
  const [registrationMessage, setRegistrationMessage] = useState("");

  const handleErrorClear = () => {
    setEmptyFieldsError(false);
    setInvalidEmailTypeError(false);
    setPasswordDontMatchError(false);
    setPasswordNotStrongError(false);
    setEmailNotUniqueError(false);
    setUsernameNotUniqueError(false);
    setNotUniqueError(false);
    setRegistrationSuccessfull(false);
    setInternalServerError(false);
    setRegisterConfirmationError(false);
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
    setIsRegisteringUser(true);
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
      .then((response) => {
        console.log(response);
        handleErrorClear();
        switch (response.data.status) {
          case 1:
            setNotUniqueError(true);
            break;
          case 2:
            setRegistrationSuccessfull(true);
            setRegisterConfirmationError(false);
            setRegistrationMessage(
              "Successfully registered, check your email to proceed !"
            );
            break;
          case 3:
            setRegistrationSuccessfull(true);
            setRegisterConfirmationError(true);
            setRegistrationMessage(
              "Successfully registered but we failed to send confirmation email. Please try to resend it "
            );
            break;
          default:
            setInternalServerError(true);
            break;
        }
        setIsRegisteringUser(false);
      })
      .catch((err) => {
        handleErrorClear();
        setInternalServerError(true);

        setIsRegisteringUser(false);
        console.log(err);
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
          setEmailNotUniqueError(true);
          setIsValidatingFormData(false);
          return;
        } else {
          identities
            .isUniqueUsername(usernameInput)
            .then((response) => {
              if (response.data !== 1) {
                handleErrorClear();
                setUsernameNotUniqueError(true);
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
  };

  return (
    <Stack distribution="fill" alignment="center" vertical spacing="tight">
      <Stack distribution="fill" alignment="center">
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
          <label htmlFor="float-input">Last Name</label>
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

      <Stack vertical distribution="fill" spacing="tight">
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

        <Stack distribution="fill">
          <Dropdown
            id="genderDropdown"
            className="registerDropdown genderDropdown"
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
            className="registerDropdown countryDropdown"
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

        <Stack vertical distribution="fill">
          <Captcha
            siteKey="ASTAKVIRULLAH"
            onResponse={() => console.log("a")}
          />

          <Button
            className="p-button-raised"
            disabled={isValidatingFormData}
            onClick={() => {
              ValidateForm();
            }}
            className="registerButton"
            label="REGISTER"
          />
        </Stack>
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

      <div>
        {emptyFieldsError ? (
          <Message severity="error" text="You must fill out every field" />
        ) : invalidEmailTypeError ? (
          <Message severity="error" text="Invalid email format" />
        ) : emailNotUniqueError ? (
          <Message
            severity="error"
            text="Account with that email already exists"
          />
        ) : usernameNotUniqueError ? (
          <Message severity="error" text="Username already exists" />
        ) : passwordDontMatchError ? (
          <Message severity="error" text="Password's doesen't match" />
        ) : null}
      </div>

      <div>
        {notUniqueError ? (
          <Message severity="error" text="User must be unique !" />
        ) : (
          internalServerError && (
            <Message
              severity="error"
              text={
                "Internal server error. If this persists please contact your administrator "
              }
            />
          )
        )}

        {registrationMessage !== "" && (
          <div>
            {registerConfirmationError ? (
              <Message severity="warning" text={registrationMessage} />
            ) : (
              <Message severity="success" text={registrationMessage} />
            )}
          </div>
        )}
      </div>
    </Stack>
  );
};
