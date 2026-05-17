/**
 * Renders the application logo wrapped in a link to the homepage (dashboard).
 * 
 * @returns {JSX.Element}
 */
export default function LogoLink() {
    return (
        <h1 className="logo-link">
            <a href="/dashboard">
                <img src="img/logo.png" alt="logo" />
            </a>
        </h1>
    );
}