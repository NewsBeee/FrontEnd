import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/common/BackButton";
import Header from "../components/layout/Header";
import StepIndicator from "../components/common/StepIndicator";
import '../styles/nickname.css'

export default function Nickname() {
    const navigate = useNavigate();
    const [nickname, setNickname] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        // if (!nickname) {
        //     alert('닉네임을 입력해주세요.');
        //     return;
        // }
        navigate('/signup/onboarding');
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
                        <form className="nickname-form" id="nicknameForm" onSubmit={handleSubmit}>
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