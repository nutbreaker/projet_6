import { index, layout, route } from "@react-router/dev/routes";

// https://reactrouter.com/start/framework/routing
export default [
    index("routes/login.jsx"),
    layout("_layout/layout.tsx", [
        route("dashboard", "routes/dashboard.tsx"),
        route("profil", "routes/profil.tsx"),
    ]),
];
