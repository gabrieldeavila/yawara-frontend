import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import "../assets/css/index.min.css";
import Account from "../clients/yawara_user/pages/Account";
import Theme from "../states/Theme";
import Explore from "../clients/yawara_user/pages/Explore";

export default function Routes() {
  Theme()

  return (
    <Router>
      <Switch>
        <Route path="/y/account">
          <Account />
        </Route>
        <Route path="/explore">
          <Explore />
        </Route>
      </Switch>
    </Router>
  )
}