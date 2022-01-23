import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import useTheme from "../states/Theme";
import ScrollToTop from "./scrollToTop";
import { Context } from "../Contexts/GlobalContext";
import Loading from "../components/Placeholders/loading";
import { loadProgressBar } from "axios-progress-bar";
import "axios-progress-bar/dist/nprogress.css";
import axios from "axios";

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
import FinishRegistration from "../clients/yawara_user/pages/FinishRegistration";
import PasswordReset from "../clients/yawara_user/pages/PasswordReset";
import Search from "../clients/yawara_user/pages/Search";

//admin user
import AdminAccount from "../clients/Admin/pages/Account";
import TagsManagement from "../clients/Admin/pages/TagsManagement";
import KeepUsers from "../clients/Admin/pages/KeepUsers";
import AdminSearch from "../clients/Admin/pages/Search";
import SelectUser from "../clients/Admin/pages/SelectUser";
import ViewUser from "../clients/Admin/pages/ViewUser";

import Client from "./client";

export default function Routes(props) {
  const { showModal, setUser, setSearchImage } = useContext(Context);
  const [theme] = useTheme(false, true);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    document.body.style.background =
      theme[1] === "dark" ? "var(--black)" : "var(--white)";
  }, [theme]);

  useEffect(async () => {
    await axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/isLogged",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("bearerToken")}`,
      },
    })
      .then((response) => {
        setIsReady(true);
        setUser(response.data.success);
        setSearchImage(true);
      })
      .catch(() => {
        if (window.location.pathname.split("/")[1] === "password-reset") {
          return;
        } else if (
          window.location.pathname !== "/account" &&
          window.location.pathname.split("/")[1] !== "admin"
        ) {
          window.location.href = "/account";
        } else if (
          window.location.pathname !== "/admin/account" &&
          window.location.pathname !== "/account"
        ) {
          window.location.href = "/admin/account";
        } else {
          setIsReady(true);
        }
      });
  }, []);

  return (
    <Router>
      {loadProgressBar()}
      <ScrollToTop />
      <Switch>
        <Route path="/password-reset/:token">
          <PasswordReset />
        </Route>

        {isReady ? (
          <>
            <Route path="/account">
              <Account />
            </Route>

            <Route path="/finish-register">
              <FinishRegistration />
            </Route>

            <Route path="/admin/account">
              <AdminAccount />
            </Route>
            {[
              window.location.pathname !== "/admin/account" &&
                window.location.pathname !== "/account",
            ][0] && (
              <>
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

                        <Route path="/admin/search/:search_term">
                          <AdminSearch />
                        </Route>

                        <Route path="/admin/view/:id">
                          <ViewUser />
                        </Route>

                        <Route exact path="/admin/select-user">
                          <SelectUser />
                        </Route>
                      </div>
                    </div>
                  </>
                ) : (
                  <Client></Client>
                )}
              </>
            )}
          </>
        ) : (
          <Loading />
        )}
      </Switch>
    </Router>
  );
}
