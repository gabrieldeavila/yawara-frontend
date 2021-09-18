import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import "../assets/css/index.min.css";
import Account from "../clients/yawara_user/pages/Account";

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/y/account">
          <Account />
        </Route>
      </Switch>
    </Router>
  )
}