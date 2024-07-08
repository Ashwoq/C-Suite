import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import logoShort from "../Assets/Images/logoShort.png";
import logoTxt from "../Assets/Images/logoTxt.png";
import "./Sidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faHeart,
  faStar,
  faHistory,
  faBook,
  faCog,
  faSignOutAlt,
  faBars,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

function SidebarItem({ icon, text, active, alert, expanded, path }) {
  return (
    <NavLink
      exact
      to={path}
      className={`sidebar-item ${active ? "active" : ""} ${
        expanded ? "expanded" : "collapsed"
      }`}
    >
      <FontAwesomeIcon
        icon={icon}
        className="icon"
        // style={{ margin: expanded ? "" : "auto" }}
        style={{ marginLeft: expanded ? "" : "6px", flex: expanded ? 1 : "" }}
      />
      <span
        className="item-text"
        style={{
          marginLeft: expanded ? "10px" : "",
          flex: expanded ? 6 : 0,
          transform: expanded ? "translateX(0%)" : "translateX(-100%)",
          opacity: expanded ? 1 : 0,
        }}
      >
        {text}
        {/* {expanded ? text : ""} */}
      </span>
    </NavLink>
  );
}

const Sidebar = () => {
  const [expanded, setExpanded] = useState(false);

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <aside className={`sidebar ${expanded ? "expanded" : "collapsed"}`}>
        <nav className="sidebar-nav">
          <div className="sidebar-header">
            {/* <img
              src={expanded ? logo : logoShort}
              className={expanded ? "logo" : "logo-short"}
              alt="Logo"
            /> */}
            <img
              src={expanded ? logoShort : logoShort}
              className={expanded ? "logo-short" : "logo-short"}
              alt="Logo"
            />
            <img
              src={logoTxt}
              className={expanded ? "logo-txt" : "logo-txt"}
              alt="LogoTxt"
            />
          </div>
          <div className="sidebar-menu">
            <button
              className={`sidebar-item ${expanded ? "expanded" : "collapsed"}`}
              style={{
                border: "none",
                outline: "none",
              }}
              onClick={toggleSidebar}
            >
              <FontAwesomeIcon
                icon={expanded ? faChevronLeft : faBars}
                className="icon"
                // style={{ margin: expanded ? "" : "auto" }}
                style={{
                  marginLeft: expanded ? "" : "6px",
                  flex: expanded ? 1 : "",
                }}
              />

              <span
                className="item-text"
                style={{
                  marginLeft: expanded ? "10px" : "",
                  flex: expanded ? 6 : 0,
                  // transform: expanded ? "translateX(0%)" : "translateX(-100%)",
                  opacity: expanded ? 1 : 0,
                }}
              >
                {/* {expanded ? "Hide" : ""} */}
                {"Hide"}
              </span>
            </button>
            <SidebarItem
              path={"./dash"}
              icon={faHome}
              text={"Dashboard"}
              expanded={expanded}
            />
            <SidebarItem
              path={"./Profile"}
              icon={faUser}
              text={"Profile"}
              expanded={expanded}
            />
            <SidebarItem
              icon={faHeart}
              path={"./enrolled"}
              text={"Enrolled"}
              expanded={expanded}
            />
            <SidebarItem
              icon={faBook}
              path={"./Courses"}
              text={"Courses"}
              expanded={expanded}
            />
          </div>
          <div className="menu-bottom">
            <SidebarItem
              icon={faCog}
              path={"./setting"}
              text={"Settings"}
              expanded={expanded}
            />
            <SidebarItem
              icon={faSignOutAlt}
              path={"./logout"}
              text={"Logout"}
              expanded={expanded}
            />
          </div>
        </nav>
      </aside>
      {expanded && <div className="overlay" onClick={toggleSidebar}></div>}
    </>
  );
};

export default Sidebar;
