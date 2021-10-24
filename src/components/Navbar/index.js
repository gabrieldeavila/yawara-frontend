import { ReactComponent as Tail } from "../../assets/img/tail.svg";
import { GiHamburgerMenu, BiSearchAlt, IoClose } from "react-icons/all";
import React, { useContext, useRef, useState } from "react";
import { Context } from "../../Contexts/GlobalContext";
import usePosition from "../../states/Position";
import useTheme from "../../states/Theme";
import TagsFilter from "../TagsFilter";
import Options from "../Options";
import Popup from "../Popup";
import useMobile from "../../states/Mobile";

export default function Navbar({
  placeholder = "Digite Algo",
  image = "https://mundoconectado.com.br/uploads/chamadas/rickastley.jpg",
  description = "never gonna give you up",
}) {
  const { showSidebar, setShowSidebar } = useContext(Context);
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef("");
  const { bottom, left } = usePosition(popupRef);

  const [isActive, setIsActive] = useState(false);
  const filterRef = useRef("");
  const { bottom: bottomFilter, left: leftFilter } = usePosition(filterRef);

  const showHamburguer = useMobile(990, true);
  const theme = useTheme(false, true);
  return (
    <div className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          {showHamburguer && (
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
        <div className="navbar-center">
          <div className="navbar-center-search">
            <input
              autoComplete="off"
              type="text"
              id="search"
              placeholder={placeholder}
            />
            <span className="search-icon">
              <BiSearchAlt onClick={() => console.log("uhum")} />
            </span>
          </div>
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
                bottom={bottomFilter - 8}
                left={leftFilter}
                colorVar={"blue"}
                svgMarginLeft="14.6rem"
                width="30rem"
              >
                <TagsFilter />
              </Popup>
            )}
          </div>
        </div>
        <div className="navbar-right">
          <div ref={popupRef} className="navbar-right-user">
            <img
              onClick={(e) => setShowPopup(!showPopup)}
              className="navbar-right-user-img"
              src={image}
              alt={description}
            />
          </div>
          {showPopup && (
            <Popup
              className="navbar-right-user-img"
              setPopup={setShowPopup}
              bottom={bottom - 4}
              left={left}
              colorVar={"green"}
            >
              <Options setPopup={setShowPopup} theme={theme} />
            </Popup>
          )}
        </div>
      </div>
    </div>
  );
}
