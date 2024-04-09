import React from "react";


import LogoImage from '../../assets/images/PotAccounts-logo.png'
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import { HeaderWrap, ImgSize, ImgWrap } from "./Layoutstyles";

const Header = () => {
    return (
        <HeaderWrap>

            <Link to="/main">
                <ImgWrap >
                    <ImgSize src={LogoImage} alt="Pot_Accounts-logo" />
                </ImgWrap>
            </Link>

            <Sidebar/>
        </HeaderWrap>
    )
}

export default Header;