import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useQuery } from '@tanstack/react-query';
import getMoneyUnit from "../utils/money";
import  API  from '../../config/apiConfig'
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

      // 차트 설정 옵션(디자인, 라벨 수 등)
    const options = {
        responsive: true,
        plugins: {
            legend: {
                display : false,    
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

    // 월 이름
    function getMonthLabel(monthIndex) {
        const monthNames = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];
        return monthNames[monthIndex];
    }

    // 지지난달, 지난달, 이번달 구하는 함수
    const currentMonthIndex = new Date().getMonth(); 
    const previousMonthIndex = (currentMonthIndex + 11) % 12; 
    const previousTwoMonthIndex = (currentMonthIndex + 10) % 12; 

    const labels = [
        getMonthLabel(previousTwoMonthIndex),
        getMonthLabel(previousMonthIndex),
        getMonthLabel(currentMonthIndex),
    ];

    // 부트에서 월별 데이터 가져오기
    // getMoneyUnit() -> 금액에 쉼표 추가
    const { bookId } = useParams();
    const queryFn = () =>
        loadMonthRecord({
            id: bookId ? +bookId : 0,
            year: new Date().getFullYear(),
            month: new Date().getMonth() + 1,
        });

    const { monthData } = useQuery({
        queryKey: [QUERYKEYS.LOAD_MONTH_ASSET],
        queryFn,
    });

    const data = useMemo(() => {
        if (!monthData) {
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


    const [diff, setDiff] = useState(null); //비교 상태 확인
    const [sum, setSum] = useState(0);

    useEffect(() => {
        if (monthData) { // 월 데이터 금액 합계 계산 및 비교
            setSum(
                monthData?.compare?.reduce((acc, cur) => {
                    return acc + Number(cur.value ? cur.value : 0);
                }, 0),
            );
            setDiff(
                monthData.compare[1]
                ? monthData.compare[1].value - monthData.compare[0].value
                : null,
            );
        }
    }, [monthData]);

    return (
        <Bar options={options} data={data} height={100}/>
    )
}

export default MonthlyChart;