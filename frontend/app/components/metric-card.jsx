/**
 * Displays a metric card with a title, value, and unit.
 * 
 * @param {Object} props the component props
 * @param {string} props.title the title of the metric
 * @param {string|number} props.value the metric value
 * @param {string} props.unit the unit of the metric
 * @param {string} props.mainColor the primary color for the value
 * @param {string} props.secondaryColor the secondary color for the unit
 * 
 * @returns {JSX.Element}
 */
export default function MetricCard({ title, value, unit, mainColor, secondaryColor}) {
    return (
        <div className="metric-card">
            <h3>{title}</h3>
            <p>
                <span className="metric-value" style={{ color: mainColor }}>{value}</span> 
                <span className="metric-unit" style={{color: secondaryColor}}>{unit}</span>
            </p>
        </div>
    );
}