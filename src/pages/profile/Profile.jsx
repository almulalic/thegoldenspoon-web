import React, { useState } from "react";
import UserData from "../../components/userData/UserData";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";

function Profile() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [poruka, setPoruka] = useState();

  function clearUsername() {
    setUsername("");
    setPoruka("Usernaem cleared");
  }

  return (
    <div>
      <div className="p-grid p-dir-col">
        <div className="p-col">
          <InputText
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            placeholder="Username"
          />
          <Button
            label="Clear username"
            onClick={(e) => {
              clearUsername();
            }}
          />
        </div>
        <div className="p-col">
          <Password
            feedback={}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="p-col">
          <Button label="Login" onClick={(e) => {}} />
        </div>
      </div>

      <div>
        <p>{poruka}</p>
      </div>
    </div>
  );
}

export default Profile;
