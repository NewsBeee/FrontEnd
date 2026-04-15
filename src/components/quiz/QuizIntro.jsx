import { useNavigate } from "react-router-dom";
import Header from "../layout/Header";
import BackButton from "../common/BackButton";
import StepIndicator from "../common/StepIndicator"
import Img from "../../assets/image2.png"
import './styles/quiz-intro.css'

export default function QuizIntro({ type }) {
    const navigate = useNavigate();

    return (
        <>
            <Header left={<BackButton />} />
            {type === "onboarding" && <StepIndicator currentStep={3} />}
            <main className="main-content">
                <div className="quizintro-wrapper">
                    <div className="quizintro-welcome">
                        {type === "onboarding" ? (
                            <>맞춤 서비스 제공을 위한 <br /> 퀴즈를 시작할게요!</>
                        ) :
                        (
                            <>레벨업 기회가 찾아왔어요!</>
                        )}
                        
                        <p>준비 되셨다면 퀴즈풀기 버튼을 눌러주세요</p>
                    </div>
                    <div className="quiz-img">
                        <img src={Img} />
                    </div>
                    {type === "onboarding" ? 
                        <button className="quizintro-btn" onClick={() => navigate('/quiz/onboarding')}>퀴즈 풀기</button>
                        : <button className="quizintro-btn" onClick={() => navigate('/quiz/promotion')}>퀴즈 풀기</button>}
                    
                </div>
            </main>
        </>
    )
}