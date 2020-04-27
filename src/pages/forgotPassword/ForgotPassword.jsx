import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Stack } from "../../elements/stack/Stack";
import { Card } from "primereact/card";
import "./ForgotPassword.scss";

export const ForgotPassword = () => {
  const footer = (
    <span>
      <Button className="button" label="Submit" />
    </span>
  );
  const [forgetPasswordEmailInput, setForgotPasswordInput] = useState("");

  return (
    <div className="main">
      <Stack vertical alignment="center">
        <Card
          className="card"
          footer={footer}
          title="Forgot your password?"
          subTitle="Please enter your email for a password reset"
        >
          <span className="p-float-label">
            <InputText
              id="primaryEmailAdress"
              label="email"
              value={forgetPasswordEmailInput}
              onChange={(e) => setForgotPasswordInput(e.target.value)}
              size="50"
            />
            <label htmlFor="float-input" className="loginLabel">
              Primary email adress
            </label>
          </span>
        </Card>
      </Stack>
    </div>
  );
};
