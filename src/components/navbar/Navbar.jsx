import React, { useState } from "react";
import { Link, withRouter, useHistory } from "react-router-dom";
import "./Navbar.scss";
import { InputText } from "primereact/inputtext";
import { AutoComplete } from "primereact/autocomplete";
import users from "../../api/users";
import { Stack } from "../../elements/stack/Stack";

import { Button } from "primereact/button";
import { Sidebar } from "primereact/sidebar";

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
        className="p-clearfix DrowdownTemplate"
        onClick={() => {
          handleProifleRedirect(user.username);
        }}
      >
        <Stack distribution="equalSpacing" alignment="center">
          <img
            className="Flag"
            src={require("../../assets/flags/Albania.png")}
          />

          <p>[{` ${user.username} `}]</p>
          {" - "}
          <p>{`${user.firstName} ${user.lastName}`}</p>
        </Stack>
      </div>
    );
  };

  const [sidebarVisible, setSidebarVisible] = useState(false);

  return (
    <div className="NavbarContainer">
      <Stack alignment="center" distribution="fill">
        <Sidebar
          visible={sidebarVisible}
          onHide={(e) => setSidebarVisible(false)}
        >
          Content
        </Sidebar>

        <Button
          label="Menu"
          icon="pi pi-bars"
          className="p-button-secondary"
          onClick={() => setSidebarVisible(true)}
        />
        <Stack>
          <p
            className="logout"
            onClick={() => {
              handleProifleRedirect("");
            }}
          >
            My Profile
          </p>
        </Stack>
        <div className="SearchBar">
          <AutoComplete
            value={searchUserInput}
            suggestions={suggestionsList}
            completeMethod={(e) => filterCountrySingle(e)}
            field="username"
            size="50"
            placeholder="Search other users..."
            minLength={1}
            onChange={(e) => setSearchUserInput(e.value)}
            itemTemplate={userTemplate}
          />
        </div>
        <Stack distribution="trailing" alignment="center">
          <div className="UserProfile">
            <Stack spacing="extraTight" alignment="center">
              <p> {userData.username}</p>
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
        </Stack>
      </Stack>
    </div>
  );
};
