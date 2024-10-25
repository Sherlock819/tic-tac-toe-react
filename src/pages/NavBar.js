import React, { useState } from 'react';
import { NavLink, useLocation } from "react-router-dom";
import '../css/NavBar.css';  // Updated to include NavBar CSS
import { FaHome, FaRobot, FaUsers, FaBars } from 'react-icons/fa';

export const NavBar = () => {
  const location = useLocation();
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  return (
    <nav className="topnav">
      <div className="menu-icon" onClick={() => setIsNavExpanded(!isNavExpanded)}>
        <FaBars />
      </div>
      <div className={isNavExpanded ? "nav-links show" : "nav-links"}>
        <NavLink to="/" className={({ isActive }) => isActive ? "active" : undefined} end>
          <FaHome /> <span>Home</span>
        </NavLink>
        <NavLink to="/SinglePlayer" className={({ isActive }) => isActive ? "active" : undefined}>
          <FaRobot /> <span>Play vs AI</span>
        </NavLink>
        <NavLink to="/Multiplayer" className={({ isActive }) => 
          isActive || location.pathname.startsWith('/game/') ? "active" : undefined
        }>
          <FaUsers /> <span>Multiplayer</span>
        </NavLink>
      </div>
    </nav>
  );
};
