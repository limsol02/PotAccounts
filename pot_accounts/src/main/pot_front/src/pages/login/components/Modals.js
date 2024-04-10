// 수정된 모달 컴포넌트
import React, { useState } from "react";
import Modal from 'react-modal';
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './modalstyle.scss';
import { FindArea, FromWrap, InputWrap } from "./Modalstyle";

const ModalComponent = ({ title, children, isOpen, closeModal }) => {
    return (
        <Modal isOpen={isOpen} className="dimmed">
            <div className="modal-wrap">
                <div className="modal-inner">
                    <FromWrap>
                        <button className="close-btn" onClick={closeModal}>
                            <FontAwesomeIcon icon={faXmark} />
                        </button>
                        <h3 className='main-title'>{title}</h3>
                        {children}
                    </FromWrap>
                </div>
            </div>
        </Modal>
    );
};

export const Findidmodal = (props) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    // 초기값 세팅 - 이름,이메일
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const [nameMessage, setNameMessage] = useState('');
    const [emailchkMessage, setEmailchkMessage] = useState('');
    const [idMessage, setIdMessage] = useState('');

    // 유효성 확인을 위한 상태변화 세팅
    const [isName, setIsName] = useState('');
    const [isEmail, setIsEmail] = useState('');

    // 유저이름 변화 인지 인풋핸들러
    const onChangeNameHandler = (e) => {
        // 초기값
        setName(e.target.value);
    }

    // 유저이메일 값 변화 인지 인풋 핸들러
    const onChangeEmailHandler = (e) => {
        // 초기값
        const newEmail = e.target.value;
    
        setEmail(newEmail);
        const emailExp =
            /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;
    
        if (!emailExp.test(newEmail)) {
            setEmailchkMessage("이메일의 형식이 올바르지 않습니다");
            setIsEmail(false);
        } else {
            setEmailchkMessage("");
            setIsEmail(true);
        }
    }

    // 아이디 찾기 버튼 클릭시
    const handleFindId = async(e) => {
        e.preventDefault(); //리프레시되는것 막기
        
        // 백에서 가져온 데이터 비교 했을때
        // 확인부탁
        let username = name; // 이름 상태 가져오기
        let useremail = email; // 이메일 상태 가져오기

        if (username === useremail) { //값이 같으면
            setIdMessage('백에서 가져온 아이디');
            // 리턴메세지 대신 백에서 가져온 일치하는 값 넣기
        } else {
            setIdMessage('아이디를 찾을 수 없습니다');
        }
    }

    return (
        <>
            <button className="goto" onClick={openModal}>아이디 찾기</button>
            <ModalComponent
                title="아이디찾기"
                isOpen={modalIsOpen}
                closeModal={closeModal}
            >
                <InputWrap>
                <div className="error-form">
                    <label className='sub-title' htmlFor='username'>이름</label>
                    <div className='error'>{nameMessage}</div>
                </div>
                    <input
                        type='text' 
                        id='username' 
                        value={name} 
                        maxLength={10} 
                        placeholder='이름을 입력해주세요' 
                        onChange={onChangeNameHandler}
                    >
                    </input>
                </InputWrap>

                <InputWrap>
                <div className="error-form">
                    <label className='sub-title' htmlFor='useremail'>이메일</label>
                    <div className='error'>{emailchkMessage}</div>
                </div>
                    <input type='email' 
                            id='useremail' 
                            value={email} 
                            placeholder='이메일주소를 입력해주세요' 
                            onChange={onChangeEmailHandler}
                    >
                    </input>
                </InputWrap>

                <FindArea>
                    {/* 이름과 이메일주소가 일치하면 아이디를 보여줌 */}
                    <p className="find-text">{setIdMessage}</p>
                </FindArea>

                <button  type="submit" onClick={handleFindId}>찾기</button>
                <button className="goto-pw">비밀번호 찾으러 가기</button>
            </ModalComponent>
        </>
    );
};

export const Findpwmodal = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    // 초기값
    const [id, setId] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPw, setConfirmPw] = useState('');

    // 오류메세지
    const [idMessage, setIdMessage] = useState('');
    const [emailchkMessage, setEmailchkMessage] = useState('');
    const [pwMessage, setPwMessage] = useState('');
    const [pwConfirmMessage, setPwConfirmMessage] = useState('');

    // 유효성 확인을 위한 상태변화 세팅
    const [isId, setIsId] = useState('');
    const [isPw, setIsPw] = useState('');
    const [isPwConfirm, setIsPwConfirm] = useState('');
    const [isEmail, setIsEmail] = useState('');

    // 유저아이디값 변화 인지 인풋핸들러
    const onChangeIdHandler = (e) => {
        // 초기값
        setId(e.target.value);

        // 아이디 입력시 구조 설정
        const idExp = /^[a-zA-z0-9]{4,12}$/;
    
        // 아이디 유효성 확인(구조에 맞게 입력했는지 확인)
        if (!idExp.test(id)) {
            setIdMessage("4-12사이 대소문자 또는 숫자만 입력해 주세요!");
            setIsId(false);
        } else {
            setIdMessage("");
            setIsId(true);
        }
    }

    // 유저이메일 값 변화 인지 인풋 핸들러
    const onChangeEmailHandler = (e) => {
        // 초기값
        const newEmail = e.target.value;
    
        setEmail(newEmail);
        const emailExp =
            /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;
    
        if (!emailExp.test(newEmail)) {
            setEmailchkMessage("이메일의 형식이 올바르지 않습니다");
            setIsEmail(false);
        } else {
            setEmailchkMessage("");
            setIsEmail(true);
        }
    }

    // 유저비밀번호값 변화 인지 인풋핸들러
    const onChangePasswordHandler = (e) => {
        // 초기값
        const newPassword = e.target.value; // 입력된 새 비밀번호

        // 비밀번호 입력시 구조 설정
        const pwExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
        if (!pwExp.test(newPassword)) {
            setPwMessage("숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!");
            setIsPw(false);
        } else {
            setPwMessage("");
            setIsPw(true);
        }
        // 입력된 비밀번호 설정
        setPassword(newPassword);
    }

    // 유저비밀번호값 일치 변화 인지 인풋핸들러
    const onConfirmPasswordHandler = (e) => {
        // 초기값
        const confirmPassword = e.target.value; // 입력된 확인 비밀번호

        // 비밀번호 일치 여부 확인
        if (password !== confirmPassword) {
            setPwConfirmMessage("비밀번호가 일치하지 않습니다");
            setIsPwConfirm(false);
        } else {
            setPwConfirmMessage("");
            setIsPwConfirm(true);
        }
        // 입력된 확인 비밀번호 설정
        setConfirmPw(confirmPassword);
    }

    // 재설정하기 버튼 클릭
    const onClickReset = () => {
        console.log("회원가입 버튼 클릭")
        // // input 입력 정보 controller 로 넘기기
        // const formData = new FormData();
        // formData.append('name', document.querySelector("#username").value);
        // formData.append('id', document.querySelector("#userid").value);
        // formData.append('password', document.querySelector("#userpw").value);
        // formData.append('email', document.querySelector("#useremail").value);

        // axios.post(baseUrl+"/register",formData).then(response => {
        //     if (response.data !== '') {
        //         alert(response.data);
        //     }
        // })
        //     .catch(error => {
        //         console.error('에러:', error);
        //         alert('임솔 다시!');
        //     });
    }

    return (
        <>
            <button className="goto" onClick={openModal}>비밀번호 찾기</button>
            <ModalComponent
                title="비밀번호찾기"
                isOpen={modalIsOpen}
                closeModal={closeModal}
            >
                <InputWrap>
                    <div className='error-form'>
                        <label className='sub-title' htmlFor='userid'>아이디</label>
                        <div className='error'>{idMessage}</div>
                    </div>
                    <input
                        type='text' 
                        id='userid' 
                        value={id} 
                        placeholder='가입 한 아이디를 입력해주세요' 
                        onChange={onChangeIdHandler}
                    >
                    </input>
                </InputWrap>

                <InputWrap>
                    <div className='error-form'>
                        <label className='sub-title'>이메일</label>
                        <div className='error'>{emailchkMessage}</div>
                    </div>
                    <input
                        type='email' 
                        id='useremail' 
                        value={email} 
                        placeholder='가입 한 이메일주소를 입력해주세요' 
                        onChange={onChangeEmailHandler}
                    >
                    </input>
                </InputWrap>

                <InputWrap className="find-style">
                    <div className='error-form'>
                        <label className='sub-title'>비밀번호 재설정</label>
                        <div className='error'>{pwMessage}</div>
                    </div>
                    <input
                        type='password' 
                        id='userpw' 
                        value={password}
                        minLength={8}
                        maxLength={20}
                        placeholder='새로운 비밀번호를 입력해주세요(문자, 숫자, 특수문자 포함 0~20자)' 
                        onChange={onChangePasswordHandler}
                    >
                    </input>
                </InputWrap>
                <InputWrap className="find-style">
                    <div className='error-form'>
                        <label className='sub-title'>비밀번호 한번더 입력하기</label>
                        <div className='error'>{pwConfirmMessage}</div>
                    </div>
                    <input
                        type='password' 
                        id='userpw-re' 
                        value={confirmPw}
                        minLength={8}
                        maxLength={20}
                        placeholder='비밀번호를 다시 한 번 입력 해주세요'
                        onChange={onConfirmPasswordHandler}
                    >
                    </input>
                </InputWrap>
                

                <button className="margin-top" onClick={onClickReset}>재설정 하기</button>
            </ModalComponent>
        </>
    );
};