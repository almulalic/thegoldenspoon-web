import React from "react";

const UserData = (props) => {
  return (
    <div>
      <p>IME: {props.name}</p>
      <p>Prezime: {props.surname}</p>
      <p>Zanimanje: {props.zanimanje}</p>
    </div>
  );
};

export default UserData;
