import { Profile, Register, Login } from "../../pages";
import { Switch } from "react-router-dom";
import React from "react";

const Routes = (props) => {
  let scrollLockManager;
  scrollLockManager = new ScrollLockManager();

  return (
    <div>
      <div className="Content-wrap">
        <BrowserRouter>
          <Route path="/" component={Profile} />
        </BrowserRouter>
      </div>
    </div>
  );
};

export default Routes;
