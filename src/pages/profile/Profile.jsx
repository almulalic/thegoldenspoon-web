import React, { useState, useEffect } from "react";
import { Navbar, RestaurantRecords } from "../../components/index";
import "./Profile.scss";
import users from "../../api/users";
import { ProgressSpinner } from "primereact/progressspinner";
import { Redirect } from "react-router-dom";
import { Card } from "../../elements/card/Card";
import { Stack } from "../../elements/stack/Stack";
import Avatar from "./../../components/avatar/Avatar";

const Profile = (props) => {
  // MAIN STATES
  const [nameInput, setNameInput] = useState("");
  const [userData, setUserData] = useState({
    firstName: null,
    middleName: null,
    lastName: null,
    username: null,
    email: null,
    avatar: null,
    country: null,
    adress: null,
  });

  // LOADING STATES
  const [isLoadingProfileData, setIsLoadingProfileData] = useState(false);

  // ERROR STATES
  const [noUserError, setNoUserError] = useState(false);

  const fetchUserData = async () => {
    users
      .fetchUser(props.match.params.username ?? "")
      .then((userDataResponse) => {
        if (userDataResponse.data.length > 0) {
          setUserData(userDataResponse.data[0]);
          setIsLoadingProfileData(false);
          setNoUserError(false);
        } else {
          setIsLoadingProfileData(false);
          setNoUserError(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    setIsLoadingProfileData(true);
    fetchUserData();
  }, []);

  return (
    <div className="Profile">
      <Navbar />
      {isLoadingProfileData ? (
        <ProgressSpinner />
      ) : noUserError ? (
        <div>
          We could't with a user with username {props.match.params.username}
        </div>
      ) : (
        <div className="Profile-MainContainer">
          <div className="Profile-UserData Profile-Section">
            <Stack vertical alignment="center">
              <h1 className="Profile-UserData--Heading">
                {props.match.params.username ? "Welcome" : "User: "}{" "}
                {userData.username}
              </h1>
              <Avatar />
              <div
                style={{
                  width: "100%",
                  height: "2px",
                  background: "black",
                  content: ".",
                }}
              ></div>
              <Stack>
                <span>
                  <p className="bold">
                    Full name:
                    <span>{userData.firstName + " " + userData.lastName}</span>
                  </p>
                  <p className="bold">
                    Username:<span>{userData.username}</span>
                  </p>
                  <p className="bold">
                    Email :<span>{userData.email}</span>
                  </p>
                </span>
              </Stack>
            </Stack>
          </div>
          <div className="Profile-Restaurants Profile-Section">
            <RestaurantRecords props={props} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
