import React from "react";
import './mainstyle.scss'

import Monthlytab from "./components/Monthlytab";
import Scheduletab from "./components/Scheduletab";
import Weeklytab from "./components/Weeklytab";
import Budgettab from "./components/Budgettab";

const Main = () => {
    return (
        <div className="main">
            <div className="sec">
                <Monthlytab/>
                <Scheduletab/>
            </div>
            <div className="sec">
                <Weeklytab/>
                <Budgettab/>
            </div>
        </div>
        )
}


export default Main;