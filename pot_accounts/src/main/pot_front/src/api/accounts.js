import axios from "axios";
import API from "../config/apiConfig";

// 기본설정
const authorizationClient = axios.create({
    baseURL: API.BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});
// get 요청
authorizationClient.get('/some-endpoint')
    .then(response => {
        console.log('데이터:', response.data);
    })
    .catch(error => {
        console.error('에러:', error);
    });

// post 요청
authorizationClient.post('/another-endpoint', { key: 'value' })
    .then(response => {
        console.log('응답:', response.data);
    })
    .catch(error => {
        console.error('에러:', error);
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

// 해당 월 기록 불러오기
export const loadMonthRecord = async (historyData) => {
    const { id, page, size, year, month } = historyData;
    const { data } = await authorizationClient.get(
        `${API.ACCOUNT}/${API.USER}/${id}${API.ANALYZE}/month/${year}/${month}?page=${page}&size=${size}&${API.CATEGORY}`,
    );
    return data;
};

// 일주일 기록 불러오기
export const loadWeeklyCompareAnalyze = async (weeklyData) => {
    const { id, year, month, startDay } = weeklyData;
    const { data } = await authorizationClient.get(
        `${API.ACCOUNT}/${id}${API.COMPARE_WEEKLY_ANALYZE}/${year}/${month}/${startDay}`,
    );
    return data;
};