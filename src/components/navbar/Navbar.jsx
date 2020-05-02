import React, { useState } from "react";
import { Link, withRouter, useHistory } from "react-router-dom";
import "./Navbar.scss";
import { InputText } from "primereact/inputtext";
import { AutoComplete } from "primereact/autocomplete";
import users from "../../api/users";
import { Stack } from "../../elements/stack/Stack";
import { Button } from "primereact/button";
import { Sidebar } from "primereact/sidebar";
import Avatar from "./../avatar/Avatar";
import { Card } from "../../elements/card/Card";
import podium from "../../assets/icons/podium.svg";
import social from "../../assets/icons/social.svg";
import statistics from "../../assets/icons/statistics.svg";
import SideNav, {
  Toggle,
  Nav,
  NavItem,
  NavIcon,
  NavText,
} from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";

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

  const [selectedSidebarTab, setSelectedSidebarTab] = useState("");
  const handleSidebarSelect = (selected) => {
    setSelectedSidebarTab(selected);
    history.push(`/${selected}`);
  };
  console.log(selectedSidebarTab);
  return (
    <div className="NavbarContainer">
      <Stack alignment="center" distribution="fill">
        <SideNav className="Navbar-Sidebar">
          <SideNav.Toggle />
          <SideNav.Nav
            defultSelected={selectedSidebarTab}
            onSelect={(selected) => {
              handleSidebarSelect(selected);
            }}
          >
            <NavItem eventKey="profile">
              <NavIcon>
                <i className="fas fa-address-card Navbar-Sidebar--Item--Icon" />
              </NavIcon>
              <NavText>
                <p className="Navbar-Sidebar--Item--Label">Profile</p>
              </NavText>
            </NavItem>
            <NavItem eventKey="records">
              <NavIcon>
                <i className="fab fa-elementor Navbar-Sidebar--Item--Icon" />
              </NavIcon>
              <NavText>
                <p className="Navbar-Sidebar--Item--Label">Records</p>
              </NavText>
            </NavItem>
            <NavItem eventKey="statistics">
              <NavIcon>
                <i className="fas fa-chart-bar Navbar-Sidebar--Item--Icon" />
              </NavIcon>
              <NavText>
                <p className="Navbar-Sidebar--Item--Label">Statistics</p>
              </NavText>
            </NavItem>
            <NavItem eventKey="leaderboards">
              <NavIcon>
                <i className="fa fa-group Navbar-Sidebar--Item--Icon" />
              </NavIcon>
              <NavText>
                <p className="Navbar-Sidebar--Item--Label">Leaderboards</p>
              </NavText>
            </NavItem>
          </SideNav.Nav>
        </SideNav>

        <div className="SearchBar">
          <AutoComplete
            value={searchUserInput}
            suggestions={suggestionsList}
            completeMethod={(e) => filterCountrySingle(e)}
            field="username"
            size={50}
            placeholder="Search other users..."
            minLength={1}
            onChange={(e) => setSearchUserInput(e.value)}
            itemTemplate={userTemplate}
          />
        </div>

        <Stack distribution="trailing" alignment="center">
          <div className="UserProfile">
            <Stack spacing="extraTight" alignment="center">
              {/* <p> {userData.username}</p> */}
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
