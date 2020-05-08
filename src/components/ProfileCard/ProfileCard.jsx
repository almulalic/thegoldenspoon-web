import React from "react";
import "./ProfileCard.scss";
import { Stack } from "../../elements/stack/Stack";

export const ProfileCard = (props) => {
  const { firstName, middleName, lastName, username } = props.user;
  return (
    <div class="card">
      <div class="card-header">
        <strong class="card-title mb-3">User</strong>
      </div>
      <div class="card-body">
        <Stack alignment="center" spacing="none" vertical>
          <img
            src={require("../../assets/avatars/defaultAvatar.jpg")}
            alt="John Doe"
            className="Profile-Card Avatar"
          />
          <h5 class="text-sm-center mt-2 mb-1">
            {" "}
            {firstName + " " + (middleName ?? "") + lastName}
          </h5>
          <div class="location text-sm-center">
            <i class="fas fa-user"></i> {username}
          </div>
        </Stack>
        <hr />
        <div class="card-text text-sm-center">
          <a href="#">
            <i class="fa fa-facebook pr-1"></i>
          </a>
          <a href="#">
            <i class="fa fa-twitter pr-1"></i>
          </a>
          <a href="#">
            <i class="fa fa-linkedin pr-1"></i>
          </a>
          <a href="#">
            <i class="fa fa-pinterest pr-1"></i>
          </a>
        </div>
      </div>
    </div>
  );
};
