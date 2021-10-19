import React, { useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import useTheme from "../states/Theme";
import ScrollToTop from "./scrollToTop";
import { Context } from "../Contexts/GlobalContext";

import "../assets/css/index.min.css";
import Account from "../clients/yawara_user/pages/Account";
import Explore from "../clients/yawara_user/pages/Explore";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import View from "../components/View";
import NewHistory from "../clients/yawara_user/pages/NewHistory";
import Profile from "../clients/yawara_user/pages/Profile";
import MyHistories from "../clients/yawara_user/pages/MyHistories";

export default function Routes() {
  const { showModal } = useContext(Context);
  const [theme] = useTheme(false, true);
  return (
    <Router>
      <ScrollToTop />

      <Switch>
        <Route path="/account">
          <Account />
        </Route>

        <>
          <Navbar />
          <Sidebar />
          <div
            className={`yawara trans-1 ${
              theme[1] === "dark" ? "bg-dark" : "bg-white"
            } ${showModal ? "yawara-expanded" : ""}`}
          >
            <div className="yawara-content">
              <Route path="/explore">
                <Explore />
              </Route>
              <Route path="/view/:id">
                <View />
              </Route>
              <Route path="/new-history">
                <NewHistory />
              </Route>
              <Route path="/profile">
                <Profile />
              </Route>
              <Route path="/my-histories">
                <MyHistories />
              </Route>
            </div>
          </div>
        </>
      </Switch>
    </Router>
  );
}
