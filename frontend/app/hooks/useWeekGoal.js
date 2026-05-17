import { useState, useEffect } from 'react';
import { fetchWeekGoal } from '../services/fetchWeekGoal';

// https://react.dev/learn/reusing-logic-with-custom-hooks
// https://medium.com/@armunhoz/using-abortcontrollers-in-react-hooks-creating-a-hook-for-canceling-pending-requests-39bbcaf01d22

/**
 * Custom hook to fetch the user's weekly goal data.
 * 
 * @param {Object} weekRange the date range of the week
 * @param {number} [weeklyGoal=6] the target number of activities for the week
 * 
 * @returns {{data: Object|null, loading: boolean, error: string|null}} the goal data, loading state, and potential error
 */
export function useWeekGoal(weekRange, weeklyGoal = 6) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const controller = new AbortController();

        // We could have used an anonymous self-invoked function, but this way the code looks more clean.
        // Also main the reason for this function is that React useEffect doesn't allow an async function.
        // Whether useEffect returns nothing or a cleanup function
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                // By having a dedicated function that fetch the data we avoid vendor locking...
                const result = await fetchWeekGoal(
                    weekRange,
                    weeklyGoal,
                    controller.signal
                );

                setData(result);
            } catch (err) {
                if (err.name === 'AbortError') return;

                setError(err.message);
            } finally {
                if (controller.signal.aborted) return;

                setLoading(false);
            }
        };

        fetchData();

        // In case the request is aborted
        return () => controller.abort();
    }, [weekRange.start, weekRange.end, weeklyGoal]);

    return { data, loading, error };
}