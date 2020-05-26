import React from "react";
import {
  Profile,
  Statistics,
  Leaderboards,
  Records,
  LoginRegister,
  LoginRedirect,
  AccountConfirmation,
  ForgotPassword,
  ResetPassword,
  ResetConfirmationMail,
  EditProfile,
  RestaurantManager,
  Page404,
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
          title="Records"
          path="/records"
          component={Records}
        />
        <CustomRoute
          permission={[1, 2]}
          exact
          title="Records"
          path="/records/:username"
          component={Records}
        />

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
          title="Edit Profile"
          path="/editProfile"
          component={EditProfile}
        />

        <CustomRoute
          permission={[1, 2]}
          exact
          title="Statistics"
          path="/statistics"
          component={Statistics}
        />

        <CustomRoute
          permission={[1, 2]}
          exact
          title="Leaderboards"
          path="/leaderboards"
          component={Leaderboards}
        />

        <CustomRoute
          permission={[1, 2]}
          exact
          title="Restaurant Manager"
          path="/restaurantManager"
          component={RestaurantManager}
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

        <CustomRoute
          title="Resend Confirmation Mail"
          path="/"
          component={Page404}
        />
      </Switch>
    </div>
  );
};

export default Routes;
