import React from "react";
import { useHistory } from "react-router-dom";

export const SettingsDropdown = () => {
  const history = useHistory();

  return (
    <div className="account-dropdown__body">
      <div
        className="account-dropdown__item"
        onClick={() => {
          history.push("/editProfile");
        }}
      >
        <p href="#">
          <i className="zmdi zmdi-account" />
          Edit Profile
        </p>
      </div>
      <div className="account-dropdown__item">
        <p>
          <i className="zmdi zmdi-settings" />
          Public Profile Settings
        </p>
      </div>
      <div
        className="account-dropdown__item"
        onClick={() => {
          localStorage.clear();
          history.push("/loginRegister");
        }}
      >
        <p>
          <i className="zmdi zmdi-power"></i>
          Sing out
        </p>
      </div>
    </div>
  );
};
