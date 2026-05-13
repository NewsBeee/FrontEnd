import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import StepIndicator from "../components/common/StepIndicator";
import Header from "../components/layout/Header";
import Logo from '../assets/logo3.png';
import Loading from "../components/common/Loading";
import Error from "../components/common/Error";
import "../styles/quiz.css";

import { useOnboarding } from "../hooks/useOnboarding";
import { usePromotion } from "../hooks/usePromotion";

export default function Quiz() {
    const { type } = useParams();
    const navigate = useNavigate();

    const obHook = useOnboarding();
    const pmHook = usePromotion();

    const quizHook = type === "onboarding" ? obHook : pmHook;

    const {
        loading,
        error,
        currentQuestion,
        currentIndex,
        selectedChoiceId,
        selectAnswer,
        submitAnswer,
        result
    } = quizHook;

    useEffect(() => {
        if (!result) return;

        if (type === "promotion") {
            navigate("/splash/promotion", {
                state: { type: "promotion", result }               
            })
        }
        
        if (type === "onboarding") {
            navigate("/splash/onboarding", {
                state: { type: "onboarding", result }
            });
        }
    }, [result, type, navigate]);

    if (loading) return <Loading />;
    if (error) return <Error />;
    if (!currentQuestion) return <Error />;

    return (
        <>
            <Header left={<img src={Logo} style={{ width: '121px' }}/>} />
            {type === "onboarding" && <StepIndicator currentStep={3} />}

            <main className="main-content">
                <div className="quiz-wrapper">
                    <div className="quiz-container">
                        <div className="quiz-number">
                            {currentIndex + 1}/10
                        </div>
                        <div className="quiz-theme">
                            {currentQuestion.questionText?.includes("빈칸")
                                ? "빈칸 채우기"
                                : currentQuestion.questionText?.includes("뜻")
                                ? "뜻 고르기"
                                : ""
                            }
                        </div>
                        <div className="quiz-question">
                            {currentQuestion.questionText}
                        </div>
                    </div>
                    
                    {/* <div className={`quiz ${cq.questionType}`}>
                        {cq.example}
                    </div> */}
                    <div className="quiz-answer">
                        {currentQuestion.choices?.map(choice => (
                            <button 
                                key={choice.choiceId}
                                className={selected === choice.choiceId ? "active" : ""}
                                onClick={() => {
                                    selectAnswer(choice.choiceId);
                                }}
                            >
                                {choice.choiceText}
                            </button>
                        ))}
                    </div>
                    
                    <button 
                        className="next-btn" 
                        onClick={submitAnswer}
                        disabled={selectedChoiceId === null}
                    >
                        다음
                    </button>
                   
                </div>
            </main>
        </>
    )
}