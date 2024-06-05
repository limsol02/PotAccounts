import React from "react";

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: false,
            text: 'Chart.js Bar Chart',
        },
    },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];
const data = {
    labels,
    datasets: [
        {
            label: '수입',
            data: [1,1,1,1,1,1,3],
            backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
        {
            label: '지출',
            data: [1,1,1,1,1,1,3],
            backgroundColor: "rgba(99, 99, 255, 0.5)",
        },
    ],
};

const MonthlyChart = (props) => {
    const {
        height = 150,
        width = 300,
    } = props;

    return (
        <Bar options={options} data={data} height={height} width={width} />
    )
}

export default MonthlyChart;