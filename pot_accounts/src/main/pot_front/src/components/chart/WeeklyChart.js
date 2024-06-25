import React, {useEffect, useMemo, useState} from "react";

import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend} from 'chart.js';
import {Bar} from 'react-chartjs-2';
import {useQuery} from '@tanstack/react-query';
import getMoneyUnit from "../utils/money";
import QUERYKEYS from '../utils/querykey'
import {useParams} from "react-router-dom";
import {loadWeeklyCompareAnalyze} from "../../api/accounts";
import {payWeekly, incomeWeekly} from "../../api/main.js";

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
                    label: function (context) {
                        //console.log("Tooltip context:", context); // Debugging
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

    const [payWeeklyData, setPayWeeklyData] = useState([0, 0, 0, 0, 0]); // Initialize with 5 weeks
    const [incomeWeeklyData, setIncomeWeeklyData] = useState([0, 0, 0, 0, 0]); // Initialize with 5 weeks
    
    // 주간별 데이터 가져오기
    const {bookId} = useParams();
    const {data: weekData} = useQuery({
        queryKey: [QUERYKEYS.LOAD_WEEKLY_COMPARE_ANALYZE, bookId],
        queryFn: () => loadWeeklyCompareAnalyze({
            id: bookId ? +bookId : 0,
            year: new Date().getFullYear(),
            month: new Date().getMonth() + 1,
            startDay: 1,
        }),
    });

    // 데이터 작업
    const payArr = [0, 0, 0, 0, 0];
    const incomeArr = [0, 0, 0, 0, 0];

    useEffect(() => {
        // 지출
        const fetchPayWeekly = async (id) => {
            const payData = await payWeekly(id);
            if (payData) {
                payData.forEach(item => {
                    const weekIndex = parseInt(item.week_label.replace('주차', '')) - 1;
                    //console.log("주차!!!!!!!!!"+weekIndex)
                    if (weekIndex >= 0 && weekIndex < payArr.length) {
                        payArr[weekIndex] = item.pay_money;
                        //console.log("금액!!!!!!!!!"+item.pay_money)
                    }
                });
                setPayWeeklyData(payArr);
            }
        }
        // 수입
        const fetchIncomeWeekly = async (id) => {
            const incomeData = await incomeWeekly(id);
            if (incomeData) {
                incomeData.forEach(item => {
                    const weekIndex = parseInt(item.week_label.replace('주차', '')) - 1;
                    if (weekIndex >= 0 && weekIndex < incomeArr.length) {
                        incomeArr[weekIndex] = item.income_money;
                        //console.log("수입금액!!!!!!!!!"+item.income_money)
                    }
                });
                setIncomeWeeklyData(incomeArr);
            }
        }
        // 함수실행
        const storedMem = sessionStorage.getItem('mem');
        if (storedMem) {
            const mem = JSON.parse(storedMem);
            fetchPayWeekly(mem.id);
            fetchIncomeWeekly(mem.id);
        }
    }, [])

    const startDay = 1;
    const endDay = 7;

    const labels = ["1째주", "2째주", "3째주", "4째주", "5째주"];

    const data = useMemo(() => {
        if (!weekData || !Array.isArray(weekData.income) || !Array.isArray(weekData.expenses)) {
            return {
                labels,
                datasets: [
                    {
                        label: '수입',
                        data: incomeArr,
                        backgroundColor: "rgba(61, 123, 247, 0.5)",
                    },
                    {
                        label: '지출',
                        data: payArr,
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