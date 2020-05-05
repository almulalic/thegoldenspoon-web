import React, { useState, useEffect } from "react";
import { Page } from "./../../elements/page/Page";
import users from "../../api/users";
import { ProgressSpinner } from "primereact/progressspinner";
import { Card } from "../../elements/card/Card";
import { OverviewItem } from "../../components/overviewItem/OverviewItem";
import { Stack } from "../../elements/stack/Stack";
import "./Profile.scss";
import { RestaurantRecords } from "../../components";

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

  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => {
    setIsLoadingProfileData(true);

    if (props.match.path === "/profile") {
      setIsGuest(false);
    } else {
      setIsGuest(true);
    }
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
        <Stack customClassName="NoTopPadding" vertical padding="normal">
          {isGuest && (
            <div>
              <h1>Welcome to the profile of {userData.username} </h1>
            </div>
          )}
          <Stack distribution="fill">
            <OverviewItem
              version="c1"
              heading="12"
              text="restaurants visited this year"
              icon={"fas fa-utensils"}
            />
            <OverviewItem
              version="c2"
              heading="10"
              text="unqiue menu items"
              icon={"fas fa-archive"}
            />
            <OverviewItem
              version="c3"
              heading="5"
              text="restaurants visited this month"
              icon={"fas fa-utensils"}
            />
          </Stack>
          <RestaurantRecords props={props} />
        </Stack>
      )}
    </Page>
  );
};
