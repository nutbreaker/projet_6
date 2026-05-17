import React, { useMemo, useState } from 'react';
import { useSearchParams } from "react-router";
import {
    ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid,
    Legend, ResponsiveContainer,
} from 'recharts';
import { formatWeekRange } from '../utils/utils';

const defaultWeeklyData = [{ min: null, max: null, average: null, name: 'Loading...' }];

/**
 * Displays a composed chart representing the user's heart rate statistics.
 * 
 * @param {Object} props the component props
 * @param {Function} props.dataPromise function to fetch heart rate data based on a date
 * @param {Object} props.navigationDateRange the allowed date range for navigation
 * 
 * @returns {JSX.Element}
 */
export default function HeartRateChart({ dataPromise, navigationDateRange }) {
    const [date, setDate] = useState(new Date());
    const { data, loading } = dataPromise(date);
    const weekLabel = formatWeekRange(date);

    const handleNavigate = (direction) => {
        const newDate = new Date(date);

        newDate.setDate(date.getDate() + (direction === 'next' ? 7 : -7));

        if (newDate < navigationDateRange.from || newDate > navigationDateRange.to) return;

        setDate(newDate);
    };

    return (
        <div className="heart-rate-chart">
            <div className="heart-rate-chart-header">
                <div>
                    <h2>
                        {data.weekAverage || 0} BPM
                    </h2>
                    <div className="chart-navigation">
                        <button onClick={() => handleNavigate('prev')} className="nav-btn-round">{"<"}</button>
                        <span>{weekLabel}</span>
                        <button onClick={() => handleNavigate('next')} className="nav-btn-round">{">"}</button>
                    </div>
                </div>
                <p>Fréquence cardiaque moyenne</p>
            </div>

            <ResponsiveContainer width={"100%"} height={300}>
                <ComposedChart
                    className='heart-rate-composed-chart'
                    data={data.entries || defaultWeeklyData}
                    margin={{ top: 10, right: 30, left: -20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E0E0E0" />
                    <XAxis
                        dataKey="name"
                        tickLine={false}
                        tick={{
                            fill: '#707070',
                            dy: 15,
                            fontSize: '1.2rem'
                        }}
                        height={50}
                    />
                    <YAxis
                        tickLine={false}
                        niceTicks='snap125'
                        tick={{
                            fill: '#707070',
                            fontSize: '1.2rem'
                        }}
                        ticks={[130, 145, 160, 187]}
                    />
                    <Bar
                        dataKey="min"
                        fill="#FDCAC4"
                        radius={[10, 10, 10, 10]}
                        barSize={14}
                        name="min"
                    />
                    <Bar
                        dataKey="max"
                        fill="#F7481F"
                        radius={[10, 10, 10, 10]}
                        barSize={14}
                        name="max"
                    />
                    <Line
                        type="bump"
                        dataKey="average"
                        stroke="#F2F3FF"
                        strokeWidth={2}
                        // https://recharts.github.io/en-US/api/Line/#connectNulls
                        connectNulls={true}
                        dot={{
                            stroke: '#fff',
                            strokeWidth: 1,
                            fill: '#0B23F4',
                            r: 4
                        }}
                        activeDot={{
                            stroke: '#fff',
                            fill: '#0B23F4',
                            strokeWidth: 1
                        }}
                        name="average"
                    />

                    <Legend
                        verticalAlign="bottom"
                        align="left"
                        iconType="circle"
                        iconSize={8}
                        wrapperStyle={{ paddingTop: "32px", fontSize: "12px", color: "#74798C" }}
                        // https://github.com/recharts/recharts/blob/0f9fb4d55795a7913a592bb7f9a383e1eb9648b2/src/component/Legend.tsx#L145
                        itemSorter={(item) => ["Min BPM", "Max BPM", "AVG BPM"].indexOf(item.value)}
                        formatter={(value) => {
                            const labels = {
                                min: 'Min BPM',
                                max: 'Max BPM',
                                average: 'AVG BPM'
                            };

                            return <span style={{ color: '#74798C', marginLeft: '4px' }}>{labels[value] || value}</span>;
                        }}
                        wrapperStyle={{
                            left: "0",
                            bottom: -10,
                            fontSize: "1.4rem",
                            color: "#707070",
                            marginLeft: "1rem"
                        }}
                    />
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    );
}