import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import  './maincomponentsstyle.scss'
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import MonthlyChart from "../../../components/chart/MonthlyChart";



const Monthlytab = () => {
    return (
        <div className='box-form monthly'>
            <div className='components-title'>
                <FontAwesomeIcon icon={faCalendar}/>
                <p>월별분석</p>
            </div>

            <MonthlyChart className="chart-form"/>

        </div>
    
    )
}

export default Monthlytab;