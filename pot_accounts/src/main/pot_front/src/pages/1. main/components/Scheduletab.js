import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import  './maincomponentsstyle.scss'
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import MonthlyChart from "../../../components/chart/MonthlyChart";

const Scheduletab = () => {
    return (

        <div className='box-form schedule'>
            <div className='components-title'>
                <FontAwesomeIcon icon={faCalendar}/>
                <p>이번달 일정</p>
            </div>
            {/* <MonthlyChart/> */}
        </div>
    
    )
}

export default Scheduletab;