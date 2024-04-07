// 회원가입 페이지 컴포넌트 스타일 설정

import styled from "styled-components";

export const Wrap = styled.div`
display : flex;
width : 100vw;
height : 100vh;
`;

export const WrapInner = styled.div`
display : flex;
width : 50%;
height : 100%;
padding : 60px;
`;

export const WrapInnerR = styled.div`
display : flex;
width : 50%;
height : 100%;
padding : 60px;
background : #EFFFE5;
`;

export const LeftInner = styled.div`
display : flex;
flex-direction : column;
justify-content : center;
padding-left : 74px;
padding-right : 74px;
width : 100%;
`
export const RightInner = styled.div`
display : flex;
justify-content : center;
align-items : center;
width : 100%;
`

export const FromWrap = styled.div`
display : flex;
flex-direction : column
`

export const InputWrap = styled.div`
display : flex;
flex-direction : column;
margin-bottom : 15px;
gap : 10px;
`

export const ImageSize = styled.img`
width : 300px;
height : 300px;
`