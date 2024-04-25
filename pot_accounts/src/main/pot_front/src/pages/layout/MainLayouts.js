import { Outlet } from "react-router-dom";
import Header from "./Header"
import { Container, Full, Inner, MainSpan, MainTitle } from "./MainLayoutsStyle";

const Mainlayout = () => {
    return (
        <>
            <Full>
                <Header/>
                <Inner>
                    <Container>
                        <MainTitle>안윤희</MainTitle>
                        <MainSpan>님</MainSpan>
                    </Container>
                    
                    <Outlet/>
                </Inner>
            </Full>
        </>
    )
}

export default Mainlayout;