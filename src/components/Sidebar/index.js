import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import {
  RiSendPlaneFill,
  BsBookmarkFill,
  RiCompassFill,
} from "react-icons/all";
import useMobile from "../../states/Mobile";
import { Context } from "../../Contexts/GlobalContext";
import { useEffect } from "react";
import useClickOutside from "../../states/ClickOutside";
import { useRef } from "react";

export default function Sidebar() {
  const mobileRef = useRef(null);
  const { showSidebar, setShowSidebar } = useContext(Context);
  const fixedSidebar = useMobile(990, false);
  const mobileClickOutside = useClickOutside(
    mobileRef,
    "control-sidebar-visibility",
    setShowSidebar
  );

  return (
    <div
      ref={mobileRef}
      className={`trans-1 sidebar ${
        showSidebar || fixedSidebar ? "show-sidebar" : "hide-sidebar"
      }`}
    >
      <div className="sidebar-content">
        <NavLink to="/new-history" className="sidebar-icon">
          <RiSendPlaneFill />
          <span>Nova História</span>
        </NavLink>

        <NavLink to="/my-histories" className="sidebar-icon">
          <BsBookmarkFill />
          <span>Minhas Histórias</span>
        </NavLink>

        <NavLink to="/explore" className="sidebar-icon">
          <RiCompassFill />
          <span>Explorar</span>
        </NavLink>
      </div>
    </div>
  );
}
