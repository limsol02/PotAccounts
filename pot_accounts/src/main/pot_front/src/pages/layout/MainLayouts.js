import { Outlet } from "react-router-dom";
import Header from "./Header"
import { AddBookButton, ButtonContainer, Container, CreateBookButton, Full, Inner, MainSpan, MainTitle } from "./MainLayoutsStyle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const Mainlayout = () => {

    // 버튼 클릭시 상태 변화
    const [selectedButton, setSelectedButton] = useState(null);

    // 가계부 생성 상태 변화
    const [newBookName, setNewBookName] = useState('');
    const [bookList, setBookList] = useState([]);

    // 버튼 클릭 이벤트(아이콘 색상변환)
    const handleAddBookClick = () => {
        setSelectedButton('addBook');
    };
    
    // 공유가계부 생성 클릭 이벤트
    const handleCreateBookClick = () => {
        setSelectedButton('createBook');

        // 새로운 가계부 생성
        if (newBookName) {
            // 새로운 가계부 이름을 리스트에 추가
            setBookList([...bookList, newBookName]);
            // 입력 필드 초기화
            setNewBookName('');
        }
    };

    return (
        <>
            <Full>
                <Header/>
                <Inner>
                    <Container>
                        <MainTitle>안윤희</MainTitle>
                        <MainSpan>님</MainSpan>
                    </Container>

                    <ButtonContainer>
                        <AddBookButton
                            onClick={handleAddBookClick}
                        >
                            <FontAwesomeIcon className={'selected'} icon={faCircle} />
                            <p>안윤희님의 가계부</p>
                        </AddBookButton>

                        {/* 아이콘이 faPlus인 버튼 누른 후 가계부 추가 하면 생기는 버튼 */}
                        {bookList.map((bookName, index) => (
                            <AddBookButton key={index}>
                                <FontAwesomeIcon className={selectedButton === 'addBook' ? 'selected' : ''} icon={faCircle} />
                                <p>{bookName}</p>
                            </AddBookButton>
                        ))}

                        <CreateBookButton
                            onClick={handleCreateBookClick}
                        >
                            <FontAwesomeIcon className={selectedButton === 'createBook' ? 'selected' : ''} icon={faPlus} />
                        </CreateBookButton>
                    </ButtonContainer>

                    <Outlet/>
                </Inner>
            </Full>
        </>
    )
}

export default Mainlayout;