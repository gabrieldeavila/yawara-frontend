import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import useTheme from "../states/Theme";

import "../assets/css/index.min.css";
import Account from "../clients/yawara_user/pages/Account";
import Explore from "../clients/yawara_user/pages/Explore";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function Routes() {
  const [theme] = useTheme(false, true);

  return (
    <Router>
      <Switch>
        <Route path="/account">
          <Account />
        </Route>

        <>
          <Navbar />
          <Sidebar />
          <div>.</div>
          <div
            className={`yawara-content trans-1 ${
              theme[1] === "dark" ? "bg-dark" : "bg-white"
            }`}
          >
            <Route path="/explore">
              <Explore />
            </Route>
          </div>
        </>
      </Switch>
    </Router>
  );
}
