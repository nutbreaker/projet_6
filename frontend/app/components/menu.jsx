import { NavLink } from "react-router";

/**
 * Renders the main navigation menu.
 * 
 * @returns {JSX.Element}
 */
export default function Menu() {

    return (
        <nav className="menu">
            <ul>
                <li><NavLink to="/dashboard">Dashboard</NavLink></li>
                <li><NavLink to="/profil">Mon profil</NavLink></li>
                <li>|</li>
                <li><NavLink
                    to="/"
                    className="logout-link"
                    onClick={() => localStorage.removeItem("token")}
                >Se déconnecter</NavLink></li>
            </ul>
        </nav>
    );
}