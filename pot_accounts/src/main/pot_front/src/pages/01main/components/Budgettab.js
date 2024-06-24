import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import  './maincomponentsstyle.scss'
import { faCalendar } from "@fortawesome/free-solid-svg-icons";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import MonthlyChart from "../../../components/chart/MonthlyChart";
import BudgetChart from "../../../components/chart/BudgetChart";

const Budgettab = () => {
    return (

        <div className='box-form budget'>
            <div className='components-title'>
                <FontAwesomeIcon icon={faCalendar}/>
                <p>이번달 예산</p>
            </div>
            <BudgetChart/>
        </div>
    
    )
}

export default Budgettab;