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
import { BrowserRouter, Route, Switch, Router } from "react-router-dom";
import CustomRoute from "./CustomRoute";
import { connect } from "react-redux";
import createHistory from "history/createBrowserHistory";
const Routes = (props) => {
  const history = createHistory();

  return (
    <div className="Content-wrap">
      <Switch>
        <CustomRoute
          permission={[1, 2]}
          exact
          title="Profile"
          path="/profile"
          component={Profile}
        />
        <CustomRoute
          permission={[1, 2]}
          exact
          title="Profile"
          path="/profile/:username"
          component={Profile}
        />
        <CustomRoute
          exact
          title="Confrim Account"
          path="/accountConfirmation/:token"
          component={AccountConfirmation}
        />
        <CustomRoute
          exact
          title="Forgot Password"
          path="/forgotPassword"
          component={ForgotPassword}
        />
        <CustomRoute
          exact
          title="Reset Password"
          path="/resetPassword"
          component={ResetPassword}
        />
        <CustomRoute
          exact
          title="Resend Confirmation Mail"
          path="/resetConfirmationMail"
          component={ResetConfirmationMail}
        />
      </Switch>
    </div>
  );
};

export default Routes;
