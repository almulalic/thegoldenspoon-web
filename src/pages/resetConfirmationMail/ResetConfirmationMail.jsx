import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Stack } from "../../elements/stack/Stack";
import { Card } from "primereact/card";
import "./ResetConfirmationMail.css";

export default function ResetConfirmationMail() {
  const footer = (
    <span>
      <Button className="button" label="Submit" />
    </span>
  );
  const [currentEmailInput, setCurrentEmailInput] = useState("");
  const [newEmailInput, setNewEmailInput] = useState("");
  return (
    <div className="main">
      <Stack vertical alignment="center">
        <Card
          className="card"
          footer={footer}
          title="Change confirmation mail?"
          subTitle="Please enter your current and new email"
        >
          <span className="p-float-label">
            <InputText
              id="primaryEmailAdress"
              label="email"
              value={currentEmailInput}
              onChange={(e) => setCurrentEmailInput(e.target.value)}
              size="50"
            />
            <label htmlFor="float-input" className="loginLabel">
              Current email adress
            </label>
          </span>
          <span className="p-float-label">
            <InputText
              id="primaryEmailAdress"
              label="email"
              value={newEmailInput}
              onChange={(e) => setNewEmailInput(e.target.value)}
              size="50"
            />
            <label htmlFor="float-input" className="loginLabel">
              New email adress
            </label>
          </span>
        </Card>
      </Stack>
    </div>
  );
}
