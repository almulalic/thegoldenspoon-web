import React, { useState } from "react";
import { Link, withRouter, useHistory } from "react-router-dom";
import "./Navbar.scss";
import { InputText } from "primereact/inputtext";
import { AutoComplete } from "primereact/autocomplete";
import users from "../../api/users";
import { Stack } from "../../elements/stack/Stack";

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
  };

  const userTemplate = (user) => {
    return (
      <div
        className="p-clearfix DrowdownTemplate"
        onClick={() => {
          handleProifleRedirect(user.id);
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

  return (
    <div className="NavbarContainer">
      <div className="Logo"></div>

      <div className="SearchBar">
        <AutoComplete
          value={searchUserInput}
          suggestions={suggestionsList}
          completeMethod={(e) => filterCountrySingle(e)}
          field="username"
          size={30}
          placeholder="Search other users..."
          minLength={1}
          onChange={(e) => setSearchUserInput(e.value)}
          itemTemplate={userTemplate}
        />
      </div>
      <div className="UserProfile">
        {userData.username}
        <img
          className="icon"
          src="https://cdn2.iconfinder.com/data/icons/avatar-profile/458/avatar_contact_starwars_user_default_mickey-512.png"
          alt=""
        />
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
    </div>
  );
};
