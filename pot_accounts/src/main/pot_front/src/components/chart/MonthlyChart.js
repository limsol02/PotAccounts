import React, { useEffect, useMemo, useState } from "react";

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useQuery } from '@tanstack/react-query';
import getMoneyUnit from "../utils/money";
import QUERYKEYS from '../utils/querykey'
import { useParams } from "react-router-dom";
import { loadMonthRecord } from "../../api/accounts";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
);
// 월 이름과 인덱스
const monthNames = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];
const currentMonthIndex = new Date().getMonth();
const previousMonthIndex = (currentMonthIndex + 11) % 12;
const previousTwoMonthIndex = (currentMonthIndex + 10) % 12;

function getMonthLabel(monthIndex) {
    return monthNames[monthIndex];
}

// 월별차트
const MonthlyChart = (props) => {
    const {
        datasetIdKey,
        type,
        plugins,
        options: chartOptions,
        fallbackContent,
        updateMode,
    } = props

    const labels = [
        getMonthLabel(previousTwoMonthIndex),
        getMonthLabel(previousMonthIndex),
        getMonthLabel(currentMonthIndex),
    ];

      // 차트 설정 옵션(디자인, 라벨 수 등)
    const options = {
        responsive: true,
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
                grid: {
                    display: false,
                }
            },
            y: {
                display: false,
            },
        },
        title: {
            display: false,
        },
    };

    // getMoneyUnit() -> 금액에 쉼표 추가
    const { bookId } = useParams();
    const { data: monthData } = useQuery({
        queryKey: [QUERYKEYS.LOAD_MONTH_ASSET, bookId],
        queryFn: () => loadMonthRecord({
            id: bookId ? +bookId : 0,
            year: new Date().getFullYear(),
            month: new Date().getMonth() + 1,
        }),
    });

    const data = useMemo(() => {
        if (!monthData || !monthData.income || !monthData.expenses) {
            return {
                labels,
                datasets: [
                    {
                        label: '수입',
                        data: [0,0,0], 
                        backgroundColor: "rgba(239, 67, 82, 0.5)",
                    },
                    {
                        label: '지출',
                        data: [0,0,0], 
                        backgroundColor: "rgba(61, 123, 247, 0.5)",

                    },
                ],
            };
        }

        return {
            labels,
            datasets: [
                {
                    label: '수입',
                    data: monthData.income.map(item => getMoneyUnit(item.amount)),
                    backgroundColor: "rgba(61, 123, 247, 0.5)",
                },
                {
                    label: '지출',
                    data: monthData.expenses.map(item => getMoneyUnit(item.amount)),
                    backgroundColor: "rgba(239, 67, 82, 0.5)",
                },
            ],
        };
    }, [monthData, currentMonthIndex, previousMonthIndex, previousTwoMonthIndex]);


    const [diff, setDiff] = useState(undefined); //비교 상태 확인
    const [sum, setSum] = useState(0);

    useEffect(() => {
        if (monthData && monthData.compare && monthData.compare.length >= 2) {
            setSum(
                monthData.compare.reduce((acc, cur) => acc + Number(cur.value || 0), 0)
            );
            setDiff(monthData.compare[1].value - monthData.compare[0].value);
        } else {
            setSum(0);
            setDiff(undefined);
        }
    }, [monthData]);

    return (
        <Bar options={options} data={data} height={100}/>
    )
}

export default MonthlyChart;