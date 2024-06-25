import axios from "axios";
import API from "../config/apiConfig";

// 맘껏써라 함수
const fetchData = async (url, dataProcessor) => {
    try {
        const res = await axios.get(url);
        if (res.data) {
            return dataProcessor(res.data);
        } else {
            console.log("데이터가 없습니다.");
            return null;
        }
    } catch (error) {
        console.error("API 호출 에러", error);
        throw error;
    }
};

// 가계부 이름 불러오기
export const accountInfo = async (id) => {
    return fetchData(`${API.ACCOUNT}/${id}`, data => data);
};

// 월별 차트 데이터
export const payMonth = async (id) => {
    return fetchData(`${API.ACCOUNT}/${id}/payMonth`, data => data);
};

export const incomeMonth = async (id) => {
    return fetchData(`${API.ACCOUNT}/${id}/incomeMonth`, data => data);
};

// 주별 차트 데이터
export const payWeekly = async (id) => {
    return fetchData(`${API.ACCOUNT}/${id}/payWeekly`, data => data);
};

export const incomeWeekly = async (id) => {
    return fetchData(`${API.ACCOUNT}/${id}/incomeWeekly`, data => data);
};
