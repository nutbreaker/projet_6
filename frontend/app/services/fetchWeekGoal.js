import { apiClient } from './apiClient';

/**
 * Fetches and computes weekly running goal statistics from the user-activity API.
 * 
 * @param {Object} [weekRange={}] optional week range data used to query and display the week
 * @param {string|number} [weekRange.start] start week 
 * @param {string|number} [weekRange.end] end week
 * @param {string} [weekRange.displayStart] display-friendly start date
 * @param {string} [weekRange.displayEnd] display-friendly end date
 * 
 * @returns {Promise<Object>}
 *
 * @throws {Error} throws when the fetch response is not OK
 */
export async function fetchWeekGoal(weekRange = {}, weeklyGoal = 6, signal) {
    const { start, end, displayStart, displayEnd } = weekRange;
    const runningData = await apiClient(`/api/user-activity?startWeek=${start}&endWeek=${end}`, { signal });

    const totals = runningData.reduce((acc, curr) => {
        acc.distance += curr.distance;
        acc.duration += curr.duration;
        return acc;
    }, { distance: 0, duration: 0 });

    const sessionCount = runningData.length;
    const realized = Math.min(sessionCount, weeklyGoal);
    const remaining = Math.max(0, weeklyGoal - sessionCount);

    return {
        realized,
        remaining,
        objective: weeklyGoal,
        distance: totals.distance.toFixed(1),
        duration: totals.duration,
        range: `Du ${displayStart} au ${displayEnd}`,
        pieData: [
            { name: 'réalisées', value: realized, fill: '#0B23F4' },
            { name: 'restants', value: remaining, fill: '#B6BDFC' }
        ]
    };
}