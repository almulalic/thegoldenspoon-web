import React, { useState } from "react";
import { Link, withRouter, useHistory } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { AutoComplete } from "primereact/autocomplete";
import users from "../../api/users";
import { Stack } from "../../elements/stack/Stack";

import { NavbarMobile } from "./mobile/NavbarMobile";
import "./Navbar.scss";
import { GoldenSpoon } from "../goldenSpoon/GoldenSpoon";
import { SettingsDropdown } from "./../settingsDropdown/SettingsDropdown";

export const Navbar = (props) => {
  const [suggestionsList, setSuggestionsList] = useState([]);
  const [searchUserInput, setSearchUserInput] = useState("");

  const userData = JSON.parse(localStorage.getItem("user"));
  let history = useHistory();

  const filterCountrySingle = (event) => {
    setTimeout(() => {
      let _currentList = [],
        results = [];
      users.fetchAllUsers().then((usersResponse) => {
        _currentList = usersResponse.data;

        results = usersResponse.data.filter((countryId) => {
          return countryId.username
            .toLowerCase()
            .startsWith(event.query.toLowerCase());
        });
        setSuggestionsList(results);
      });
    }, 200);
  };

  const handleProifleRedirect = (username) => {
    history.push(`/profile/${username}`);
    window.location.reload();
  };

  const userTemplate = (user) => {
    return (
      <div
        className="p-clearfix DrowdownTemplate"
        onClick={() => {
          handleProifleRedirect(user.username);
        }}
      >
        <Stack distribution="equalSpacing" alignment="center">
          <img
            className="Flag"
            src={require(`../../assets/flags/${
              user.country.id === "" ? "AL" : user.country.id
            }.png`)}
          />

          <p>[{` ${user.username} `}]</p>
          {" - "}
          <p>{`${user.firstName} ${user.lastName}`}</p>
        </Stack>
      </div>
    );
  };

  const [isUserToolbarActive, setIsUserToolbarActive] = useState(false);
  const [isSpoonPopoverActive, setIsSpoonPopoverActive] = useState(false);

  return (
    <div className="NavbarContainer">
      <NavbarMobile />
      <header className="header-desktop2">
        <div className="section__content section__content--p30">
          <div className="container-fluid">
            <div className="header-wrap2">
              <div className="header-searchBar">
                <AutoComplete
                  value={searchUserInput}
                  suggestions={suggestionsList}
                  completeMethod={(e) => filterCountrySingle(e)}
                  field="username"
                  size={70}
                  placeholder="Search other users..."
                  minLength={1}
                  maxlength={5}
                  onChange={(e) => setSearchUserInput(e.value)}
                  itemTemplate={userTemplate}
                />
              </div>

              <div className="header-button2">
                <div
                  className={`header-button-item has-noti js-item-menu  ${
                    isSpoonPopoverActive ? "show-dropdown" : ""
                  }`}
                >
                  <i
                    className="fa fa-spoon"
                    onClick={() =>
                      setIsSpoonPopoverActive(!isSpoonPopoverActive)
                    }
                  />
                  <div className={`notifi-dropdown js-dropdown `}>
                    {isSpoonPopoverActive && <GoldenSpoon />}
                  </div>
                </div>
                <div className="header-button-item mr-0 js-sidebar-btn">
                  <img
                    src={require("./mickey.png")}
                    style={{ height: "22px", width: "30px" }}
                    onClick={() => {
                      setIsUserToolbarActive(!isUserToolbarActive);
                    }}
                  />
                </div>
                <div
                  className={`
                      setting-menu js-right-sidebar d-none d-lg-block 
                      ${isUserToolbarActive ? "show-sidebar" : ""}`}
                >
                  <SettingsDropdown />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* <div className="SearchBar">
         
        </div>

        <Stack distribution="trailing" alignment="center">
          <div className="UserProfile">
            <Stack spacing="extraTight" alignment="center">
              
            </Stack>
          </div>

          <div className="logout">
            <p
              onClick={() => {
                localStorage.clear();
                history.push("/loginRegister");
              }}
            >
              Logout
            </p>
          </div>
        </Stack> */}
    </div>
  );
};
