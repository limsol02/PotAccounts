import styled from "styled-components";


export const ScheduleBox = styled.div`
    display : flex;
    gap : 10px;
`
export const ScheduleUl = styled.ul`
    display : flex;
    flex-direction : column;
    gap : 20px;
    padding-left : 30px;
    width : 100%;
`
export const ScheduleLi = styled.li`
    display : flex;
    align-items : center;
    gap : 30px;
`
export const DateTxt = styled.div`
    font-size: 14px;
    border-radius: 5px;
    background: ${props => {
        return props.$bgColor || '#2DB400';
    }};
    color: #EFFFE5;
    width: 60px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const MemoTxt = styled.div`
    font-size : 18px;
    color : #555555;
`

export const InfoTxt = styled.div`
    font-size : 14px;
    color : #555555;

`

export const NoneScheduleInner = styled.div`
    padding : 50px;
    display : flex;
    flex-direction : column;
    align-items : center;
    gap : 20px;
`
export const NoneScheduleTxt = styled.p`
    font-size : 20px;
`
export const AddScheduleBtn = styled.button`
    font-size : 20px;
    border-radius : 20px;
    padding : 7px 15px;
    min-width : 70px;
`