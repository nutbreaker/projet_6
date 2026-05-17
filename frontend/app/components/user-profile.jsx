/**
 * Displays the user's basic profile information.
 * 
 * @param {Object} props The component props
 * @param {number|string} props.age The user's age
 * @param {string} props.gender The user's gender
 * @param {string} props.height The user's height
 * @param {string} props.weight The user's weight
 * 
 * @returns {JSX.Element}
 */
export default function UserProfile({ age, gender, height, weight }) {
    return (
        <div className="user-profil">
            <h2>Votre profil</h2>
            <hr />
            <ul>
                <li>Age : {age}</li>
                <li>Genre : {gender}</li>
                <li>Taille : {height}</li>
                <li>Poids : {weight}</li>
            </ul>
        </div>
    );
}