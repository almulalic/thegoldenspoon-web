import React, { useState } from "react";
import { Link, withRouter, useHistory } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { AutoComplete } from "primereact/autocomplete";
import users from "../../api/users";
import { Stack } from "../../elements/stack/Stack";
import { Button } from "primereact/button";
import { Sidebar } from "../sidebar/Sidebar";
import Avatar from "./../avatar/Avatar";
import { Card } from "../../elements/card/Card";
import podium from "../../assets/icons/podium.svg";
import social from "../../assets/icons/social.svg";
import statistics from "../../assets/icons/statistics.svg";

import { NavbarMobile } from "./mobile/NavbarMobile";
import "./Navbar.scss";

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

        results = usersResponse.data.filter((country) => {
          return country.username
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
        classNameName="p-clearfix DrowdownTemplate"
        onClick={() => {
          handleProifleRedirect(user.username);
        }}
      >
        <Stack distribution="equalSpacing" alignment="center">
          <img
            classNameName="Flag"
            src={require(`../../assets/flags/${
              user.country === "" ? "AL" : user.country
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

  return (
    <div classNameName="NavbarContainer">
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
                <div className="header-button-item has-noti js-item-menu">
                  <i className="zmdi zmdi-notifications"></i>
                  <div className="notifi-dropdown js-dropdown">
                    <div className="notifi__title">
                      <p>You have 3 Notifications</p>
                    </div>
                    <div className="notifi__item">
                      <div className="bg-c1 img-cir img-40">
                        <i className="zmdi zmdi-email-open"></i>
                      </div>
                      <div className="content">
                        <p>You got a email notification</p>
                        <span className="date">April 12, 2018 06:50</span>
                      </div>
                    </div>
                    <div className="notifi__item">
                      <div className="bg-c2 img-cir img-40">
                        <i className="zmdi zmdi-account-box"></i>
                      </div>
                      <div className="content">
                        <p>Your account has been blocked</p>
                        <span className="date">April 12, 2018 06:50</span>
                      </div>
                    </div>
                    <div className="notifi__item">
                      <div className="bg-c3 img-cir img-40">
                        <i className="zmdi zmdi-file-text"></i>
                      </div>
                      <div className="content">
                        <p>You got a new file</p>
                        <span className="date">April 12, 2018 06:50</span>
                      </div>
                    </div>
                    <div className="notifi__footer">
                      <a href="#">All notifications</a>
                    </div>
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
                  <div className="account-dropdown__body">
                    <div className="account-dropdown__item">
                      <a href="#">
                        <i className="zmdi zmdi-account"></i>Account
                      </a>
                    </div>
                    <div className="account-dropdown__item">
                      <a href="#">
                        <i className="zmdi zmdi-settings"></i>Setting
                      </a>
                    </div>
                    <div className="account-dropdown__item">
                      <a href="#">
                        <i
                          className="zmdi zmdi-power"
                          onClick={() => {
                            localStorage.clear();
                            history.push("/loginRegister");
                          }}
                        ></i>
                        Sing out
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* <div classNameName="SearchBar">
         
        </div>

        <Stack distribution="trailing" alignment="center">
          <div classNameName="UserProfile">
            <Stack spacing="extraTight" alignment="center">
              
            </Stack>
          </div>

          <div classNameName="logout">
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
