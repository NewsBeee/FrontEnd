import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/layout/Header";
import BackButton from "../components/common/BackButton";
import StepIndicator from "../components/common/StepIndicator"
import Img from "../assets/image2.png"
import '../styles/quiz-intro.css'

export default function QuizIntro({ type }) {
    const navigate = useNavigate();
    const params = useParams();

    const quizType = type || params.type;

    function handleStart() {
        if (quizType === "onboarding") {
            navigate("/signup/onboarding");
            return;
        }

        if (quizType === "promotion") {
            navigate("/promotion");
            return;
        }
    }

    return (
        <>
            <Header left={<BackButton />} />
            {quizType === "onboarding" && <StepIndicator currentStep={3} />}
            <main className="main-content">
                <div className="quizintro-wrapper">
                    <div className="quizintro-welcome">
                        {quizType === "onboarding" ? (
                            <>맞춤 서비스 제공을 위한 <br /> 퀴즈를 시작할게요!</>
                        ) : (
                            <>레벨업 기회가 찾아왔어요!</>
                        )}
                        
                        <p>준비 되셨다면 퀴즈풀기 버튼을 눌러주세요</p>
                    </div>
                    <div className="quiz-img">
                        <img src={Img} />
                    </div>
                    
                    <button className="quizintro-btn" onClick={handleStart}>문제 풀기</button>
                </div>
            </main>
        </>
    )
}