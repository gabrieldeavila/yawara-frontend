import { createContext, useState, useEffect } from "react";
import _ from "lodash";
import axios from "axios";

export const Context = createContext("");

export default function GlobalContext({ children }) {
  const [showModal, setShowModal] = useState(false);
  const [hideNavbar, setHideNavbar] = useState(false);
  const [hideSidebar, setHideSidebar] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [reload, setReload] = useState(false);
  const [user, setUser] = useState(null);
  const [searchImage, setSearchImage] = useState(null);
  const defaultURL = "http://127.0.0.1:8000/";
  const [image, setImage] = useState(null);

  const [bearerToken, setBearerToken] = useState(null);
  const [filterChanged, setFilterChanged] = useState(false);

  useEffect(async () => {
    if (
      _.isNull(bearerToken) &&
      !_.isNull(localStorage.getItem("bearerToken"))
    ) {
      setBearerToken(localStorage.getItem("bearerToken"));
    }

    if (!_.isNull(bearerToken)) {
      localStorage.setItem("bearerToken", bearerToken);
    }
  }, [bearerToken]);

  return (
    <Context.Provider
      value={{
        showModal,
        setShowModal,
        showSidebar,
        setShowSidebar,
        bearerToken,
        setBearerToken,
        reload,
        setReload,
        user,
        searchImage,
        setSearchImage,
        setUser,
        image,
        setImage,
        defaultURL,
        hideNavbar,
        setHideNavbar,
        hideSidebar,
        setHideSidebar,
        filterChanged,
        setFilterChanged,
      }}
    >
      {children}
    </Context.Provider>
  );
}
