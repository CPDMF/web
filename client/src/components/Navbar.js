import React, { useState, useContext } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { SidebarDataAssociate } from "./SidebarDataAssociate";
import { SidebarDataCha } from "./SidebarDataCha";
import { SidebarDataCouncil } from "./SidebarDataCouncil";
import { SidebarDataPro } from "./SidebarDataPro";
import { SidebarDataSec } from "./SidebarDataSec";
import { SidebarDataStudent } from "./SidebarDataStudent";

import "./Navbar.css";

import { IconContext } from "react-icons";
import * as MdIcons from "react-icons/md";

import progileImg from "../imgs/p3.jpg";
import progileImgSec from "../imgs/p4.jpeg";
import progileImgCha from "../imgs/char.jpeg";
import progileImgCouncil from "../imgs/council.jpeg";
import { AuthContext } from "../helpers/AuthContext";
import { useHistory } from "react-router-dom";

function Navbar() {
  let history = useHistory();
  const { authState, setAuthState } = useContext(AuthContext);
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({
      fname: "",
      lname: "",
      progileImg: "",
      role: "",
      id: 0,
      status: false,
    });
    history.push("/");
  };
  const image =
    "http://localhost:3001/uploads/profileImages/" + authState.profileImage;
  if (authState.role == "associate") {
    return (
      <>
        <div className="buttons">
          <button className="Logout" onClick={logout}>
            Logout
          </button>
          <div className="panal">
            <Link to="/profileInfor" className="settings">
              <FaIcons.FaUserAlt />
            </Link>
          </div>
        </div>

        <IconContext.Provider value={{ color: "#fff" }}>
          <div className="navbar">
            <Link to="#" className="menu-bars">
              <FaIcons.FaBars onClick={showSidebar} />
            </Link>
          </div>
          <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
            <div className="navbar">
              <Link to="#" className="menu-bars-collaps">
                <FaIcons.FaBars onClick={showSidebar} />
              </Link>
            </div>
            <ul className="nav-menu-items" onClick={showSidebar}>
              <li className="navbar-toggle">
                <div className="profile">
                  <div className="profileImg">
                    {image && <img src={image} alt="Image" className="pic" />}
                  </div>
                  <div className="profileDetails">
                    <h2>{authState.fname}</h2>

                    <p>{authState.role}</p>
                  </div>
                </div>
              </li>

              {SidebarDataAssociate.map((item, index) => {
                return (
                  <li key={index} className={item.cName}>
                    <Link to={item.path}>
                      {item.icon}
                      <span className="navbar-span-cls">{item.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </IconContext.Provider>
      </>
    );
  } else if (authState.role == "professional") {
    return (
      <>
        <div className="buttons">
          <button className="Logout" onClick={logout}>
            Logout
          </button>
          <div className="panal">
            <Link to="/profileInfor" className="edit">
              <FaIcons.FaUserAlt />
            </Link>
          </div>
        </div>

        <IconContext.Provider value={{ color: "#fff" }}>
          <div className="navbar">
            <Link to="#" className="menu-bars">
              <FaIcons.FaBars onClick={showSidebar} />
            </Link>
          </div>
          <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
            <div className="navbar">
              <Link to="#" className="menu-bars-collaps">
                <FaIcons.FaBars onClick={showSidebar} />
              </Link>
            </div>
            <ul className="nav-menu-items" onClick={showSidebar}>
              <li className="navbar-toggle">
                <div className="profile">
                  <div className="profileImg">
                    {image && <img src={image} alt="Image" className="pic" />}
                  </div>
                  <div className="profileDetails">
                    <h2>{authState.fname}</h2>
                    <p>{authState.role}</p>
                  </div>
                </div>
              </li>

              {SidebarDataPro.map((item, index) => {
                return (
                  <li key={index} className={item.cName}>
                    <Link to={item.path}>
                      {item.icon}
                      <span className="navbar-span-cls">{item.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </IconContext.Provider>
      </>
    );
  } else if (authState.role == "student") {
    return (
      <>
        <div className="buttons">
          <button className="Logout" onClick={logout}>
            Logout
          </button>
          <div className="panal">
            <Link to="/profileInfor" className="settings">
              <FaIcons.FaUserAlt />
            </Link>
          </div>
        </div>

        <IconContext.Provider value={{ color: "#fff" }}>
          <div className="navbar">
            <Link to="#" className="menu-bars">
              <FaIcons.FaBars onClick={showSidebar} />
            </Link>
          </div>
          <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
            <div className="navbar">
              <Link to="#" className="menu-bars-collaps">
                <FaIcons.FaBars onClick={showSidebar} />
              </Link>
            </div>
            <ul className="nav-menu-items" onClick={showSidebar}>
              <li className="navbar-toggle">
                <div className="profile">
                  <div className="profileImg">
                    {image && <img src={image} alt="Image" className="pic" />}
                  </div>
                  <div className="profileDetails">
                    <h2>{authState.fname}</h2>

                    <p>{authState.role}</p>
                  </div>
                </div>
              </li>

              {SidebarDataStudent.map((item, index) => {
                return (
                  <li key={index} className={item.cName}>
                    <Link to={item.path}>
                      {item.icon}
                      <span className="navbar-span-cls">{item.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </IconContext.Provider>
      </>
    );
  } else if (authState.role == "chartered") {
    return (
      <>
        <div className="buttons">
          <button className="Logout" onClick={logout}>
            Logout
          </button>
          <div className="panal">
            <Link to="/profileInfor" className="settings">
              <FaIcons.FaUserAlt />
            </Link>
          </div>
        </div>

        <IconContext.Provider value={{ color: "#fff" }}>
          <div className="navbar">
            <Link to="#" className="menu-bars">
              <FaIcons.FaBars onClick={showSidebar} />
            </Link>
          </div>
          <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
            <div className="navbar">
              <Link to="#" className="menu-bars-collaps">
                <FaIcons.FaBars onClick={showSidebar} />
              </Link>
            </div>
            <ul className="nav-menu-items" onClick={showSidebar}>
              <li className="navbar-toggle">
                <div className="profile">
                  <div className="profileImg">
                    {image && <img src={image} alt="Image" className="pic" />}
                  </div>
                  <div className="profileDetails">
                    <h2>{authState.fname}</h2>

                    <p>{authState.role}</p>
                  </div>
                </div>
              </li>

              {SidebarDataCha.map((item, index) => {
                return (
                  <li key={index} className={item.cName}>
                    <Link to={item.path}>
                      {item.icon}
                      <span className="navbar-span-cls">{item.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </IconContext.Provider>
      </>
    );
  } else if (authState.role == "council") {
    return (
      <>
        <div className="buttons">
          <button className="Logout" onClick={logout}>
            Logout
          </button>
          <div className="panal">
            <Link to="/profileInfor" className="settings">
              <FaIcons.FaUserAlt />
            </Link>
          </div>
        </div>

        <IconContext.Provider value={{ color: "#fff" }}>
          <div className="navbar">
            <Link to="#" className="menu-bars">
              <FaIcons.FaBars onClick={showSidebar} />
            </Link>
          </div>
          <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
            <div className="navbar">
              <Link to="#" className="menu-bars-collaps">
                <FaIcons.FaBars onClick={showSidebar} />
              </Link>
            </div>
            <ul className="nav-menu-items" onClick={showSidebar}>
              <li className="navbar-toggle">
                <div className="profile">
                  <div className="profileImg">
                    {image && <img src={image} alt="Image" className="pic" />}
                  </div>
                  <div className="profileDetails">
                    <h2>{authState.fname}</h2>

                    <p>{authState.role}</p>
                  </div>
                </div>
              </li>

              {SidebarDataCouncil.map((item, index) => {
                return (
                  <li key={index} className={item.cName}>
                    <Link to={item.path}>
                      {item.icon}
                      <span className="navbar-span-cls">{item.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </IconContext.Provider>
      </>
    );
  } else if (authState.role == "secretariat") {
    return (
      <>
        <div className="buttons">
          <button className="Logout" onClick={logout}>
            Logout
          </button>
          <div className="panal">
            <Link to="/profileInfor" className="settings">
              <FaIcons.FaUserAlt />
            </Link>
          </div>
        </div>

        <IconContext.Provider value={{ color: "#fff" }}>
          <div className="navbar">
            <Link to="#" className="menu-bars">
              <FaIcons.FaBars onClick={showSidebar} />
            </Link>
          </div>
          <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
            <div className="navbar">
              <Link to="#" className="menu-bars-collaps">
                <FaIcons.FaBars onClick={showSidebar} />
              </Link>
            </div>
            <ul className="nav-menu-items" onClick={showSidebar}>
              <li className="navbar-toggle">
                <div className="profile">
                  <div className="profileImg">
                    {image && <img src={image} alt="Image" className="pic" />}
                  </div>
                  <div className="profileDetails">
                    <h2>{authState.fname}</h2>

                    <p>{authState.role}</p>
                  </div>
                </div>
              </li>

              {SidebarDataSec.map((item, index) => {
                return (
                  <li key={index} className={item.cName}>
                    <Link to={item.path}>
                      {item.icon}
                      <span className="navbar-span-cls">{item.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </IconContext.Provider>
      </>
    );
  }
}

export default Navbar;
