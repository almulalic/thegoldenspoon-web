import React from "react";
import "./App.scss";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {
  Profile,
  LoginRegister,
  AccountConfirmation,
  LoginRedirect,
} from "./pages";
import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import ProfileTest from "./pages/profileTest/ProfileTest";
import ForgotPassword from "./pages/forgotPassword/ForgotPassword";
import ResetPassword from "./pages/resetPassword/ResetPassword";
import ResetConfirmationMail from "./pages/resetConfirmationMail/ResetConfirmationMail";

function App(props) {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={LoginRegister} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/loginRegister" component={LoginRegister} />
          <Route exact path="/profileTest" component={ProfileTest} />

          <Route exact path="/loginRedirect/:token" component={LoginRedirect} />
          <Route
            exact
            path="/accountConfirmation/:token"
            component={AccountConfirmation}
          />
          <Route exact path="/forgotPassword" component={ForgotPassword} />
          <Route exact path="/resetPassword" component={ResetPassword} />
          <Route
            exact
            path="/resetConfirmationMail"
            component={ResetConfirmationMail}
          />
          <Route path="/" render={() => <div>404</div>} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
