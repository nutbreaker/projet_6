import { index, layout, route } from "@react-router/dev/routes";

// https://reactrouter.com/start/framework/routing
export default [
    index("routes/login.jsx"),
    layout("_layout/layout.jsx", [
        route("dashboard", "routes/dashboard.jsx"),
        route("profil", "routes/profile.jsx"),
    ]),
];
