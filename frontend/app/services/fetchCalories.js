import { apiClient } from './apiClient';

/**
 * Fetches and computes the burned calories.
 * 
 * @param {Object} [dateRange={}] optional date range used to query the data
 * @param {string|number} [dateRange.from] date from 
 * @param {string|number} [dateRange.to] date to
 * 
 * @returns {Promise<Object>}
 *
 * @throws {Error} throws when the fetch response is not OK
 */
export async function fetchCalories(dateRange = {}, signal) {
    const { from, to } = dateRange;
    const data = await apiClient(`/api/user-activity?startWeek=${from}&endWeek=${to}`, { signal }) || [];
    const calories = data.reduce((prev, curr) => prev + curr.caloriesBurned, 0)

    return calories;
}