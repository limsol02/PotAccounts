import React, { useEffect, useMemo, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { AddBudgetBtn, NoneBudgetInner, NoneBudgetTxt } from "./BudgetChartStyle";
import { useNavigate, useParams } from "react-router-dom";
import PATH from "../../pages/layout/data/path";
import { useQuery } from "@tanstack/react-query";
import { getLastDate } from "../utils/date";
import { loadMonthRecord } from "../../api/accounts";
import QUERYKEYS from "../utils/querykey";
import getMoneyUnit from "../utils/money";

ChartJS.register(ArcElement, Tooltip, Legend);

const BudgetChart = (props) => {
    // 예산 설정하러가기
    const navigate = useNavigate();
    
    const goToBudget = () => {
        navigate(PATH.BUDGET);
    };

    // 예산 정보 훅
    const useBudget = () => {
        const { bookId } = useParams();
        const { data: monthData } = useQuery({
            queryKey: [QUERYKEYS.LOAD_MONTH_ASSET, bookId],
            queryFn: () => loadMonthRecord({
                id: Number(bookId),
                year: new Date().getFullYear(),
                month: new Date().getMonth() + 1,
            }),
        });

        const [thisMonthBudget, setThisMonthBudget] = useState(0);
        const [thisMonthPayment, setThisMonthPayment] = useState(0);
        const [thisRemainBudget, setThisRemainBudget] = useState(thisMonthBudget - thisMonthPayment);

        // 임의의 예산 및 지출 데이터(차트확인용)
        // const [thisMonthBudget, setThisMonthBudget] = useState(500000);
        // const [thisMonthPayment, setThisMonthPayment] = useState(200000);
        // const [thisRemainBudget, setThisRemainBudget] = useState(thisMonthBudget - thisMonthPayment);

        useEffect(() => {
            if (monthData?.budget !== undefined) {
                setThisMonthBudget(monthData.budget);
            }
    
            if (monthData?.record !== undefined) {
                setThisMonthPayment(monthData.record);
            }
        }, [monthData]);

        useEffect(() => {
            setThisRemainBudget((thisMonthBudget || 0) - (thisMonthPayment || 0));
        }, [thisMonthBudget, thisMonthPayment]);

        return {
            thisMonthBudget,
            thisMonthPayment,
            thisRemainBudget,
        };
    };

    const { thisMonthBudget, thisMonthPayment, thisRemainBudget } = useBudget();
    const datas = {
        labels: ['남은 예산', '이번달 지출'],
        datasets: [
            {
                data: [thisRemainBudget, thisMonthPayment],
                backgroundColor: ['#0A3201', '#B7FF95'],
            },
        ],
    }

    // 차트 설정
    const {
        datasetIdKey,
        type,
        plugins,
        options: chartOptions,
        fallbackContent,
        updateMode,
    } = props

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
        title: {
            display: false,
        },
    };

    return (
        thisMonthBudget === 0 ? (
            <NoneBudgetInner>
                <NoneBudgetTxt>설정된 예산이 없습니다</NoneBudgetTxt>
                <AddBudgetBtn onClick={goToBudget}>예산 추가하러 가기</AddBudgetBtn>
            </NoneBudgetInner>
        ) : (
            <Doughnut data={datas} options={options} height={10} />
        )
    )
};

export default BudgetChart;