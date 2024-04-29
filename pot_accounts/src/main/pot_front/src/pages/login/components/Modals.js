// 수정된 모달 컴포넌트
import React, { useState } from "react";
import Modal from 'react-modal';
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './modalstyle.scss';
import { FindArea, FromWrap, InputWrap } from "./Modalstyle";
import axios from "axios";
// 기본 boot url
const baseUrl = "http://localhost:9596";
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
       //  let resetInputId = document.querySelector("[name=name]");
       //  let resetInputEmail = document.querySelector("[name=email]");
       // if(resetInputId.value!="" && resetInputEmail.value!=""){
       //     resetInputId.value = "";
       //     resetInputEmail.value ="";
       // }
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
    const [findIdMessage, setFindIdMessage] = useState('');

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
        //e.preventDefault(); //리프레시되는것 막기
        
        // 백에서 가져온 데이터 비교 했을때
        // 확인부탁
        let username = document.querySelector("[name=name]").value; // 이름 상태 가져오기
        let useremail = document.querySelector("[name=email]").value; // 이메일 상태 가져오기

        axios.post(baseUrl+"/findId",null,{
            headers: { },
            params: { name : username , email : useremail}
        })
            .then(response => {
                if (response.data !=='') {
                    alert('해당 정보의 아이디는'+response.data);
                    setFindIdMessage('아이디 정보 : '+response.data);
                    e.preventDefault();
                }else{
                    alert('해당 정보가 없습니다')
                    setFindIdMessage('아이디를 찾을 수 없습니다');
                }
            })
            .catch(error => {
                console.error('아이디찾기 에러:', error);
            });
    }

    return (
        <>
            <button className="goto" onClick={openModal}>아이디 찾기</button>
            <ModalComponent
                title="아이디찾기"
                isOpen={modalIsOpen}
                closeModal={closeModal}
            >
                <form id="findIdForm">
                <InputWrap>
                <div className="error-form">
                    <label className='sub-title' htmlFor='username'>이름</label>
                    <div className='error'>{nameMessage}</div>
                </div>
                    <input
                        type='text'
                        name = 'name'
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
                           name = 'email'
                            id='useremail'
                            value={email}
                            placeholder='이메일주소를 입력해주세요'
                            onChange={onChangeEmailHandler}
                    >
                    </input>
                </InputWrap>
                </form>
                <FindArea>
                    {/* 이름과 이메일주소가 일치하면 아이디를 보여줌 */}
                    <p className="find-text">{findIdMessage}</p>
                </FindArea>

                <button  type="button" onClick={handleFindId}>찾기</button>
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
        console.log("재설정 버튼 클릭")
        let formData01  = new FormData();
        formData01.append('password',document.querySelector("#userpw-re").value);
        console.log("비밀번호"+document.querySelector("#userpw-re").value);
        formData01.append('id',document.querySelector("#pwdInput01 [name=id]").value);
        console.log("아이디"+document.querySelector("#pwdInput01 [name=id]").value);
        if(setIsPwConfirm){
            axios.post(baseUrl+"/resetPwd",formData01)
                .then(res=>{
                    //alert(res.data)
                    const confirmPwd = window.confirm(res.data + "/n 새로 로그인 해주세요");
                    if (confirmPwd) {
                        window.location.href = "http://localhost:3000";
                    }
                })
                .catch(error=>{
                console.log("비밀번호 재설정 에러"+error)
            })
        }
    }

    const onClickCheck = function() {
        // post로 넘겨줄 param 값
        let id = document.querySelector("#pwdInput01 [name=id]").value; // 아이디 값 가져오기
        let email = document.querySelector("#pwdInput02 #userpwdemail").value; // 이메일 값 가져오기

        axios.post(baseUrl+"/findPwd",null,{
            headers: { },
            params: { id : id , email : email}
        })
            .then(response => {
                if (response.data !=='') {
                    // DB속 비밀번호
                    //alert('해당 정보의 비밀번호'+response.data);
                    //setIsEmail(true);
                    //setIsId(true);
                    document.getElementById('resetInput').style.display = 'block';
                    document.getElementById('checkButton').style.display = 'none';
                    document.getElementById('resetBtn').style.display = 'block';

                }else{
                    alert('해당 정보가 없습니다')
                    document.getElementById('resetInput').style.display = 'node';
                    document.getElementById('checkButton').style.display = 'block';
                    document.getElementById('resetBtn').style.display = 'none';

                }
            })
            .catch(error => {
                console.error('비밀번호 찾기 에러:', error);
            });

    };
    return (
        <>
            <button className="goto" onClick={openModal}>비밀번호 찾기</button>
            <ModalComponent
                title="비밀번호찾기"
                isOpen={modalIsOpen}
                closeModal={closeModal}
            >
                <InputWrap id="pwdInput01">
                    <div className='error-form'>
                        <label className='sub-title' htmlFor='userid'>아이디</label>
                        <div className='error'>{idMessage}</div>
                    </div>
                    <input
                        type='text'
                        name='id'
                        id='userid'
                        value={id}
                        placeholder='가입 한 아이디를 입력해주세요'
                        onChange={onChangeIdHandler}
                    />
                </InputWrap>

                <InputWrap id="pwdInput02">
                    <div className='error-form'>
                        <label className='sub-title'>이메일</label>
                        <div className='error'>{emailchkMessage}</div>
                    </div>
                    <input
                        type='email'
                        name='email'
                        id='userpwdemail'
                        value={email}
                        placeholder='가입 한 이메일주소를 입력해주세요'
                        onChange={onChangeEmailHandler}
                    />
                </InputWrap>
                <button className="margin-top" id="checkButton" onClick={onClickCheck}>정보찾기</button>

                <div id="resetInput" style={{display: 'none'}}>
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
                        />
                    </InputWrap>
                    <InputWrap className="find-style">
                        <div className='error-form'>
                            <label className='sub-title'>비밀번호 한번더 입력하기</label>
                            <div className='error'>{pwConfirmMessage}</div>
                        </div>
                        <input
                            name='password'
                            type='password'
                            id='userpw-re'
                            value={confirmPw}
                            minLength={8}
                            maxLength={20}
                            placeholder='비밀번호를 다시 한 번 입력 해주세요'
                            onChange={onConfirmPasswordHandler}
                        />
                    </InputWrap>
                </div>
                <button className="margin-top" id="resetBtn" onClick={onClickReset} style={{display:'none'}}>재설정 하기</button>
            </ModalComponent>
        </>
    )};