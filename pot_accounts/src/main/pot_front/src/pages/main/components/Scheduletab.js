import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import  './maincomponentsstyle.scss'
import { faCalendar } from "@fortawesome/free-solid-svg-icons";

const Scheduletab = () => {
    return (

        <div className='box-form schedule'>
            <div className='components-title'>
                <FontAwesomeIcon icon={faCalendar}/>
                <p>이번달 일정</p>
            </div>
        </div>
    
    )
}

export default Scheduletab;