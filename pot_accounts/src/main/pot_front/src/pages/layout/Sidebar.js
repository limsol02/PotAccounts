import React from "react";
import { Link, useLocation } from "react-router-dom";
import navigation from "./data/navigation";
import { ListStyle, SidebarWrap, SubListStyle, SubWrap } from "./Layoutstyles";

const Sidebar = () => {
    const location = useLocation();

    return (
        <SidebarWrap>
            {navigation.map((menu, index) => {
                const isActive = location.pathname === menu.path;

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
