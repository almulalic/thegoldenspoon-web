import React from "react";
import { defaultAvatar } from "../../assets/avatars/defaultAvatar.jpg";
import "./Avatar.scss";
import restaurants from "../../api/restaurants";

const Avatar = ({ avatar, height, width }) => {
  return (
    <div className="Avatar-Frame">
      <img
        className="Avatar-Image"
        style={{ height: height, width: width }}
        src={require("../../assets/avatars/defaultAvatar.jpg")}
      />
    </div>
  );
};

export default Avatar;
