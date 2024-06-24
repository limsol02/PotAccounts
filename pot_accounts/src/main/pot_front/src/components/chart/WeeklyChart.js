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
                    label: (context) => {
                        const value = context.raw || 0;
                        return `${getMoneyUnit(value)}원`;
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

    // 주간별 데이터 가져오기
    const { bookId } = useParams();
    const { data: weekData } = useQuery({
        queryKey: [QUERYKEYS.LOAD_WEEKLY_COMPARE_ANALYZE, bookId],
        queryFn: () => loadWeeklyCompareAnalyze({
            id: bookId ? +bookId : 0,
            year: new Date().getFullYear(),
            month: new Date().getMonth() + 1,
            startDay: 1,
        }),
    });

    const labels = ["1째주", "2째주", "3째주", "4째주", "5째주"];

    const data = useMemo(() => {
        if (!weekData || !Array.isArray(weekData.income) || !Array.isArray(weekData.expenses)) {
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

        const incomeData = labels.map((_, index) => {
            const weekIncome = weekData.income.find(income => income.week === index + 1);
            return weekIncome ? weekIncome.amount : 0;
        });

        const expenseData = labels.map((_, index) => {
            const weekExpense = weekData.expenses.find(expense => expense.week === index + 1);
            return weekExpense ? weekExpense.amount : 0;
        });

        return {
            labels,
            datasets: [
                {
                    label: '수입',
                    data: incomeData(getMoneyUnit),
                    backgroundColor: "rgba(61, 123, 247, 0.5)",
                },
                {
                    label: '지출',
                    data: expenseData(getMoneyUnit),
                    backgroundColor: "rgba(239, 67, 82, 0.5)",
                },
            ],
        };
    }, [weekData]);

    const [diff, setDiff] = useState(null);
    const [sum, setSum] = useState(0);

    useEffect(() => {
        if (Array.isArray(weekData?.compare && weekData.compare.length >= 2)) {
            const totalSum = weekData.compare.reduce((acc, cur) => acc + (Number(cur.value) || 0), 0);
            setSum(totalSum);

            const diffValue = weekData.compare[1]
                ? (Number(weekData.compare[1].value) || 0) - (Number(weekData.compare[0].value) || 0)
                : null;
            setDiff(diffValue);
        }
    }, [weekData]);

    return (
        <Bar options={options} data={data} height={100}/>
    )
}

export default WeeklyChart;