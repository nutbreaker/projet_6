import { apiClient } from './apiClient';

/**
 * Fetches and computes the number of rest days over a specific date range.
 * 
 * @param {Object} [dateRange={}] optional date range used to query the data
 * @param {string|number} [dateRange.from] date from 
 * @param {string|number} [dateRange.to] date to
 * @param {AbortSignal} [signal] optional abort signal to cancel the request
 * 
 * @returns {Promise<number>}
 *
 * @throws {Error} throws when the fetch response is not OK
 */
export async function fetchRestDays(dateRange = {}, signal){
    const { from, to } = dateRange;
    const numberOfDaysSinceSignUp = (new Date(to) - new Date(from))/1000/24/60/60;
    
    const data = await apiClient(`/api/user-activity?startWeek=${from}&endWeek=${to}`, { signal }) || [];
    
    
    // Since the API doesn't return weeklyGoal we use a naive way of counting the rest days.
    return numberOfDaysSinceSignUp - data.length;
}