import {  NavLink  } from "react-router-dom"

export const NavBar = () => {
    return (
        <div className="topnav">
            <NavLink to="/" className={({ isActive }) => isActive ? "active" : undefined}> Home</NavLink>
            <NavLink to="/SinglePlayer" className={({ isActive }) => isActive ? "active" : undefined}> SinglePlayer</NavLink>
            <NavLink to="/Multiplayer" className={({ isActive }) => isActive ? "active" : undefined}> Multiplayer</NavLink>
        </div>
    )
}