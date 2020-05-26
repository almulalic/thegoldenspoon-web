import React, { useState, useEffect } from "react";
import { SidebarItem } from "./sidebarItem/SidebarItem";
import { useHistory } from "react-router-dom";
import { ProgressSpinner } from "primereact/progressspinner";
import "./Sidebar.scss";

export const Sidebar = () => {
  let history = useHistory();
  let userData = JSON.parse(localStorage.getItem("user"));

  return (
    <aside className="menu-sidebar2">
      <div className="logo">
        <img src={require("../../assets/pictures/logo.svg")} alt="John Doe" />
        <h3>The golden spoon</h3>
      </div>
      <div className="menu-sidebar2__content js-scrollbar1">
        {userData.length === 0 ? (
          <ProgressSpinner />
        ) : (
          <div className="account2">
            <div className="image img-cir img-120">
              <img
                src={require("../../assets/avatars/defaultAvatar.jpg")}
                alt="John Doe"
              />
            </div>
            <h4 className="name">
              {userData.firstName +
                " " +
                (userData.middleName ?? "") +
                userData.lastName}
            </h4>
            <h5>{userData.username}</h5>
          </div>
        )}
        <nav className="navbar-sidebar2">
          <ul className="list-unstyled navbar__list">
            <SidebarItem text="Profile" icon="fas fa-address-card" />
            <SidebarItem text="Statistics" icon="fas fa-chart-bar" />
            <SidebarItem text="Leaderboards" icon="fa fa-group" />
            <SidebarItem
              text="Restaurant Manager"
              icon="fas fa-server"
              pageLink="restaurantManager"
            />
          </ul>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <a
              href="#"
              onClick={() => {
                localStorage.clear();
                history.push("/loginRegister");
              }}
            >
              Sign out
            </a>
          </div>
        </nav>
      </div>
    </aside>
  );
};
