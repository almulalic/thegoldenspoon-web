import React from "react";
import { defaultAvatar } from "../../assets/avatars/defaultAvatar.jpg";
import "./Avatar.scss";

const Avatar = (avatar, size) => {
  return (
    <div className="Avatar-Frame">
      <img
        className="Avatar-Image"
        src={require("../../assets/avatars/defaultAvatar.jpg")}
      />
    </div>
  );
};

export default Avatar;
