import React from "react";
import navigation from "./data/navigation";
import { Link, Link as ReactRouterLink, useLocation } from "react-router-dom";
import { ListStyle, SidebarWrap, SubListStyle, SubWrap } from "./Layoutstyles";

const Sidebar = () => {
    const location = useLocation()

    return (
        <>
            <SidebarWrap>
                {navigation.map(menu => (
                    <ListStyle>
                        <Link
                            to={menu.path}
                            as={ReactRouterLink}
                            >

                            {menu.iconName} {menu.title}
                        </Link>
                        {menu.subMenu && (
                            <SubWrap>
                                {menu.subMenu.map(subMenu => (
                                    <SubListStyle key={subMenu.title}>
                                        <Link
                                            to={subMenu.path}
                                            as={ReactRouterLink}
                                            >
                                            {subMenu.title}
                                        </Link>
                                    </SubListStyle>
                                ))}
                            </SubWrap>
                        )}
                    </ListStyle>
                ))}
            </SidebarWrap>
        </>
    );
}

export default Sidebar;