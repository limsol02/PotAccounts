import React from "react"

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignUp from "./pages/signup/Signup"
import Main from "./pages/main/Main"
import Header from "./pages/layout/Header"
import Login from "./pages/login/Login"




const Routers = () => {
    return (
        <BrowserRouter>

            <Routes>
                <Route path="/">
                    <Route path="/" element={<Login/>}  />
                    <Route path="/signup" element={<SignUp/>}  />
                </Route>
                
                <Route path="/main" element={<Header/>}>
                    <Route path="/main" element={<Main/>} />
                </Route>
            </Routes>

        </BrowserRouter>
    )
}


export default Routers