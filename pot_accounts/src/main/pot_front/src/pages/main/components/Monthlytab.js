import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import  './maincomponentsstyle.scss'
import { faCalendar } from "@fortawesome/free-solid-svg-icons";

const Monthlytab = () => {
    return (

        <div className='box-form monthly'>
            <div className='components-title'>
                <FontAwesomeIcon icon={faCalendar}/>
                <p>월별분석</p>
            </div>
            
        </div>
    
    )
}

export default Monthlytab;