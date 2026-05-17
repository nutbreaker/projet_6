import { dateFormat } from "../utils/utils";

/**
 * Displays the user's profile picture, name, and membership date.
 * 
 * @param {Object} props the component props
 * @param {string} props.profilePicture the URL of the user's profile picture
 * @param {string} props.name the user's full name
 * @param {string|Date} props.createdAt the user's account creation date
 * 
 * @returns {JSX.Element}
 */
export default function UserInfo({ profilePicture, name, createdAt }) {
    return (
        <div className="user-info">
            <img src={profilePicture} alt={name} />
            <h2>{name}</h2>
            <p>Membre depuis le {dateFormat(createdAt)}</p>
        </div>
    );
}