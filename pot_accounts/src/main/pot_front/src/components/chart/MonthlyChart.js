import React, { useEffect, useMemo, useState } from "react";

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useQuery } from '@tanstack/react-query';
import getMoneyUnit from "../utils/money";
import QUERYKEYS from '../utils/querykey'
import { useParams } from "react-router-dom";
import { loadMonthRecord } from "../../api/accounts";
import { payMonth, incomeMonth } from "../../api/main";

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
    // 지출 데이터
    const [payMonth01, setPayMonth01] = useState(0);
    const [payMonth02, setPayMonth02] = useState(0);
    const [payMonth03, setPayMonth03] = useState(0);


    // 수입 데이터
    const [incomeMonth01 , setIncomeMonth01] = useState(0);
    const [incomeMonth02 , setIncomeMonth02] = useState(0);
    const [incomeMonth03 , setIncomeMonth03] = useState(0);

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

    let payArr = [];
    let incomeArr = [];

    useEffect(() => {
        const fetchPayMonth = async (id) => {
            const payData = await payMonth(id);

            if (payData) {
                if (payData.payMonth01) {
                    const payTotal01 = payData.payMonth01.reduce((sum, payment) => sum + payment.pay_money, 0);
                    setPayMonth01(payTotal01);
                    payArr[2] = payTotal01; // 6월 데이터
                }

                if (payData.payMonth02) {
                    const payTotal02 = payData.payMonth02.reduce((sum, payment) => sum + payment.pay_money, 0);
                    setPayMonth02(payTotal02);
                    payArr[1] = payTotal02; // 5월 데이터
                }

                if (payData.payMonth03) {
                    const payTotal03 = payData.payMonth03.reduce((sum, payment) => sum + payment.pay_money, 0);
                    setPayMonth03(payTotal03);
                    payArr[0] = payTotal03; // 4월 데이터
                }
            }
        };

        const fetchIncomeMonth = async (id) => {
            const incomeData = await incomeMonth(id);

            if(incomeData) {
                if(incomeData.incomeMonth01){
                    const incomeTotal01 = incomeData.incomeMonth01.reduce((sum, income) => sum + income.income_money, 0);
                    incomeArr[2] = incomeTotal01;
                }
                if(incomeData.incomeMonth02){
                    const incomeTotal02 = incomeData.incomeMonth02.reduce((sum, income) => sum + income.income_money, 0);
                    incomeArr[1] = incomeTotal02;
                }
                if(incomeData.incomeMonth03){
                    const incomeTotal03 = incomeData.incomeMonth03.reduce((sum, income) => sum + income.income_money, 0);
                    incomeArr[0] = incomeTotal03;
                }
            }
        }


        const storedMem = sessionStorage.getItem('mem');
        if (storedMem) {
            const mem = JSON.parse(storedMem);
            fetchPayMonth(mem.id);
            fetchIncomeMonth(mem.id);
        }
    }, []);

    // console.log("PayMonth01:", payMonth01); // 콘솔 로그 추가
    // console.log("PayMonth02:", payMonth02); // 콘솔 로그 추가
    // console.log("PayMonth03:", payMonth03); // 콘솔 로그 추가
    // console.log(payArr)

    const data = useMemo(() => {
        if (!monthData || !monthData.income || !monthData.expenses) {
            return {
                labels,
                datasets: [
                    {
                        label: '수입',
                        // 내가 데이터 꼽아넣을곳
                        data: incomeArr,
                        backgroundColor: "rgba(61, 123, 247, 0.5)",
                    },
                    {
                        label: '지출',
                        // 내가 데이터 꼽아넣을곳
                        data: payArr,
                        backgroundColor: "rgba(239, 67, 82, 0.5)",

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