import styled from "styled-components";

export const Full = styled.div`
display : flex;
flex-direction : row;
width : 100%;
height : 100%;
`

export const Inner = styled.div`
width: calc(100% - 300px);
padding : 60px;
`
export const Container = styled.div`
width : 100%;
display : flex;
gap : 7px;
margin-bottom : 35px;
`
export const MainTitle = styled.h1`
font-size : 52px;
font-weight : 700;

color : #20690B;
`

export const MainSpan = styled.p`
font-size : 52px;
font-weight : 700;
`

export const AddBookButton = styled.button`
border-radius: 20px;
border: 1px #c7c7c7 solid;
background: #ffffff;
font-size : 20px;

height: 42px;
padding : 15px;

display : flex;
align-items: center;
gap : 10px;

&:hover {
    background : #fff;
    color : #222;
    border : 1px solid #20690B;
}
&.selected {
    color: #2DB400;
}
`
export const CreateBookButton = styled.button`
border-radius: 20px;
border: 1px #c7c7c7 solid;
background: #ffffff;
font-size : 20px;

height: 42px;
padding : 15px;

display : flex;
align-items: center;
gap : 10px;

&:hover {
    background : #fff;
    color : #222;
    border : 1px solid #20690B;
}
&.selected {
    color: #2DB400;
}
`
export const ButtonContainer = styled.div`
width : 100%;
display : flex;
gap : 20px;
margin-bottom : 35px;
`