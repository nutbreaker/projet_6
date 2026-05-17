import { PieChart, Pie, ResponsiveContainer } from "recharts";

const calculateLabelPosition = (cx, cy, midAngle, radius) => {
    const rad = Math.PI / 180;
    const x = cx + radius * Math.cos(-midAngle * rad);
    const y = cy + radius * Math.sin(-midAngle * rad);

    return { x, y };
};

const textPosition = (cx, x) => {
    const roundX = Math.round(x * 10) / 10;

    if (roundX > cx) {
        return 'start';
    }

    if (cx === roundX) return 'middle';

    return 'end';
}

const circleMagicPositioning = (textContent, anchor, horizontalAxis) => {
    const includesRestants = textContent.includes('restants');
    const position = - 5;

    if (includesRestants) {
        switch (anchor) {
            case 'start':
                return horizontalAxis + position - 2;
            case 'middle':
                return horizontalAxis + position - 25;
            case 'end':
                return horizontalAxis + position - 49;
        }
    }

    switch (anchor) {
        case 'start':
            return horizontalAxis + position - 2;
        case 'middle':
            return horizontalAxis + position - 2 - 25;
        case 'end':
            return horizontalAxis + position - 52;
    }
}



function GoalPieChartLabel(props) {
    const fontSize = 10;
    const circleRadius = 3.5;

    const { cx, cy, midAngle, middleRadius, payload } = props;
    const { x: horizontalAxis, y: verticalAxis } = calculateLabelPosition(cx, cy, midAngle, middleRadius + 35);

    const anchor = textPosition(cx, horizontalAxis);
    const textContent = `${payload.value} ${payload.name}`;
    const estimatedTextWidth = textContent.length * 6;

    // circleX = horizontalAxis - 5 - 25 - 27;
    const circleX = circleMagicPositioning(textContent, anchor, horizontalAxis);

    if (!payload.value) return null;

    return (
        <g>
            <circle cx={circleX} cy={verticalAxis + 1} r={circleRadius} fill={payload.fill} />
            <text
                x={horizontalAxis}
                y={verticalAxis}
                textAnchor={anchor}
                dominantBaseline="central"
                fontSize={fontSize}
                fill="#707070"
            >
                {textContent}
            </text>
        </g>
    );
}

/**
 * Displays a pie chart representing the user's weekly goals.
 * 
 * @param {Object} props the component props
 * @param {Object} props.data the goal data including realized, objective, and pieData
 * 
 * @returns {JSX.Element}
 */
export default function GoalChart({ data }) {
    return (
        <div className="goal-chart">
            <div className="goal-header">
                <h2><span>x{data.realized}</span> <span>sur objectif de {data.objective}</span></h2>
                <p>Courses hebdomadaire réalisées</p>
            </div>

            <div className="goal-chart-container">
                <ResponsiveContainer width="100%" height={200}>
                    <PieChart
                        className="goal-pie-chart"
                    >
                        <Pie
                            data={data.pieData}
                            cx="50%"
                            cy="50%"
                            endAngle={-360}
                            innerRadius={40}
                            outerRadius={80}
                            stroke="none"
                            isAnimationActive={false}
                            dataKey="value"
                            label={GoalPieChartLabel}
                            labelLine={false}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}