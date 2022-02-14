import React, { useContext, useEffect } from "react";
import Search from "../clients/yawara_user/pages/Search";
import MyHistories from "../clients/yawara_user/pages/MyHistories";
import Profile from "../clients/yawara_user/pages/Profile";
import NewHistory from "../clients/yawara_user/pages/NewHistory";
import View from "../components/View";
import useTheme from "../states/Theme";
import Explore from "../clients/yawara_user/pages/Explore";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import NotFound from "../components/404";
import { Context } from "../Contexts/GlobalContext";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
  useHistory,
} from "react-router-dom";
import axios from "axios";

const Client = () => {
  const [theme] = useTheme(false, true);
  const {
    showModal,
    bearerToken,
    reload,
    user,
    setUser,
    searchImage,
    setImage,
    image,
    hideNavbar,
    hideSidebar,
  } = useContext(Context);
  const history = useHistory();

  useEffect(async () => {
    if (user?.admin) {
      history.push("/admin/");
      window.location.reload();
    }

    if (
      (searchImage && user?.admin === null && user?.nickname !== null) ||
      reload === "atualizou"
    )
      await axios({
        method: "get",
        url: "http://127.0.0.1:8000/api/profile",
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      })
        .then((response) => {
          setImage(response.data.success.img);
          if (reload === "atualizou") {
            setUser(response.data.success.user.nickname);
          }
        })
        .catch(() => {});
    else if (user?.nickname === null) history.push("/finish-register");
  }, [bearerToken, searchImage, user, reload]);

  return (
    <div>
      <>
        {user?.nickname !== null && (
          <>
            {!hideNavbar && (
              <Navbar
                type="client"
                image={image}
                description={user?.nickname}
              />
            )}
            {!hideSidebar && <Sidebar type="client" />}

            <div
              className={`yawara trans-1 ${
                theme[1] === "dark" ? "bg-dark" : "bg-white"
              } ${showModal ? "yawara-expanded" : ""}`}
            >
              <div className="yawara-content">
                <Switch>
                  <Route exact path="/explore">
                    <Explore />
                  </Route>
                  <Route exact path="/view/:id">
                    <View />
                  </Route>
                  <Route exact path="/search/:search_term">
                    <Search />
                  </Route>
                  <Route exact path="/new-history">
                    <NewHistory />
                  </Route>
                  <Route exact path="/profile">
                    <Profile />
                  </Route>
                  <Route exact path="/my-histories">
                    <MyHistories />
                  </Route>
                  <Route path="*">
                    <NotFound />
                  </Route>
                </Switch>
              </div>
            </div>
          </>
        )}
      </>
    </div>
  );
};

export default Client;
