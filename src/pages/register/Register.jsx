import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import identities from "../../api/identities";
import { Stack } from "../../elements/stack/Stack";

const Register = (props) => {
  const [nameInput, setNameInput] = useState("");

  const handleClick = () => {
    reg();
  };
  const reg = () => {
    identities
      .register({
        firstName: "Almir",
        lastName: "Mulalic",
        bornOn: "19980919",
        username: "mulaKingg",
        email: "frontendtest",
        password: "test",
      })
      .then((res) => {
        console.log(res.status);
      });
  };

  return (
    <div>
      <InputText
        value={nameInput}
        onChange={(e) => setNameInput({ value: e.target.value })}
      />
      <Button label="Register" onClick={() => reg()} />
    </div>
  );
};

export default Register;
