import { useState, useEffect } from 'react';
import { fetchMonthlyActivity } from '../services/fetchMonthlyActivity';

/**
 * Custom hook to fetch the user's monthly activity data.
 * 
 * @param {Date|string} referenceDate the date used as a reference to fetch the month's activity
 * 
 * @returns {{data: Object, loading: boolean, error: string|null}} the activity data, loading state, and potential error
 */
export function useMonthlyActivity(referenceDate) {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const controller = new AbortController();

        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                const result = await fetchMonthlyActivity(
                    referenceDate,
                    controller.signal
                );

                setData(result);
            } catch (err) {
                if (err.name !== 'AbortError') {
                    setError(err.message);
                }
            } finally {
                if (controller.signal.aborted) return;

                setLoading(false);
            }
        };

        fetchData();

        return () => controller.abort();
    }, [referenceDate]);


    return { data, loading, error };
}