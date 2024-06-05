import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import  './maincomponentsstyle.scss'
import { faCalendar } from "@fortawesome/free-solid-svg-icons";

const Weeklytab = () => {
    return (

        <div className='box-form weekly'>
            <div className='components-title'>
                <FontAwesomeIcon icon={faCalendar}/>
                <p>주간별 분석</p>
            </div>
        </div>
    
    )
}

export default Weeklytab;