import React from "react";
import PATH from "./data/path";
import { Link, useLocation, useNavigate } from "react-router-dom";
import navigation from "./data/navigation";
import { ListStyle, SidebarWrap, SubListStyle, SubWrap } from "./Layoutstyles";

const Sidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        if (window.confirm("로그아웃 하시겠습니까?")){
            sessionStorage.removeItem('mem'); // 세션에서 사용자 정보 제거
            navigate(PATH.LOGIN);  // 로그인 페이지로 리디렉션
        }else{
            alert("로그아웃이 취소되었습니다.")
        }
        //alert("세션해제")
    };


    return (
        <SidebarWrap>
            {navigation.map((menu, index) => {
                const isActive = location.pathname === menu.path;

                // 로그아웃 메뉴일 경우 별도 처리
                if (menu.path === PATH.LOGOUT) {
                    return (
                        <ListStyle key={index}>
                            <button onClick={handleLogout} style={{ color: isActive ? "#2DB400" : "inherit", background: 'none', border: 'none', cursor: 'pointer' }}>
                                <a style={{fontSize : '18px'}}>{menu.iconName} {menu.title}</a>
                            </button>
                        </ListStyle>
                    );
                }

                return (
                    <ListStyle key={index}>
                        <Link to={menu.path} style={{ color: isActive ? "#2DB400" : "inherit" }}>
                            {menu.iconName} {menu.title}
                        </Link>
                        {menu.subMenu && (
                            <SubWrap>
                                {menu.subMenu.map((subMenu, subIndex) => {
                                    const isSubActive = location.pathname === subMenu.path;

                                    return (
                                        <SubListStyle key={subIndex}>
                                            <Link to={subMenu.path} style={{ color: isSubActive ? "#2DB400" : "inherit" }}>
                                                {subMenu.title}
                                            </Link>
                                        </SubListStyle>
                                    );
                                })}
                            </SubWrap>
                        )}
                    </ListStyle>
                );
            })}
        </SidebarWrap>
    );
};

export default Sidebar;
