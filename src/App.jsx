import React, { useEffect } from "react";
import "./App.scss";
import { Router, Route, Switch, BrowserRouter } from "react-router-dom";
import {
  Profile,
  LoginRegister,
  AccountConfirmation,
  LoginRedirect,
  ForgotPassword,
  ResetPassword,
  ResetConfirmationMail,
} from "./pages";
import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import Routes from "./shared/routes/Routes";
import createHistory from "history/createBrowserHistory";
import "./assets/styles/main.scss";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App(props) {
  const history = createHistory();

  return (
    <div className="App custom">
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <Router history={history}>
        <Switch>
          <Route exact path="/" component={LoginRegister} />
          <Route exact path="/loginRegister" component={LoginRegister} />
          <Route exact path="/loginRedirect" component={LoginRedirect} />
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
          <Route exact path="" component={Routes} />
          <Route path="/" render={() => <div>404</div>} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
