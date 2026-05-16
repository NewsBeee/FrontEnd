import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StepIndicator from "../common/StepIndicator";
import Header from "../layout/Header";
import Logo from '../../assets/logo3.png';
import Loading from "../common/Loading";
import Error from "../common/Error";
import "./styles/quiz.css";

import { useAuth } from "../../hooks/useAuth";

export default function Quiz({ type, loading, error, sessionId, 
    currentQuestion, currentIndex, selectedChoiceId, 
    selectAnswer, submitAnswer, result, retry 
}) {
    const navigate = useNavigate();
    const { user, saveUser } = useAuth();

    useEffect(() => {
        if (!result) return;

        if (type === "promotion") {
            navigate("/splash/promotion", {
                state: { type: "promotion", result }               
            })
        }
        
        if (type === "onboarding") {
            saveUser({
                ...user,
                onboardingCompleted: true,
                level: result.level,
            })

            navigate("/splash/onboarding", {
                state: { type: "onboarding", result }
            });
        }
    }, [result, type, navigate]);

    if (loading) return <Loading />;
    if (error) {
        return (
            <Error 
                message="문항을 불러오지 못했습니다."
                onRetry={retry}
            />
        );
    }
    if (!currentQuestion) {
        return (
            <Error 
                message="생성된 문항이 없습니다."
                onRetry={retry}
            />
        );
    }

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
                                className={selectedChoiceId === choice.choiceId ? "active" : ""}
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