import { Outlet, useLoaderData, redirect, NavLink } from "react-router";
import LogoLink from "../components/logo-link";
import Menu from "../components/menu";
import { apiClient } from "../services/apiClient";

export async function clientLoader() {
    const token = localStorage.getItem('token');

    if (!token) {
        throw redirect("/");
    }

    try {
        const user = await apiClient('/api/user-info');

        return user;
    } catch (error) {
        localStorage.removeItem('token');

        throw redirect("/");
    }
}

export default function Layout() {
    const user = useLoaderData();

    return (
        <>
            <header>
                <LogoLink />
                <Menu />
            </header>
            {/* 
                https://reactrouter.com/api/components/Outlet#context 

            */}
            <Outlet context={user} />

            <footer>
                <ul>
                    <li>&copy; Sportsee Tous drois réservés</li>
                    <li>
                        <NavLink to="/terms">Condition générales</NavLink>
                    </li>
                    <li>
                        <NavLink to="/contact">Contact</NavLink>
                    </li>
                    <li>
                        <NavLink to="/"><img src="img/logo-icon.png" alt="logo" /></NavLink>
                    </li>
                </ul>
            </footer>
        </>
    );
}