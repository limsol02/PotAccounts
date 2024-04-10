import PATH from "./path";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRightFromBracket, faBarsProgress, faCalendar, faHouse, faMoneyBill, faPen, faUser } from "@fortawesome/free-solid-svg-icons"

const navigation = [
    {
        title: "홈",
        iconName: <FontAwesomeIcon icon={faHouse} width={'16px'} height={'16px'} />,
        path: PATH.MAIN,
    },
    {
        title: "입력",
        iconName: <FontAwesomeIcon icon={faPen} width={'16px'} height={'16px'} />,
        path: PATH.WRITE,
    },
    {
        title: "분석",
        iconName: <FontAwesomeIcon icon={faBarsProgress} width={'16px'} height={'16px'} />,
        path: PATH.DATE_RANGE_CHART,
        subMenu: [
            {
                title: "기간별 분석",
                iconSize: "16px",
                path: PATH.DATE_RANGE_CHART,
            },
            {
                title: "카테고리별 분석",
                iconSize: "16px",
                path: PATH.CATEGORY_CHART,
            },
        ],
    },
    {
        title: "예산",
        iconName: <FontAwesomeIcon icon={faMoneyBill} width={'16px'} height={'16px'} />,
        path: PATH.BUDGET,
    },
    {
        title: "캘린더",
        iconName: <FontAwesomeIcon icon={faCalendar} width={'16px'} height={'16px'} />,
        path: PATH.CALENDAR,
    },
    {
        title: "마이페이지",
        iconName: <FontAwesomeIcon icon={faUser} width={'16px'} height={'16px'} />,
        path: PATH.ME,
        subMenu: [
            {
                title: "내 정보",
                path: PATH.SOCIAL,
            },
            {
                title: "가계부 관리",
                path: PATH.SETTING,
            },
        ],
    },
    {
        title: "로그아웃",
        iconName: <FontAwesomeIcon icon={faArrowRightFromBracket}  width={'16px'} height={'16px'} />,
        path: PATH.LOGOUT,
    },


];


export default navigation;