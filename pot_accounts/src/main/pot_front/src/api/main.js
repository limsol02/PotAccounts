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

// 월별 차트 데이터
export const payMonth = async (id) =>{
    try {
        const res = await axios.get(`${API.ACCOUNT}/${id}/payMonth`);
        if (res.data) {
            return res.data;
        } else {
            return "저장된 지출정보가 없습니다.";
        }
    }catch (error){
        console.log("지출내역에러" + error);
        throw error;
    }
}
export const incomeMonth = async (id) =>{
    try {
        const res = await axios.get(`${API.ACCOUNT}/${id}/incomeMonth`);
        if (res.data) {
            return res.data;
        } else {
            return "저장된 수입정보가 없습니다.";
        }
    }catch (error){
        console.log("수입내역에러" , error);
        throw error;
    }
}

// 주별 차트 데이터
export const payWeekly = async (id) => {
        try {
            const res = await axios.get(`${API.ACCOUNT}/${id}/payWeekly`);
            if(res.data){
                return res.data;
            }else{
                console.log("주별 지출 데이터 정보없음")
            }
        }catch (error){
            console.log("지출 주별에러",error)
            throw error;
        }
}
export const incomeWeekly = async (id) => {
    try{
        const res = await axios.get(`${API.ACCOUNT}/${id}/incomeWeekly`)
        if(res.data){
            return res.data;
        }else{
            console.log("주별 수입 데이터 정보없음")
        }
    }catch (err){
        console.log("수입 주별 에러",err)
        throw err;
    }
}



