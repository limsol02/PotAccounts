import React from "react"

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Mainlayout from "./pages/layout/MainLayouts"
import SignUp from "./pages/signup/Signup"
import Login from "./pages/login/Login"
import Main from "./pages/1. main/Main"
import Dayanalyze from "./pages/3. analyze/DayAnalyze"
import Categoryanalyze from "./pages/3. analyze/CategoryAnalyze"
import Budget from "./pages/4. budget/Budget"
import Calendar from "./pages/5. calendar/Calendar"
import Write from "./pages/2. write/Write"




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