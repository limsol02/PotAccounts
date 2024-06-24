import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useQuery } from '@tanstack/react-query';
import getMoneyUnit from "../utils/money";
import  API  from '../../config/apiConfig'
import QUERYKEYS from '../utils/querykey'
import { useParams } from "react-router-dom";
import { loadWeeklyCompareAnalyze } from "../../api/accounts";
import { getDateRangeUnit } from "../utils/date";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
);


// 주간별차트
const WeeklyChart = (props) => {
    const {
        datasetIdKey,
        type,
        plugins,
        options: chartOptions,
        fallbackContent,
        updateMode,
    } = props

    // 차트 설정 옵션(디자인, 라벨 수 등)
    const options = {
        responsive: true,
        indexAxis: 'y',
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    label(value) {
                        return `${getMoneyUnit(value.parsed.y)}원`;
                    },
                },
            },
        },
        layout: {
            padding: 30
        },
        interaction: {
            mode: "index",
            intersect: true,
        },
        scales: {
            x: {
                display: false,
            },
            y: {
                grid: {
                    display: false,
                }
            },
        },
        title: {
            display: false,
        },
    };

    // 부트에서 주간별 데이터 가져오기
    const { bookId } = useParams();
    const queryFn = () =>
        loadWeeklyCompareAnalyze({
            id: bookId ? +bookId : 0,
            year: new Date().getFullYear(),
            month: new Date().getMonth() + 1,
            startDay: 1,
        });

    const { data: weekData } = useQuery({
        queryKey: [QUERYKEYS.LOAD_WEEKLY_COMPARE_ANALYZE],
        queryFn,
    });

    const startDay = 1;
    const endDay = 7;

    const labels = ["1째주", "2째주", "3째주", "4째주", "5째주"];

    const data = useMemo(() => {
        if (!weekData || !weekData.income || !weekData.expenses) {
            return {
                labels,
                datasets: [
                    {
                        label: '수입',
                        data: [0, 0, 0, 0, 0],
                        backgroundColor: "rgba(61, 123, 247, 0.5)",
                    },
                    {
                        label: '지출',
                        data: [0, 0, 0, 0, 0],
                        backgroundColor: "rgba(239, 67, 82, 0.5)",
                    },
                ],
            };
        }

        const incomeData = labels.map((label, index) => {
            const weekIncome = weekData.income.find(income => income.week === index + 1);
            return weekIncome ? weekIncome.amount : 0;
        });

        const expenseData = labels.map((label, index) => {
            const weekExpense = weekData.expenses.find(expense => expense.week === index + 1);
            return weekExpense ? weekExpense.amount : 0;
        });

        return {
            labels,
            datasets: [
                {
                    label: '수입',
                    data: incomeData.map(getMoneyUnit),
                    backgroundColor: "rgba(61, 123, 247, 0.5)",
                },
                {
                    label: '지출',
                    data: expenseData.map(getMoneyUnit),
                    backgroundColor: "rgba(239, 67, 82, 0.5)",
                },
            ],
        };
    }, [weekData]);

    const [diff, setDiff] = useState(null);
    const [sum, setSum] = useState(0);

    useEffect(() => {
        if (weekData?.compare) {
            const totalSum = weekData.compare.reduce((acc, cur) => acc + Number(cur.value ? cur.value : 0), 0);
            setSum(totalSum);

            const diffValue = weekData.compare[1]
                ? weekData.compare[1].value - weekData.compare[0].value
                : null;
            setDiff(diffValue);
        }
    }, [weekData]);

    return (
        <Bar options={options} data={data} height={100}/>
    )
}

export default WeeklyChart;