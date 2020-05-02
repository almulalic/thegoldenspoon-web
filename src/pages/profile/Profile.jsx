import React, { useState, useEffect } from "react";
import { Page } from "./../../elements/page/Page";
import users from "../../api/users";
import { ProgressSpinner } from "primereact/progressspinner";
import { Card } from "../../elements/card/Card";

export const Profile = (props) => {
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
    <Page padding="none">
      {isLoadingProfileData ? (
        <ProgressSpinner />
      ) : noUserError ? (
        <div>
          <Card>
            We couln't find a user with nickname {props.match.params.username}{" "}
          </Card>
        </div>
      ) : (
        <div>{userData.firstName}</div>
      )}
    </Page>
  );
};
