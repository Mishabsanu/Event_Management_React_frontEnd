import React from "react";
import { Link } from "react-router-dom";
import "./sidebar.scss";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul className="sidebar-nav">
        <li>
          <Link to="/profile/event-orders" className="sidebar-link">
            Event Orders
          </Link>
        </li>
        <li>
          <Link to="/profile/item-orders" className="sidebar-link">
            Item Orders
          </Link>
        </li>
        <li>
          <Link to="/profile/profile-details" className="sidebar-link">
            Profile Details
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
