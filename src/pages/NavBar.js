import React, { useContext, useState } from 'react';
import { NavLink, useLocation } from "react-router-dom";
import { WebSocketContext } from '../contexts/WebSocketContext'; // Import context
import '../css/NavBar.css';  // Updated to include NavBar CSS
import { FaHome, FaRobot, FaUsers, FaBars, FaUserCircle, FaSignOutAlt } from 'react-icons/fa'; // Import user icon

export const NavBar = () => {
  const location = useLocation();
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const { userProfile, isAuthenticated } = useContext(WebSocketContext); // Add isAuthenticated
  const displayName = userProfile?.firstName || (userProfile?.email.split('@')[0]);

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    window.location.reload();
  };

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
          isActive || location.pathname.startsWith('/game/') ? "active" : undefined}>
          <FaUsers /> <span>Multiplayer</span>
        </NavLink>
        {isAuthenticated && (
          <>
            <NavLink to="/profile" className={({ isActive }) => isActive ? "active" : undefined} end>
              <FaUserCircle /> <span>{displayName}</span>
            </NavLink>
            <NavLink to="/logout" className="logout-link" onClick={handleLogout}>
              <FaSignOutAlt /> <span>Logout</span>
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};
