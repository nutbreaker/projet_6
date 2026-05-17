import { useState, useEffect } from 'react';
import { fetchCalories } from "../services/fetchCalories";

/**
 * Custom hook to fetch the user's calorie consumption over a specific date range.
 * 
 * @param {Object} dateRange the date range object
 * @param {Date|string} dateRange.from the start date of the range
 * @param {Date|string} dateRange.to the end date of the range
 * 
 * @returns {{data: number|Object, loading: boolean, error: string|null}} the calories data, loading state, and potential error
 */
export function useCalories(dateRange) {
    const [data, setData] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { from, to } = dateRange || {};

    useEffect(() => {
        const controller = new AbortController();

        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                const result = await fetchCalories(
                    { from, to },
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

        if (from && to) {
            fetchData();
        }

        return () => controller.abort();
    }, [from, to]);

    return { data, loading, error };
}