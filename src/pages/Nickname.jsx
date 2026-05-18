import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BackButton from "../components/common/BackButton";
import Header from "../components/layout/Header";
import StepIndicator from "../components/common/StepIndicator";
import '../styles/nickname.css'

import { signUp, login } from '../api/authApi';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../hooks/useToast';

export default function Nickname() {
    const location = useLocation();
    const navigate = useNavigate();
    const { setUser } = useAuth();
    const { showToast } = useToast();

    const email = location.state?.email;
    const password = location.state?.password;
    const confirmPassword = location.state?.confirmPassword;
    const [nickname, setNickname] = useState('');
    const [nicknameError, setNicknameError] = useState('');

    const isEmpty = !nickname.trim();

    async function handleSignup(e) {
        e.preventDefault();

        if (!email || !password) {
            alert("회원가입 정보가 없습니다. 처음부터 다시 진행해주세요.");
            navigate("/signup");
            return;
        }

        if (!nickname.trim()) {
            setNicknameError('닉네임을 입력해주세요.')
            showToast("닉네임을 입력해주세요.", "error");
            return;
        }

        setNicknameError("");

        try {
            await signUp({ email, password, nickname });
            // console.log("회원가입 완료");

            const loginData = await login({email, password});
            // console.log("로그인 완료")

            if (loginData && loginData.result) {
                setUser(loginData.result);
            }

            navigate('/quiz-intro/onboarding');
        } catch (err) {
            console.error(err);
            showToast(err.message, "fail");
        }
    }

    return (
        <>
            <Header left={<BackButton to="/signup" state={{email, password, confirmPassword}}/>} />
            <StepIndicator currentStep={2} />
            <main className="main-content">
                <div className="nickname-wrapper">
                    <div className="nickname-welcome">
                        어떻게 불리고 싶으신가요?
                        <p>서비스에서 회원님을 지칭할 닉네임을 설정해주세요.</p>
                    </div>
                    <div className="nickname-content">
                        <form className="nickname-form" id="nicknameForm" onSubmit={handleSignup}>
                            <div className="form-input">
                                <label>닉네임</label>
                                <input
                                    type="text"
                                    value={nickname}
                                    onChange={(e) => {
                                        setNickname(e.target.value);
                                        setNicknameError('');
                                    }}
                                />
                                {nicknameError ? (
                                    <p className="error-message">{nicknameError}</p>
                                ) : (
                                    <p>닉네임은 2~10자 이내로 입력해주세요.</p>
                                )}
                            </div>
                        </form>
                    </div>
                    <button 
                        className={`nickname-btn ${isEmpty ? 'disabled' : ''}`}
                        form="nicknameForm"
                    >
                        다음
                    </button>
                </div>
            </main>
        </>
    )
}