import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import  './maincomponentsstyle.scss'
import { faCalendar } from "@fortawesome/free-solid-svg-icons";

const Budgettab = () => {
    return (

        <div className='box-form budget'>
            <div className='components-title'>
                <FontAwesomeIcon icon={faCalendar}/>
                <p>이번달 예산</p>
            </div>
        </div>
    
    )
}

export default Budgettab;