import { useOutletContext } from 'react-router';
import UserInfo from '../components/user-info';
import DistanceChart from '../components/distance-chart';
import HeartRateChart from '../components/heart-rate-chart';
import GoalChart from '../components/goal-chart';
import MetricCard from '../components/metric-card';
import { getWeekRange } from '../utils/utils';
import { useWeekGoal } from '../hooks/useWeekGoal';
import { useMonthlyActivity } from '../hooks/useMonthlyActivity';
import { useWeeklyHeartRate } from '../hooks/useWeeklyHeartRate';

export default function Dashboard({ loaderData }) {
  const token = localStorage.getItem('token');
  // https://reactrouter.com/api/hooks/useOutletContext
  const { profile, statistics } = useOutletContext();
  // The API doesn't return the weeklyGoal and the property naming is inconsistent "weeklyGoal" and "goal"
  const weeklySummary = useWeekGoal(getWeekRange(Date.now()), profile.weeklyGoal);
  const navigationDateRange = { from: new Date(profile.createdAt), to: new Date() };

  return (
    <main className="dashboard">
      <div className="dashboard-header">
        <UserInfo
          profilePicture={profile.profilePicture}
          createdAt={profile.createdAt}
          name={`${profile.firstName} ${profile.lastName}`}
        />

        <div className="dashboard-achievement">
          <p>Distance totale parcourue</p>

          <div className="achievement">
            <img src="img/achievement-icon.svg" alt="Achievment" />
            <p>{statistics.totalDistance} km</p>
          </div>
        </div>
      </div>

      <div className="latest-performance">
        <h2>Vos dernières performances</h2>

        <div className="latest-performance-content">
          <DistanceChart dataPromise={useMonthlyActivity} navigationDateRange={navigationDateRange} />
          <HeartRateChart dataPromise={useWeeklyHeartRate} navigationDateRange={navigationDateRange} />
        </div>
      </div>

      <div className="this-week">
        <h2>Cette semaine</h2>

        {weeklySummary.loading ? (
          <p>Loading...</p>
        ) : (<>
          <p className="week-range">{weeklySummary.data.range}</p>
          <div className="this-week-content">
            <GoalChart data={weeklySummary.data} />

            <div className="week-metrics">
              <MetricCard
                title="Durée d'activité"
                value={weeklySummary.data.duration}
                unit="minutes"
                mainColor="#0B23F4"
                secondaryColor="#B6BDFC"
              />
              <MetricCard
                title="Calories Distance"
                value={weeklySummary.data.distance}
                unit="kilomètres"
                mainColor="#F7481F"
                secondaryColor="#FDCAC4"
              />
            </div>
          </div></>)}
      </div>
    </main>
  );
}
