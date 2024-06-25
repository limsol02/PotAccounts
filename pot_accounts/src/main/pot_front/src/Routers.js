import React from "react"

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Mainlayout from "./pages/layout/MainLayouts"
import SignUp from "./pages/00signup/Signup"
import Login from "./pages/00login/Login"
import Main from "./pages/01main/Main"
import Dayanalyze from "./pages/03analyze/DayAnalyze"
import Categoryanalyze from "./pages/03analyze/CategoryAnalyze"
import Budget from "./pages/04budget/Budget"
import Calendar from "./pages/05calendar/Calendar"
import Write from "./pages/02write/Write"




const Routers = () => {
    return (
        <BrowserRouter>

            <Routes>
                <Route path="/">
                    <Route path="/" element={<Login/>}  />
                    <Route path="/signup" element={<SignUp/>}  />
                </Route>
                
                <Route element={<Mainlayout/>}>
                    <Route path="/main" element={<Main/>} />
                    <Route path="/write" element={<Write/>} />
                    <Route path="/dayanalyze" element={<Dayanalyze/>} />
                    <Route path="/categoryanalyze" element={<Categoryanalyze/>} />
                    <Route path="/budget" element={<Budget/>} />
                    <Route path="/calendar" element={<Calendar/>} />
                </Route>
            </Routes>

        </BrowserRouter>
    )
}


export default Routers