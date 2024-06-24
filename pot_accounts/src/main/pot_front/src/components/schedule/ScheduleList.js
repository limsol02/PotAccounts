import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PATH from "../../pages/layout/data/path";
import { AddScheduleBtn, DateTxt, InfoTxt, MemoTxt, NoneScheduleInner, NoneScheduleTxt, ScheduleBox, ScheduleLi, ScheduleUl } from "./ScheduleListStyle";
import getDateUnit, { formatDate } from "../utils/date";
import { useQuery } from "@tanstack/react-query";
import QUERYKEYS from "../utils/querykey";
import { loadSchedule, loadScheduleDetail } from "../../api/accounts";

const ScheduleList = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [schedules, setSchedules] = useState([]);

    // 일정 추가하러 가기 버튼 클릭시 페이지 이동 핸들러
    const goToCalendar = () => {
        navigate(PATH.CALENDAR)
    };

    // 스케쥴 불러오는 상태관리
    const useSchedule = () => {
        return useQuery({
            queryKey: [QUERYKEYS.LOAD_SCHEDULE],
            queryFn: loadSchedule
        });
    };

    const { data: scheduleData } = useSchedule();

    useEffect(() => { 
        if (!scheduleData) return ;

        // const scheduleLists = [
        //     { id: 1, date: '2024-06-01', memo: '회의', money: '10,000원' },
        //     { id: 2, date: '2024-06-08', memo: '회의', money: '10,000원' },
        //     { id: 3, date: '2024-06-27', memo: '회의', money: '10,000원' },
        //     { id: 4, date: '2024-06-30', memo: '회의', money: '10,000원' },
        // ];

        // 날짜 변환 함수 적용
        const updatedSchedules = scheduleData.map(schedule => ({
            ...schedule,
            date: getDateUnit(new Date(schedule.date))
        }));

        setSchedules(updatedSchedules);
    }, [scheduleData]);

    // 남은 날짜별 색상변경
    const getScheduleColor = (date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // 시간 부분을 0으로 설정하여 날짜만 비교
        const scheduleDate = new Date(date);
        scheduleDate.setHours(0, 0, 0, 0); // 시간 부분을 0으로 설정

        const diffTime = scheduleDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return '#0A3201'; // 당일
        if (diffDays <= 10) return '#20690B'; // 10일 이내
        if (diffDays <= 15) return '#3FDC06'; // 15일 이내
        if (diffDays <= 20) return '#89FE58'; // 20일 이내
        return '#2DB400'; // 기본 색상 (지정된 기간 이외)
    };

    const ScheduleItem = ({ schedule }) => (
        <ScheduleLi>
            <DateTxt $bgColor={getScheduleColor(schedule.date)}>
                {formatDate(schedule.date)}
            </DateTxt>
            <ul>
                <li>
                    <MemoTxt>{schedule.memo}</MemoTxt>
                    <InfoTxt>{schedule.money}</InfoTxt>
                </li>
            </ul>
        </ScheduleLi>
    );

        return (
            <div>
                <div>
                    {schedules.length > 0 ? (
                        <ScheduleBox>
                            <ScheduleUl>
                                {schedules.map((schedule) => (
                                    <ScheduleItem key={schedule.id} schedule={schedule} />
                                ))}
                            </ScheduleUl>
                        </ScheduleBox>
                    ) : (
                        <NoneScheduleInner>
                            <NoneScheduleTxt>설정된 일정이 없습니다</NoneScheduleTxt>
                            <AddScheduleBtn onClick={goToCalendar}>
                                일정 추가하러 가기
                            </AddScheduleBtn>
                        </NoneScheduleInner>
                    )}
                </div>
            </div>
        );
}

export default ScheduleList;
