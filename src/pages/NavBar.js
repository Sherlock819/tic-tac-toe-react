import { NavLink, useLocation } from "react-router-dom";
import '../css/NavBar.css';  // Updated to include NavBar CSS

export const NavBar = () => {
  const location = useLocation();

  return (
    <div className="topnav">
      <NavLink to="/" className={({ isActive }) => isActive ? "active" : undefined} end>Home</NavLink>
      <NavLink to="/SinglePlayer" className={({ isActive }) => isActive ? "active" : undefined}>SinglePlayer</NavLink>
      <NavLink to="/Multiplayer" className={({ isActive }) => 
        isActive || location.pathname.startsWith('/game/') ? "active" : undefined
      }>Multiplayer</NavLink>
    </div>
  );
};
