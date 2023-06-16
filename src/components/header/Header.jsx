import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import "./header.scss";

const Header = ({ type }) => {
  const isLoggedIn = useSelector((state) => state.token !== null);
  const { user } = useSelector(({ user }) => ({ user }));
  const [options, setOptions] = useState({});

  const navigate = useNavigate();
  const location = useLocation();

  const toggleEventAndItem = useCallback(() => {
    setOptions((prevOptions) => ({
      ...prevOptions,
      openOptions: !prevOptions.openOptions,
    }));
  }, []);

  useEffect(() => {
    if (location.pathname === "/eventlist") {
      setOptions((prevOptions) => ({
        ...prevOptions,
        openOptions: false,
      }));
    } else if (location.pathname === "/itemList") {
      setOptions((prevOptions) => ({
        ...prevOptions,
        openOptions: true,
      }));
    }
  }, [location.pathname]);

  const [showSubMenu, setShowSubMenu] = useState(false);

  const toggleSubMenu = useCallback(() => {
    setShowSubMenu((prevState) => !prevState);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showSubMenu &&
        !event.target.closest(".profile-menu") &&
        !event.target.closest(".profile-dropdown")
      ) {
        toggleSubMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSubMenu, toggleSubMenu]);

  return (
    <div className="header">
      <div className={`header-container ${type === "list" ? "list-mode" : ""}`}>
        <div className="header-list">
          <div className="event-List">
            <Link to="/eventlist" className="header-link">
              <div
                className={`header-list-item ${
                  !options.openOptions ? "active" : ""
                }`}
                onClick={toggleEventAndItem}
              >
                <span>EVENT MANAGEMENT</span>
              </div>
            </Link>
            <Link to="/itemList" className="header-link">
              <div
                className={`header-list-item ${
                  options.openOptions ? "active" : ""
                }`}
                onClick={toggleEventAndItem}
              >
                <span>ITEM SUPPLIERS</span>
              </div>
            </Link>
          </div>
        </div>
        <div className="header-profile">
          <div className="profile-menu">
            <div className="profile-name" onClick={toggleSubMenu}>
             
                <img
                  src="https://preview.keenthemes.com/metronic-v4/theme/assets/pages/media/profile/profile_user.jpg"
                  alt="Profile"
                  className="profile-image"
                />
     
              <span>{user?.username.toUpperCase().split("@")[0]}</span>
            </div>
            {showSubMenu && (
              <div className={`profile-dropdown ${showSubMenu ? "open" : ""}`}>
                <Link to="/profile" className="header-link">
                  <div className="menu-item">Profile</div>
                </Link>
                <Link to="/approve-booking" className="header-link">
                  <div className="menu-item">Booking</div>
                </Link>
                <Link to="/non-approved-booking" className="header-link">
                  <div className="menu-item">Non Approved Booking</div>
                </Link>
                <Link to="/paid-orders" className="header-link">
                  <div className="menu-item">Paid Items Transactions</div>
                </Link>
                <Link to="/event-Booking" className="header-link">
                  <div className="menu-item">Event Booking</div>
                </Link>
                <Link to="/non-approved-event-Booking" className="header-link">
                  <div className="menu-item">Non Approved Events Booking</div>
                </Link>
                <Link to="/paid-event-Booking" className="header-link">
                  <div className="menu-item">Paid Events Transactions</div>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
