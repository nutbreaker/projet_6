/**
 * Displays a specific user profile data metric.
 * 
 * @param {Object} props - The component props.
 * @param {string} props.title - The title of the metric.
 * @param {string|number} props.primaryText - The main value to display.
 * @param {string} props.secondaryText - The secondary text or unit.
 * @returns {JSX.Element}
 */
export default function DataProfile({title, primaryText, secondaryText}){
    return (
        <div className="data-profil">
            <h3>{title}</h3>
            <p>{primaryText} <span>{secondaryText}</span></p>
        </div>
    );
}