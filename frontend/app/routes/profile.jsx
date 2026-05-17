import { useOutletContext } from "react-router";
import UserInfo from "../components/user-info";
import UserProfile from "../components/user-profile";
import DataProfile from "../components/data-profile";
import { dateFormat, extractISOYYYYMMDDFromDate, formatGender, formatHeight, formatTime, formatWeight } from "../utils/utils";
import { useCalories } from "../hooks/useCalories";
import { useRestDays } from "../hooks/useRestDays";

export default function Profil() {
  // https://reactrouter.com/api/hooks/useOutletContext
  const { profile, statistics } = useOutletContext();
  const dateFromTo = {
    from: extractISOYYYYMMDDFromDate(profile.createdAt),
    to: extractISOYYYYMMDDFromDate(new Date())
  }
  const burnedCalories = useCalories(dateFromTo);
  const restDays = useRestDays(dateFromTo);
  const formatedTime = formatTime(statistics.totalDuration);

  return (
    <main className="profil">
      <div className="user-info-panel">
        <UserInfo
          profilePicture={profile.profilePicture}
          createdAt={profile.createdAt}
          name={`${profile.firstName} ${profile.lastName}`}
        />

        <UserProfile
          age={profile.age}
          gender={formatGender(profile.gender)}
          height={formatHeight(profile.height)}
          weight={formatWeight(profile.weight)}
        />
      </div>
      <div className="user-stats-panel">
        <h2>Vos statistiques</h2>
        <p>depuis le {dateFormat(profile.createdAt)}</p>

        <div className="user-stats">
          <DataProfile
            title="Temps total couru"
            primaryText={`${formatedTime.hours}h`}
            secondaryText={`${formatedTime.minutes}min`}
          />

          <DataProfile
            title="Calories brûlées"
            primaryText={burnedCalories.loading ? `n/a` : burnedCalories.data}
            secondaryText={`cal`}
          />

          <DataProfile
            title="Distance totale parcourue"
            primaryText={statistics.totalDistance}
            secondaryText={`km`}
          />

          <DataProfile
            title="Nombre de jours de repos"
            primaryText={restDays.loading ? `n/a` : restDays.data}
            secondaryText={`jours`}
          />

          <DataProfile
            title="Nombre de sessions"
            primaryText={statistics.totalSessions}
            secondaryText={`sessions`}
          />

        </div>
      </div>
    </main>
  );
}