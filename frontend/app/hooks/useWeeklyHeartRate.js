import { useState, useEffect } from 'react';
import { fetchWeeklyHeartRate } from '../services/fetchWeeklyHeartRate';

/**
 * Custom hook to fetch the user's weekly heart rate data.
 * 
 * @param {Date|string} referenceDate the date used as a reference to fetch the week's heart rate
 * 
 * @returns {{data: {weekAverage: number, entries: Array}, loading: boolean, error: string|null}} the heart rate data, loading state, and potential error
 */
export function useWeeklyHeartRate(referenceDate) {
    const [data, setData] = useState({
        weekAverage: 0,
        entries: []
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

  
    useEffect(() => {
        const controller = new AbortController();

        const fetchData = async () => {
             
            try {
                setLoading(true);
                setError(null);
                const result = await fetchWeeklyHeartRate(
                    referenceDate,
                    controller.signal
                );

                setData(result);
            } catch (err) {
                if (err.name !== 'AbortError') {
                    setError(err.message);
                }
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        };

        fetchData();

        return () => controller.abort();
    }, [referenceDate]);

    return { data, loading, error };
}