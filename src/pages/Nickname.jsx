import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BackButton from "../components/common/BackButton";
import Header from "../components/layout/Header";
import StepIndicator from "../components/common/StepIndicator";
import '../styles/nickname.css'

import { signUp } from '../api/authApi';

export default function Nickname() {
    const location = useLocation();
    const navigate = useNavigate();

    const { email, password } = location.state || {};
    const [nickname, setNickname] = useState('');

    async function handleSignup(e) {
        e.preventDefault();

        if (!email || !password) {
            alert("회원가입 정보가 없습니다. 처음부터 다시 진행해주세요.");
            navigate("/signup");
            return;
        }

        if (!nickname) {
            alert('닉네임을 입력해주세요.');
            return;
        }

        try {
            await signUp({ email, password, nickname });

            navigate('/signup/onboarding');
        } catch (err) {
            console.error(err);
            alert("회원가입에 실패했습니다.")
        }
    }

    return (
        <>
            <Header left={<BackButton />} />
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
                                    onChange={(e) => setNickname(e.target.value)}
                                />
                                <p>닉네임은 2~10자 이내로 입력해주세요.</p>
                            </div>
                        </form>
                    </div>
                    <button className="nickname-btn" form="nicknameForm">
                        다음
                    </button>
                </div>
            </main>
        </>
    )
}