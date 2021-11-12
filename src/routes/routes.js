import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
} from "react-router-dom";
import useTheme from "../states/Theme";
import ScrollToTop from "./scrollToTop";
import { Context } from "../Contexts/GlobalContext";

import "../assets/css/index.min.css";

//common user
import Account from "../clients/yawara_user/pages/Account";
import Explore from "../clients/yawara_user/pages/Explore";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import View from "../components/View";
import NewHistory from "../clients/yawara_user/pages/NewHistory";
import Profile from "../clients/yawara_user/pages/Profile";
import MyHistories from "../clients/yawara_user/pages/MyHistories";
import { useEffect } from "react";
import FinishRegistration from "../clients/yawara_user/pages/FinishRegistration";
import PasswordReset from "../clients/yawara_user/pages/PasswordReset";

//admin user
import AdminAccount from "../clients/Admin/pages/Account";
import TagsManagement from "../clients/Admin/pages/TagsManagement";
import KeepUsers from "../clients/Admin/pages/KeepUsers";
import SelectUser from "../clients/Admin/pages/SelectUser";

export default function Routes(props) {
  const { showModal } = useContext(Context);
  const [theme] = useTheme(false, true);

  useEffect(() => {
    document.body.style.background =
      theme[1] === "dark" ? "var(--black)" : "var(--white)";
  }, [theme]);

  return (
    <Router>
      <ScrollToTop />

      <Switch>
        <Route path="/account">
          <Account />
        </Route>
        <Route path="/finish-registration">
          <FinishRegistration />
        </Route>
        <Route path="/password-reset">
          <PasswordReset />
        </Route>

        <Route path="/admin/account">
          <AdminAccount />
        </Route>
        {window.location.pathname.split("/")[1] === "admin" ? (
          <>
            <Navbar type="admin" />
            <Sidebar type="admin" />
            <div
              className={`yawara trans-1 ${
                theme[1] === "dark" ? "bg-dark" : "bg-white"
              } ${showModal ? "yawara-expanded" : ""}`}
            >
              <div className="yawara-content">
                <Route path="/admin/tags-management">
                  <TagsManagement />
                </Route>

                <Route path="/admin/keep-users">
                  <KeepUsers />
                </Route>

                <Route path="/admin/select-user">
                  <SelectUser />
                </Route>
              </div>
            </div>
          </>
        ) : (
          <>
            <Navbar type="client" />
            <Sidebar type="client" />
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
        )}
      </Switch>
    </Router>
  );
}
