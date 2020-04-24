import React from "react";
import "./App.scss";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Profile, LoginRegister } from "./pages";
import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import ProfileTest from "./pages/profileTest/ProfileTest";

function App(props) {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Profile} />
          <Route exact path="/loginRegister" component={LoginRegister} />
          <Route exact path="/profileTest" component={ProfileTest} />
          <Route path="/" render={() => <div>404</div>} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
