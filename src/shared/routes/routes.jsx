import React from "react";
import {
  Profile,
  LoginRegister,
  LoginRedirect,
  AccountConfirmation,
  ForgotPassword,
  ResetPassword,
  ResetConfirmationMail,
} from "../../pages";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import CustomRoute from "./CustomRoute";
import { connect } from "react-redux";

const Routes = (props) => {
  return (
    <div className="Content-wrap">
      <Switch>
        <CustomRoute
          permission={[1, 2]}
          exact
          title="Segments"
          path="/profile"
          component={Profile}
        />

        <CustomRoute
          exact
          title="Segments"
          path="/accountConfirmation/:token"
          component={AccountConfirmation}
        />
        <CustomRoute
          exact
          title="Segments"
          path="/forgotPassword"
          component={ForgotPassword}
        />
        <CustomRoute
          exact
          title="Segments"
          path="/resetPassword"
          component={ResetPassword}
        />
        <CustomRoute
          exact
          title="Segments"
          path="/resetConfirmationMail"
          component={ResetConfirmationMail}
        />
      </Switch>
    </div>
  );
};

export default Routes;
