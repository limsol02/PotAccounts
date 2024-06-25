import { Outlet } from "react-router-dom";
import Header from "./Header";
import { AddBookButton, ButtonContainer, Container, CreateBookButton, Full, GreetingMessage, Inner, MainSpan, MainTitle } from "./MainLayoutsStyle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState,useEffect  } from "react";
import { accountInfo } from "../../api/main";



const Mainlayout = () => {
    // 로그인 세션정보
    const [userName, setUserName] = useState('');
    // 가계부 이름
    const [accountTitle, setAccountTitle] = useState('');
    
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

    useEffect(() => {
        const fetchAccountInfo = async (id) => {
            try {
                const data = await accountInfo(id);
                setAccountTitle(data.accounts_title);
            } catch (error) {
                console.error('계좌 정보를 불러오는 중 에러 발생:', error);
            }
        };

        const storedMem = sessionStorage.getItem('mem');
        if (storedMem) {
            const mem = JSON.parse(storedMem);
            setUserName(mem.name);
            fetchAccountInfo(mem.id);  // 사용자의 ID로 계좌 정보 가져오기
        }
    }, []);

    // const encouragementMessage = "당신은 당신의 재정을 책임질 수 있습니다. 우리 함께 해봐요!";

    return (
        <>
            <Full>
                <Header/>
                <Inner>
                    <Container>
                        <MainTitle>{userName}</MainTitle>
                        <MainSpan>님</MainSpan>
                        <GreetingMessage>환영합니다! 오늘도 알뜰한 하루를 시작해볼까요?</GreetingMessage>
                    </Container>

                    <ButtonContainer>
                        <AddBookButton
                            onClick={handleAddBookClick}
                            className={'selected'}
                        >
                            <FontAwesomeIcon icon={faCircle}/>
                            <p>{accountTitle}</p>
                        </AddBookButton>

                        {/* 아이콘이 faPlus인 버튼 누른 후 가계부 추가 하면 생기는 버튼 */}
                        {bookList.map((bookName, index) => (
                            <AddBookButton key={index} className={selectedButton === 'addBook' ? 'selected' : ''}>
                                <FontAwesomeIcon icon={faCircle} />
                                <p>{bookName}</p>
                            </AddBookButton>
                        ))}

                        <CreateBookButton
                            onClick={handleCreateBookClick}
                            className={selectedButton === 'createBook' ? 'selected' : ''}
                        >
                            <FontAwesomeIcon icon={faPlus} />
                        </CreateBookButton>
                    </ButtonContainer>

                    <Outlet/>
                </Inner>
            </Full>
        </>
    );
}

export default Mainlayout;
