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
        const date = new Date();

        const thisMonthqueryFn = () =>
            loadMonthRecord(
                Number(bookId),
                `${date.getFullYear()}/${date.getMonth() + 1}`,
            );

        const { thisMonthQueryData } = useQuery({
            queryKey: [QUERYKEYS.LOAD_MONTH_ASSET, date.getMonth() + 1],
            thisMonthqueryFn,
        });

        const [thisMonthBudget, setThisMonthBudget] = useState({ value: 0 });
        const [thisMonthPayment, setThisMonthPayment] = useState({ value: 0 });
        const [thisRemainBudget, setThisRemainBudget] = useState(0);

        useEffect(() => {
            if (thisMonthQueryData?.budget) {
                setThisMonthBudget({ value: thisMonthQueryData.budget });
            }

            if (thisMonthQueryData?.record) {
                setThisMonthPayment({ value: thisMonthQueryData.record });
            }
        }, [thisMonthQueryData]);

        useEffect(() => {
            setThisRemainBudget(thisMonthBudget.value - thisMonthPayment.value);
        }, [thisMonthBudget, thisMonthPayment]);

        return {
            thisMonthBudget,
            thisMonthPayment,
            thisRemainBudget,
            date,
        };
    };

    const { thisMonthBudget, thisMonthPayment, thisRemainBudget, date } = useBudget();
    const datas = {
        labels: ['남은 예산', '이번달 지출'],
        datasets: [
            {
                data: [thisRemainBudget, thisMonthPayment.value],
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
                    label: (value) => {
                        return `${getMoneyUnit(value.parsed.y)}원`;
                    },
                },
            },
        },
        title: {
            display: false,
        },
    };

    return (
        <div>
            {thisMonthBudget.value === 0 ? (
                <NoneBudgetInner>
                    <NoneBudgetTxt>설정된 예산이 없습니다</NoneBudgetTxt>
                    <AddBudgetBtn onClick={goToBudget}>예산 추가하러 가기</AddBudgetBtn>
                </NoneBudgetInner>
            ) : (
                <Doughnut data={datas} options={options} />
            )}
        </div>
    )
};

export default BudgetChart;