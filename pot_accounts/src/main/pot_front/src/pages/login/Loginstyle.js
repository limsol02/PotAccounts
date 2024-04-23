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

export const ImageSize = styled.img`
width : 300px;
height : 300px;
`

export const WrapInnerL = styled.div`
display : flex;
width : 50%;
height : 100%;
padding : 60px;
background : #EFFFE5;
`;

export const RightInner = styled.div`
display : flex;
flex-direction : column;
justify-content : center;
padding-left : 74px;
padding-right : 74px;
width : 100%;
`

export const LeftInner = styled.div`
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

export const InputWrap2 = styled.div`
display : flex;
flex-direction : column;
margin-bottom : 5px;
gap : 10px;
`

export const TextButtonWrap = styled.div`
display : flex;
align-items : center;
font-size : 16px;

gap : 5px;

margin-left : auto;
margin-bottom: 50px;
`
export const GotoSignupWrap = styled.div`
display : flex;
align-items : center; 

justify-content : center;

margin-top : 10px;
gap : 5px;
`

export const NonBorder = styled.button`
border : none;
color : #888888;
padding : 0;
font-size : 16px;

&:hover {
    background : none;
    color : #2db400;
    padding : 0;
} 
`