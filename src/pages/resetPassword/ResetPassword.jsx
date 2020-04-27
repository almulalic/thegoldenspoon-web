import React, { useState } from "react";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Stack } from "../../elements/stack/Stack";
import { Card } from "primereact/card";
import "./ResetPassword.scss";
import identities from "../../api/identities";

export const ResetPassword = () => {
  const [passwordInput, setPasswordInput] = useState("");
  const [confirmPasswordInput, setConfirmPasswordInput] = useState("");
  const footer = (
    <span>
      <Button className="button" label="Submit" />
    </span>
  );

  //ERROR HANDLING
  const [passwordNotStrongError, setPasswordNotStrongError] = useState(false);
  /* for my next trick, I'll be a smart ass that tried to help:
  const handleErrorClear = () => {
  setPasswordDontMatchError(false);
  setPasswordNotStrongError(false);
  };

  const ValidateForm = () => {
    setIsValidatingFormData(true);
    if (
        passwordInput.length <= 0 ||
      confirmPasswordInput.length <= 0 ||
    ){
        
      setEmptyFieldsError(true);
      setIsValidatingFormData(false);
    }else (){
        handleErrorClear();
        return;
    }

    identities{
        if (passwordInput !== confirmPasswordInput) {
            handleErrorClear();
            setPasswordDontMatchError(true);
            setIsValidatingFormData(false);
            return;
          } else {
            setIsValidatingFormData(false);
          }
    }
    */

  return (
    <div className="main">
      <Stack vertical alignment="center">
        <Card
          className="card"
          footer={footer}
          title="Reset your password"
          subTitle="Enter a new password: "
        >
          <span className="p-float-label">
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
          </span>
        </Card>
      </Stack>
    </div>
  );
};
