import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import {
  RiSendPlaneFill,
  BsBookmarkFill,
  RiCompassFill,
} from "react-icons/all";
import { Context } from "../../Contexts/GlobalContext";

export default function Sidebar() {
  const { showModal } = useContext(Context);

  return (
    <div className={`trans-1 sidebar ${showModal ? "expanded" : ""}`}>
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
