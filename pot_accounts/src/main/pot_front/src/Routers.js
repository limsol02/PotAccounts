import React from "react"

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignUp from "./pages/signup/Signup"
import Login from "./pages/login/Login"
import Main from "./pages/main/Main"
import Mainlayout from "./pages/layout/MainLayouts"




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
                </Route>
            </Routes>

        </BrowserRouter>
    )
}


export default Routers