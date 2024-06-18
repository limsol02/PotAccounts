import axios from "axios";
import API from "../config/apiConfig";
//import apiFun from './accounts';

const storedMem = sessionStorage.getItem('mem');
const mem =JSON.parse(storedMem);

// 가계부 이름 불러오기
export const accountInfo = async (id) => {
    try {
        const response = await axios.get(`${API.ACCOUNT}/${id}`);
        if (response.data) {
            return response.data;
        } else {
            return "저장된 정보가 없습니다.";
        }
    } catch (error) {
        console.error("가계부 정보 에러", error);
        throw error;
    }
};

