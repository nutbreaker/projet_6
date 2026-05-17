import { useState } from "react";
import { useSearchParams } from "react-router";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

/**
 * Custom tooltip for the distance bar chart.
 * 
 * @param {Object} props the component props
 * @param {boolean} [props.active] whether the tooltip is currently active
 * @param {Array} [props.payload] the data payload for the tooltip containing distance information
 * 
 * @returns {JSX.Element|null}
 */
export const DistanceTooltip = ({ active, payload }) => {
    if (!active || !payload || !payload.length) return null;

    const data = payload[0].payload;
    const { start, end } = data.range;
    const options = { day: '2-digit', month: '2-digit' };
    const formatter = new Intl.DateTimeFormat('fr-CH', options);
    const formattedStart = formatter.format(new Date(start));
    const formattedEnd = formatter.format(new Date(end));
    const tooltilDate = `${formattedStart} au ${formattedEnd}`;

    return (
        <div className="distance-tooltip">
            <p className="tooltip-date">{tooltilDate}</p>
            <p className="tooltip-value">
                {data.distance.toFixed(1).replace('.', ',')} km
            </p>
        </div>
    );
};

const defaultWeeklyData = [{ distance: 0, name: 'Chargement...' }];

/**
 * Displays a bar chart representing the user's running distance over the last 4 weeks.
 * 
 * @param {Object} props the component props
 * @param {Function} props.dataPromise function to fetch distance data based on a date
 * @param {Object} props.navigationDateRange the allowed date range for navigation
 * 
 * @returns {JSX.Element}
 */
export default function DistanceChart({ dataPromise, navigationDateRange }) {
    const [date, setDate] = useState(new Date());
    const { data, loading } = dataPromise(date);
    const { weeklyData, averageDistance } = data;
    const handleNavigate = (direction) => {
        const newDate = new Date(date);

        newDate.setDate(date.getDate() + (direction === 'next' ? 28 : -28));

        if (
            newDate < navigationDateRange.from ||
            newDate > navigationDateRange.to
        ) return;

        setDate(newDate);
    };

    return (
        <div className="distance-chart">
            <div className="distance-chart-header">
                <div>
                    <h2>{averageDistance}km en moyenne</h2>
                    <div className="chart-navigation">
                        <button onClick={(e) => {
                            e.preventDefault();
                            handleNavigate('prev');
                        }}>{"<"}</button>
                        <span>
                            {weeklyData && weeklyData[0].range.displayStart} - {weeklyData && weeklyData[3].range.displayEnd}
                        </span>
                        <button onClick={(e) => {
                            e.preventDefault();
                            handleNavigate('next')
                        }}>{">"}</button>
                    </div>
                </div>

                <p>Total des kilomètres 4 dernières semaines</p>
            </div>
            <ResponsiveContainer width={330} height={300}>
                <BarChart
                    data={weeklyData || defaultWeeklyData}
                    className="distance-bar-chart"
                    width="100%"
                    height="100%"
                    responsive
                    margin={{ "left": -35 }}
                >
                    <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#F1F1F1"
                        vertical={false}
                        tickMargin={10}
                    />

                    {/* https://recharts.github.io/en-US/api/XAxis/#axisLine */}
                    <XAxis
                        dataKey="name"
                        tickLine={false}
                        tick={{
                            fill: '#707070',
                            dy: 15,
                            fontSize: '1.2rem'
                        }}
                    />

                    <YAxis
                        // https://recharts.github.io/en-US/api/YAxis/#tickLine
                        tickLine={false}
                        // https://recharts.github.io/en-US/api/YAxis/#tick
                        ticks={[0, 10, 20, 30]}
                        tick={{
                            fill: '#707070',
                            fontSize: '1.2rem'
                        }}
                    />

                    <Bar
                        dataKey="distance"
                        name="Km"
                        fill="#B6BDFC"
                        radius={[10, 10, 10, 10]}
                        barSize={14}
                    />

                    <Tooltip
                        cursor={false}
                        content={<DistanceTooltip />}
                    />
                    <Legend
                        verticalAlign="bottom"
                        align="left"
                        iconType="circle"
                        iconSize={10}
                        formatter={(value) => <span style={{ color: '#707070' }}>{value === 'distance' ? 'Km' : value}</span>}
                        wrapperStyle={{
                            left: "0",
                            bottom: -10,
                            fontSize: "1.4rem",
                            color: "#707070",
                            marginLeft: "1rem"
                        }}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
