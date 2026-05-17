import { getWeekRange } from '../utils/utils';
import { apiClient } from './apiClient';


/**
 * Calculates the average heart rate for a given week.
 * 
 * @param {Array} [data=[]] array of daily heart rate data
 * 
 * @returns {number} the weekly average heart rate
 */
const weekAverage = (data = []) => {
    const activeDays = data.filter(d => d.average !== null);
    const weekAverage = activeDays.length > 0
        ? Math.round(activeDays.reduce((acc, d) => acc + d.average, 0) / activeDays.length)
        : 0;

    return weekAverage;
}

/**
 * Groups heart rate data by day of the week.
 * 
 * @param {Array} [data=[]] array of activity data containing heart rates
 * @param {string} startDate the start date of the week range
 * @param {string} endDate the end date of the week range
 * 
 * @returns {Array} formatted daily heart rate statistics
 */
const groupHeartRateByDay = (data = [], startDate, endDate) => {
    const daysInFrench = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
    const dayStats = daysInFrench.map(day => ({
        name: day,
        minBpmSum: 0,
        maxBpmSum: 0,
        avgBpmSum: 0,
        count: 0
    }));

    data
        .filter(activity => activity.date >= startDate && activity.date <= endDate)
        .forEach(activity => {
            const activityDate = new Date(activity.date);
            let dayIndex = activityDate.getDay() - 1;
            if (dayIndex === -1) dayIndex = 6; // Dimanche

            dayStats[dayIndex].minBpmSum += activity.heartRate.min;
            dayStats[dayIndex].maxBpmSum += activity.heartRate.max;
            dayStats[dayIndex].avgBpmSum += activity.heartRate.average;
            dayStats[dayIndex].count += 1;
        });

    return dayStats.map(day => {
        if (day.count === 0) {
            return { name: day.name, min: null, max: null, average: null };
        }
        return {
            name: day.name,
            min: Math.round(day.minBpmSum / day.count),
            max: Math.round(day.maxBpmSum / day.count),
            average: Math.round(day.avgBpmSum / day.count)
        };
    });
};

/**
 * Fetches and computes the weekly heart rate statistics.
 * 
 * @param {Date|string} [referenceDate=new Date()] reference date to compute the week range
 * @param {AbortSignal} [signal] optional abort signal to cancel the request
 * 
 * @returns {Promise<{weekAverage: number, entries: Array}>}
 *
 * @throws {Error} throws when the fetch response is not OK
 */
export async function fetchWeeklyHeartRate(referenceDate = new Date(), signal) {
    const { start, end } = getWeekRange(referenceDate);

    const activities = await apiClient(`/api/user-activity?startWeek=${start}&endWeek=${end}`, { signal });
    const entries = groupHeartRateByDay(activities, start, end);
    const weekAverageData = weekAverage(entries);

    return {
        weekAverage: weekAverageData,
        entries
    };
}