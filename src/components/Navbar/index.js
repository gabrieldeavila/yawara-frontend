import { ReactComponent as Tail } from "../../assets/img/tail.svg";
import { GiHamburgerMenu, BiSearchAlt, IoClose } from "react-icons/all";
import React, { useContext, useRef, useState, useEffect } from "react";
import { Context } from "../../Contexts/GlobalContext";
import usePosition from "../../states/Position";
import useTheme from "../../states/Theme";
import TagsFilter from "../TagsFilter";
import Options from "../Options";
import Popup from "../Popup";
import useMobile from "../../states/Mobile";
import { AiFillSetting, AiOutlineClose } from "react-icons/ai";
import { useHistory } from "react-router";

export default function Navbar({
  placeholder = "Digite Algo",
  image,
  description,
  type,
  ...props
}) {
  const [searchBarMobile, setSearchBarMobile] = useState(false);

  const { showSidebar, setShowSidebar } = useContext(Context);
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef("");
  const { bottom, left } = usePosition(popupRef);

  const [isActive, setIsActive] = useState(false);
  const filterRef = useRef("");
  const { bottom: bottomFilter, left: leftFilter } = usePosition(filterRef);

  const isMobile = useMobile(990, true);
  const theme = useTheme(false, true);

  const [searchTerm, setSearchTerm] = useState("");

  const history = useHistory();

  const handleSearch = (e) => {
    // depois tem q realizar a pesquisa de tags quando usuário clicar no ícone de pesquisa
    if (searchTerm) {
      if (type === "client") history.push(`/search/${searchTerm}`);
      else history.push(`/admin/search/${searchTerm}`);
    }
  };

  const searchBar = (show = true) => {
    return (
      <div className="navbar-center">
        {show && (
          <>
            <div className="navbar-center-search">
              <input
                autoComplete="off"
                type="text"
                id="search"
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.which === 13 && handleSearch()}
                value={searchTerm}
                placeholder={placeholder}
              />
              <span className="search-icon">
                <BiSearchAlt onClick={handleSearch} />
              </span>
            </div>
            {type === "client" && (
              <div className="navbar-center-filter">
                <button
                  ref={filterRef}
                  onClick={(e) => setIsActive(!isActive)}
                  className={`btn-shake ${isActive ? "isBtnSearchActive" : ""}`}
                >
                  Filtrar Tags
                </button>
                {isActive && (
                  <Popup
                    className="btn-shake"
                    setPopup={setIsActive}
                    bottom={bottomFilter}
                    left={leftFilter}
                    colorVar={"blue"}
                    colorClose="green"
                    svgMarginLeft="14.6rem"
                    width="30rem"
                  >
                    <TagsFilter />
                  </Popup>
                )}
              </div>
            )}
          </>
        )}
      </div>
    );
  };
  return (
    <div className="navbar">
      <div className="navbar-container">
        {!searchBarMobile || !isMobile ? (
          <>
            <div className="navbar-left">
              {isMobile && (
                <div className="navbar-left-icon control-sidebar-visibility">
                  {!showSidebar ? (
                    <GiHamburgerMenu
                      onClick={() => setShowSidebar(true)}
                      className="control-sidebar-visibility"
                    />
                  ) : (
                    <IoClose />
                  )}
                </div>
              )}
              <div className="navbar-left-name">
                <Tail />
                <h1>Yawara</h1>
              </div>
            </div>
            {searchBar(!isMobile)}
            <div className="navbar-right">
              {isMobile && (
                <BiSearchAlt
                  className="open-search-bar"
                  onClick={() => setSearchBarMobile(true)}
                />
              )}
              <div
                ref={popupRef}
                className={`navbar-right-user ${
                  type === "client"
                    ? "navbar-right-client"
                    : "navbar-right-admin"
                }`}
              >
                {type === "client" ? (
                  <img
                    onClick={(e) => setShowPopup(!showPopup)}
                    className="navbar-right-user-img"
                    src={image}
                    alt={description}
                  />
                ) : !showPopup ? (
                  <AiFillSetting onClick={(e) => setShowPopup(!showPopup)} />
                ) : (
                  <AiOutlineClose />
                )}
              </div>
              {showPopup && (
                <Popup
                  className="navbar-right-user-img"
                  setPopup={setShowPopup}
                  bottom={bottom}
                  left={left}
                  colorClose={theme[0][1] === "light" ? "white" : "dark"}
                  colorVar={"green"}
                >
                  <Options type={type} setPopup={setShowPopup} theme={theme} />
                </Popup>
              )}
            </div>
          </>
        ) : (
          <div className="navbar-search_bar-mobile">
            {searchBar()}
            <div className="navbar-search_bar-mobile-close">
              <IoClose onClick={() => setSearchBarMobile(false)} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
