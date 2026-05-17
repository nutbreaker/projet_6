import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import "./app.css";
import LogoLink from "./components/logo-link";


// refer to https://reactrouter.com/start/framework/route-module#links
export const links = () => [
  { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
  // { rel: 'stylesheet', href: 'https://unpkg.com/open-props' },
];

// refer to https://reactrouter.com/start/framework/route-module#meta
export const meta = () => [
  { charSet: 'utf-8' },
  { name: 'viewport', content: 'width=device-width, initial-scale=1' },
];

/** 
 * @param {{ children: React.ReactNode }} props
 * 
 * @links https://reactrouter.com/api/framework-conventions/root.tsx#layout-export
 * */
export function Layout({ children }) {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>

        {children}

        <ScrollRestoration />
        {/* 
          without this HRM won't work. This doesn't seem to be mentioned in the documentation.
          refer to https://reactrouter.com/api/components/Scripts
        */}
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({
  error,
}) {
  return (
    <div className="error">
      <LogoLink />
      <h1>{error.status || 500}</h1>
      <p>{error.statusText || "Internal Error"}</p>
    </div>
  )
}