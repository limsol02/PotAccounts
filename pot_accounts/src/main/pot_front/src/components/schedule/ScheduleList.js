import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PATH from "../../pages/layout/data/path";

const ScheduleList = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [schedules, setSchedules] = useState([]);

    // 컴포넌트가 마운트될 때 일정 데이터를 불러오는 함수
    useEffect(() => {
        // 여기에 유저가 등록한 일정들 서버에서 가져옴
        const scheduleLists = [
        // { id: 1, title: '회의', date: '14' },
        // { id: 2, title: '개발 프로젝트', date: '15' },
        ];
        setSchedules(scheduleLists);
    }, []);

    // 캘린더 페이지로 이동 핸들러
    const goToCalendar = () => {
        navigate(PATH.CALENDAR)
    }

    return (
        <div>
            <div style={{ padding: '20px' }}>
                {schedules.length > 0 ? (
                    <ul>
                        {schedules.map((schedule) => (
                            <li key={schedule.id}>
                                {schedule.date} - {schedule.title}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div>
                        <p>설정된 일정이 없습니다</p>
                        <button onClick={goToCalendar}>
                            일정 추가하러 가기
                        </button>
                    </div>
                )}
                </div>
        </div>
    )
}

export default ScheduleList;