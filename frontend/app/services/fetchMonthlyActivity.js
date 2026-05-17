
import { apiClient } from './apiClient';

/**
 * Fetches and computes the monthly activity statistics.
 * 
 * @param {Date|string} [referenceDate=new Date()] reference date to compute the previous 4 weeks
 * @param {AbortSignal} [signal] optional abort signal to cancel the request
 * 
 * @returns {Promise<{weeklyData: Array, averageDistance: number}>}
 *
 * @throws {Error} throws when the fetch response is not OK
 */
export async function fetchMonthlyActivity(referenceDate = new Date(), signal) {
    const weeks = [];
    for (let i = 3; i >= 0; i--) {
        const d = new Date(referenceDate);
        const end = new Date(d.setDate(d.getDate() - (i * 7)));
        const start = new Date(d.setDate(d.getDate() - 6));

        weeks.push({
            start: start.toISOString().split('T')[0],
            end: end.toISOString().split('T')[0],
            displayStart: start.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }),
            displayEnd: end.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })
        });
    }

    const rawData = await apiClient(`/api/user-activity?startWeek=${weeks[0].start}&endWeek=${weeks[3].end}`, { signal });

    const weeklyData = weeks.map((week, index) => {
        const weeklyDistance = rawData
            .filter(activity => activity.date >= week.start && activity.date <= week.end)
            .reduce((sum, curr) => sum + curr.distance, 0);

        return {
            name: `S${index + 1}`,
            distance: Number(weeklyDistance.toFixed(1)),
            range: { start: week.start, end: week.end, displayStart: week.displayStart, displayEnd: week.displayEnd }
        };
    });

    const totalDistance = weeklyData.reduce((sum, week) => sum + week.distance, 0);
    const averageDistance = Number((totalDistance / weeklyData.length).toFixed(1));

    return {
        weeklyData,
        averageDistance
    };
}