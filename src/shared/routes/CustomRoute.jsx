import React from "react";
import identities from "../../api/identities";
import { Route, useHistory, Redirect } from "react-router-dom";
import { LoginRegister } from "../../pages";

export default function CustomRoute({ permission = null, title, ...rest }) {
  const history = useHistory();
  let token;

  if (localStorage.accessToken !== undefined) {
    token = localStorage.accessToken;
  } else {
    return <Redirect to="loginRegister" />;
  }
  if (permission !== null) {
    identities
      .decodeToken(token)
      .then((decodedTokenResponse) => {
        if (decodedTokenResponse !== null) {
          let currentTime = new Date().getTime() / 1000;
          if (currentTime > decodedTokenResponse.data.exp) {
            //TESTIRATI DA LI JE PROLSO 30 MIN , AKO JESTE IZBACIT, AKO NE REFRESH
            return history.push("/loginRegister");
          }
          return <Route {...rest} />;
        } else history.push("/loginRegister");
      })
      .catch((err) => {
        console.log(err);
        return <Redirect to="/loginRegister" />;
      });
  }

  return <Route {...rest} />;
}
