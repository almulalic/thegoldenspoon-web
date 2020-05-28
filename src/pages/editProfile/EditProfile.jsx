import React, { useState, useEffect, useCallback } from "react";
import { Page } from "./../../elements/page/Page";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Stack } from "../../elements/stack/Stack";
import users from "../../api/users";
import { ProgressSpinner } from "primereact/progressspinner";
import { Dropdown } from "primereact/dropdown";
import CountriesData from "../../shared/json/countriesList.json";
import { Button } from "primereact/button";
import { BorderCard } from "./../../elements/borderCard/BorderCard";
import "./EditProfile.scss";
import Avatar from "react-avatar-edit";
import { InputMask } from "primereact/inputmask";
import moment from "moment";

export const EditProfile = () => {
  const [userData, setUserData] = useState({
    id: 0,
    firstName: "",
    middleName: null,
    lastName: "",
    username: "",
    bornOn: "",
    sex: 0,
    adress: null,
    avatar: null,
    email: "",
    coutnryId: "",
    countryName: "",
  });

  const [isLoadingData, setIsLoadingData] = useState(true);

  const genderSelectItems = [
    { label: "Male", value: 0 },
    { label: "Female", value: 1 },
    { label: "Rather not say", value: 2 },
  ];

  const fetchUserData = () => {
    users
      .fetchUser()
      .then((userResponseData) => {
        setUserData(userResponseData.data);
        setIsLoadingData(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoadingData(false);
      });
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  const [avatarSource, setAvatarSource] = useState();

  const handleChange = useCallback((newValue, id) => {
    setUserData((prevState) => ({
      ...prevState,
      [id]: newValue,
    }));
  }, []);

  return (
    <Page>
      <Stack distribution="fill">
        <BorderCard title="Personal">
          <div className="EditProfile-InnerCardContent">
            <Stack alignment="left" vertical>
              <span className="p-float-label">
                <InputText
                  id="firstName"
                  label="First Name"
                  value={userData.firstName}
                  onChange={(e) => handleChange(e.target.value, "firstName")}
                  className="EditProfile-FullWidth"
                />

                <label htmlFor="float-input">
                  First Name{" "}
                  <span className="EditProfile-RequiredField">*</span>
                </label>
              </span>
              <span className="p-float-label">
                <InputText
                  id="middleName"
                  label="Middle Name"
                  value={userData.middleName}
                  onChange={(e) => handleChange(e.target.value, "middleName")}
                  className="EditProfile-FullWidth"
                />
                <label htmlFor="float-input">Middle Name </label>
              </span>
              <span className="p-float-label">
                <InputText
                  id="firstName"
                  label="Last Name"
                  value={userData.lastName}
                  onChange={(e) => handleChange(e.target.value, "lastName")}
                  className="EditProfile-FullWidth"
                />
                <label htmlFor="float-input">
                  Last Name <span className="EditProfile-RequiredField">*</span>
                </label>
              </span>
              <span className="p-float-label">
                <InputText
                  id="adress"
                  label="Adress"
                  value={userData.adress}
                  onChange={(e) => handleChange(e.target.value, "adress")}
                  className="EditProfile-FullWidth"
                />
                <label htmlFor="float-input">Adress</label>
              </span>

              <InputMask
                id="bornOn"
                label="bornOn"
                mask="99/99/9999"
                placeholder="Birth date (dd/mm/yyyy)"
                value={moment(userData.bornOn.slice(0, 10))
                  .utc()
                  .format("DD/MM/YYYY")}
                onChange={(e) => handleChange(e.target.value, "bornOn")}
                className="EditProfile-FullWidthDropdown"
              />

              <Dropdown
                id="genderDropdown"
                className="EditProfile-FullWidthDropdown"
                placeholder="Select gender"
                label="gender"
                value={userData.sex}
                options={genderSelectItems}
                onChange={(e) => handleChange(e.target.value, "sex")}
              />

              <Dropdown
                id="countryDropdown"
                className="EditProfile-FullWidthDropdown"
                placeholder="Select country"
                label="country"
                value={userData.countryId}
                options={CountriesData}
                onChange={(e) => handleChange(e.target.value, "countryId")}
                filter
                filterPlaceholder="Search by name"
              />
              <p className="EditProfile-RequiredFieldInfo">
                <span className="EditProfile-RequiredField">*</span> - Required
                Field
              </p>
            </Stack>
          </div>
        </BorderCard>

        <BorderCard title="Platform">
          <Stack alignment="left" distribution="fillEvenly" vertical>
            <Stack alignment="center">
              <Avatar
                label="Upload avatar"
                width={150}
                height={150}
                // onCrop={this.onCrop}
                // onClose={this.onClose}
                src={avatarSource}
              />
              {/* <img src={this.state.preview} alt="Preview" /> */}
            </Stack>

            <span className="p-float-label">
              <InputText
                id="email"
                label="Email"
                value={userData.email}
                onChange={(e) => handleChange(e.target.value, "email")}
                className="EditProfile-FullWidth"
              />

              <label htmlFor="float-input">
                Email <span className="EditProfile-RequiredField">*</span>
              </label>
            </span>

            <span className="p-float-label">
              <InputText
                id="username"
                label="Username"
                value={userData.username}
                onChange={(e) => handleChange(e.target.value, "username")}
                className="EditProfile-FullWidth"
              />
              <label htmlFor="float-input">
                Username <span className="EditProfile-RequiredField">*</span>
              </label>
            </span>
            <Button label="Change Password" />

            <Button label="Submit changes" className="EditProfile-FullWith" />

            <p className="EditProfile-RequiredFieldInfo">
              <span className="EditProfile-RequiredField">*</span> - Required
              Field
            </p>
          </Stack>
        </BorderCard>
      </Stack>
    </Page>
  );
};
