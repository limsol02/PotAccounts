import React, { useState } from 'react';
import LogoImage from '../../assets/images/PotAccounts-logo.png'
// 스타일적용
import { FromWrap, ImageSize, InputWrap, LeftInner, RightInner, Wrap, WrapInner, WrapInnerR } from './Signupstyle';
import  './signupstyle.scss'

const SignUp = () => {

    // 초기값세팅 - 이름,아이디,패스워드,패스워드확인,이메일,이메일인증확인
    const [name, setName] = useState('');
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPw, setConfirmPw] = useState('');
    const [email, setEmail] = useState('');
    const [emailchk, setEmailchk] = useState('');

    // 오류메세지 확인을 위한 상태변화 세팅
    const [idMessage, setIdMessage] = useState('');
    const [pwMessage, setPwMessage] = useState('');
    const [pwConfirmMessage, setPwConfirmMessage] = useState('');
    const [emailchkMessage, setEmailchkMessage] = useState('');

    // 유효성 확인을 위한 상태변화 세팅
    const [isId, setIsId] = useState('');
    const [isPw, setIsPw] = useState('');
    const [isPwConfirm, setIsPwConfirm] = useState('');
    const [isEmail, setIsEmail] = useState('');

    


    // 유저네임값 변화 인지 인풋핸들러
    const onChangeNameHandler = (e) => {
        // 초기값
        setName(e.target.value);
    }

    // 유저아이디값 변화 인지 인풋핸들러
    const onChangeIdHandler = (e) => {
        // 초기값
        setId(e.target.value);
    }
    // 아이디중복확인 버튼 클릭시
    const onClickId = () => {
        // 아이디 입력시 구조 설정
        const idExp = /^[a-zA-z0-9]{4,12}$/;
    
        // 아이디 유효성 확인(구조에 맞게 입력했는지 확인)
        if (!idExp.test(id)) {
            setIdMessage("4-12사이 대소문자 또는 숫자만 입력해 주세요!");
            setIsId(false);
        } else {
            setIdMessage("사용가능한 아이디 입니다.");
            setIsId(true);
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
    // 이메일 보내기 버튼 클릭시
    const onClickEmail = () => {
        console.log('이메일보내기')
        alert('이메일로 인증번호를 발송 했습니다')
    }

    // 유저이메일인증번호 값 변화 인지 인풋 핸들러
    const onChangeEmailChkHandler = (e) => {
        // 이메일 인증번호 기능 추가 후 작성할 예정
    }

    // 회원가입 처리 -> 회원가입버튼클릭시 유효성 검사
    const handleSignUpHandler = async(e) =>{
        e.preventDefault(); //리프레시되는것 막기
        await new Promise((r) => setTimeout(r, 1000));

        // 아이디값이 제대로 입력되지 않을시 오류메세지 출력
        if (!isId) {
            return idMessage;
        }
    }
    

    return (
        <Wrap>
            <WrapInner>
                <LeftInner>
                    <h3 className='main-title'>Sign Up</h3>

                    <FromWrap  onClick={handleSignUpHandler}>

                        <InputWrap>
                            <label className='sub-title' htmlFor='username'>이름</label>
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
                            <div className='error-form'>
                                <label className='sub-title' htmlFor='userid'>아이디</label>
                                <div className='error'>{idMessage}</div>
                            </div>
                            <div className='button-wrap'>
                                <input
                                    type='text' 
                                    id='userid' 
                                    value={id} 
                                    placeholder='사용 할 아이디를 입력해주세요' 
                                    onChange={onChangeIdHandler}
                                    >
                                </input>
                                <button className='button-style' onClick={onClickId}>중복확인</button>
                            </div>
                        </InputWrap>

                        <InputWrap>
                            <div className='error-form'>
                                <label className='sub-title' htmlFor='userpw'>비밀번호</label>
                                <div className='error'>{pwMessage}</div>
                            </div>
                            <input
                                type='password' 
                                id='userpw' 
                                value={password}
                                minLength={8}
                                maxLength={20}
                                placeholder='비밀번호를 입력해주세요(문자, 숫자, 특수문자 포함 0~20자)' 
                                onChange={onChangePasswordHandler}
                            >
                            </input>
                            
                        </InputWrap>

                        <InputWrap>
                            <div className='error-form'>
                                <label className='sub-title' htmlFor='userpw-re'>비밀번호 확인</label>
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

                        <InputWrap>
                            <div className='error-form'>
                                <label className='sub-title' htmlFor='useremail'>이메일</label>
                                <div className='error'>{emailchkMessage}</div>
                            </div>
                            <div className='button-wrap'>
                                <input
                                    type='email' 
                                    id='useremail' 
                                    value={email} 
                                    placeholder='이메일주소를 입력해주세요' 
                                    onChange={onChangeEmailHandler}
                                >
                                </input>
                                <button className='button-style' onClick={onClickEmail}>인증메일</button>
                            </div>
                            <input
                                type='text' 
                                value={emailchk} 
                                placeholder='이메일 인증번호를 입력해주세요'
                                onChange={onChangeEmailChkHandler}
                            >
                            </input>
                        </InputWrap>

                        <button className='button-submit' htmlType="submit">회원가입</button>
                    </FromWrap>
                </LeftInner>
            </WrapInner>



            <WrapInnerR>
                <RightInner>
                    <ImageSize src={LogoImage} alt="Pot_Accounts-logo" />
                </RightInner>
            </WrapInnerR>
        </Wrap>
    )
}

export default SignUp;