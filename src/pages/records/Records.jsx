import React, { useState, useEffect } from "react";
import { Navbar, RestaurantRecords } from "../../components/index";
import "./Records.scss";
import users from "../../api/users";
import { ProgressSpinner } from "primereact/progressspinner";
import { Redirect } from "react-router-dom";
import { Card } from "../../elements/card/Card";
import { Stack } from "../../elements/stack/Stack";
import Avatar from "../../components/avatar/Avatar";
import { Page } from "../../elements/page/Page";

export const Records = (props) => {
  return (
    <Page padding="none" marginFix>
      <div className="Records-MainContainer">
        <div className="Records-Restaurants ">
          <RestaurantRecords props={props} />
        </div>
      </div>
    </Page>
  );
};
