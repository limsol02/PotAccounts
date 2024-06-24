import axios from "axios";
import API from "../config/apiConfig";
import PATH from "../pages/layout/data/path";
import { Navigate } from "react-router-dom";

// 기본설정 
const authorizationClient = axios.create({
    baseURL: API.BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});
// 로그아웃 클릭시 세션 정보 제거
export const handleLogout = () => {
    if (window.confirm("로그아웃 하시겠습니까?")){
        sessionStorage.removeItem('mem'); // 세션에서 사용자 정보 제거
        Navigate(PATH.LOGIN);  // 로그인 페이지로 리디렉션
    }else{
        alert("로그아웃이 취소되었습니다.")
    }
    //alert("세션해제")
};
// 로그인
authorizationClient.interceptors.request.use(config => {
    const token = sessionStorage.getItem('mem'); 
    if (token) {
        config.headers.Authorization = token;
    }
    return config;
});

// ======================================

// 카테고리데이터 불러오기
export const loadCategory = async (id) => {
    const { data } = await authorizationClient.get(
        `${API.ACCOUNT}/${API.USER}/${id}/${API.CATEGORY}`,
    );
    return data;
};

// 수입내역 불러오기
export const loadIncome = async (historyData) => {
    const { id, page, size } = historyData;
    const { data } = await authorizationClient.get(
        `${API.ACCOUNT}/${API.USER}/${API.INCOME}/${id}?page=${page}&size=${size}`,
    );
    return data;
};

// 수입내역 카테고리 별로 불러오기
export const loadIncomeCategory = async (historyData) => {
    const { id, categoryId, page, size } = historyData;
    const { data } = await authorizationClient.get(
        `${API.ACCOUNT}/${API.USER}/${API.INCOME}/${id}?page=${page}&size=${size}&categoryId=${categoryId}`,
    );
    return data;
};

// 지출내역 불러오기
export const loadPayment = async (historyData) => {
    const { id, page, size } = historyData;
    const { data } = await authorizationClient.get(
        `${API.ACCOUNT}/${API.USER}/${API.PAYMENT}/${id}?page=${page}&size=${size}`,
    );
    return data;
};

// 지출내역 카테고리 별로 불러오기
export const loadPaymentCategory = async (historyData) => {
    const { id, categoryId, page, size } = historyData;
    const { data } = await authorizationClient.get(
        `${API.ACCOUNT}/${API.USER}/${API.PAYMENT}/${id}?page=${page}&size=${size}&categoryId=${categoryId}`,
    );
    return data;
};

// 해당 월 기록 불러오기
export const loadMonthRecord = async (historyData) => {
    const { id, year, month } = historyData;
    // 지출 데이터 가져오기
    const {  data: payData  } = await authorizationClient.get(
        `${API.ACCOUNT}/${API.USER}/${id}/payMonth?year=${year}&month=${month}`,
    );
    // 수입 데이터 가져오기
    const { data: incomeData } = await axios.get(
        `${API.ACCOUNT}/${API.USER}/${id}/incomeMonth?year=${year}&month=${month}`
    );
    return {
        payData,
        incomeData
    };
};

// 일주일 기록 불러오기
export const loadWeeklyCompareAnalyze = async (weeklyData) => {
    const { id, year, month, startDay } = weeklyData;
    const endDay = startDay + 6;
    // 지출 데이터 가져오기
    const { data: payWeeklyData } = await authorizationClient.get(
        `${API.ACCOUNT}/${API.USER}/${id}/payWeekly?year=${year}&month=${month}&startDay=${startDay}&endDay=${endDay}`
    );
    // 수입 데이터 가져오기
    const { data: incomeWeeklyData } = await axios.get(
        `${API.ACCOUNT}/${API.USER}/${id}/incomeWeekly?year=${year}&month=${month}&startDay=${startDay}&endDay=${endDay}`
    );
    return {
        payWeeklyData,
        incomeWeeklyData
    };
};

// 스케쥴 불러오기
export const loadSchedule = async () => {
    const { data } = await authorizationClient.get(API.SCHEDULE);
    return data;
};

export const loadScheduleDetail = async (id) => {
    const { data } = await authorizationClient.get(
        `${API.ACCOUNT}/${API.USER}/${id}${API.SCHEDULE}`,
    );
    return data;
};