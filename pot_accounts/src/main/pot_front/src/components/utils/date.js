// 날짜 yyyy-mm-dd형식으로 반환 함수
export default function getDateUnit(day) {
    return day.toLocaleDateString('en-CA');
}

// YYYY-MM-DD HH:MM:SS 형식으로 반환 함수
export function getFullDateUnit(day) {
    return day.toLocaleString('en-CA', { hour12: false });
}

// 요일 반환 함수
export function getDayOfWeek(date) {
    const week = ["일", "월", "화", "수", "목", "금", "토"];
    return week[new Date(date).getDay()];
}

// 현재 월의 마지막 날짜 반환
export function getLastDate() {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
}

// 선택된 날짜와 현재 날짜 사이의 남은 날짜 계산 함수(예산 작성시 필요)
export function getRemainDate(selectDate) {
    const today = new Date();
    const lastDate = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    const curDate = today.getDate();
    
    return selectDate >= curDate ? selectDate - curDate : lastDate - curDate + selectDate;
}
// 시작일-종료일 반환 함수
export function getDateRangeUnit(startDay, endDay) {
    const today = new Date();
    const startDate = new Date(today.getFullYear(), today.getMonth(), startDay);
    const endDate = new Date(today.getFullYear(), today.getMonth(), endDay);

    const options = { month: '2-digit', day: '2-digit' };
    
    return `(${startDate.toLocaleDateString('en-US', options)} - ${endDate.toLocaleDateString('en-US', options)})`;
}


// 유틸성을 위해 작성함 함수들