import { use, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useOnboarding } from "../hooks/useOnboarding";
import { usePromotion } from "../hooks/usePromotion";
import BackButton from "../components/common/BackButton";
import StepIndicator from "../components/common/StepIndicator";
import Header from "../components/layout/Header";
import "../styles/quiz.css";

export default function Quiz() {
    // 임시
    // const quizData = [
    //     {
    //         questionType: "blank", // 빈칸 채우기
    //         question: "빈칸에 들어갈 알맞은 단어를 고르세요",
    //         example: "정부는 올해 하반기까지 ____ 정책을 지속해 중소기업 대출 금리를 낮출 계획이라고 밝혔다",
    //         options: ["긴축재정", "양적완화", "디커플링", "스태그플레이션"]
    //     },
    //     {
    //         questionType: "meaning", // 뜻 고르기
    //         question: "다음 중 올바른 뜻을 고르세요",
    //         example: "경상수지",
    //         options: ["기업이 해외에 투자한 자본의 총합", "국가 간 상품, 서비스 거래의 수입과 지출 차이",
    //             "중앙은행이 설정한 기준 금리", "국내 총생산 대비 수출 비율"
    //         ]
    //     }
    // ]

    const { type } = useParams();
    const navigate = useNavigate();
    const [selected, setSelected] = useState(null);

    const quizHook = type === "onboarding" ? useOnboarding() : usePromotion();
    const {
        loading,
        currentQuestion,
        currentIndex,
        total,
        selectAnswer,
        nextQuestion,
        submitQuiz,
        result
    } = quizHook;

    // const [currentIndex, setCurrentIndex] = useState(0);

    // const cq = quizData[currentIndex];

    // const isLastQuestion = currentIndex === quizData.length - 1;

    // const handleNext = () => {
    //     if (!selected) return;

    //     if (!isLastQuestion) {
    //         setCurrentIndex(prev => prev + 1);
    //         setSelected(null);
    //     } else {
    //         navigate(`/splash/${type}`);
    //     }
    // }

    // if (currentIndex >= quizData.length) {
    //     return <div>퀴즈 끝</div>;
    // }

    useEffect(() => {
        if (!result) return;

        if (type === "promotion") {
            navigate("/splash/promotion", {
                state: { type: "promotion", result }               
            })
        }
        
        if (type === "onboarding") {
            navigate("/splash/onboarding", {
                state: { type: "onboarding"}
            });
        }
    }, [result, type]);

    if (loading) return <div>로딩 중...</div>;

    return (
        <>
            <Header left={<BackButton />} />
            {type === "onboarding" && <StepIndicator currentStep={3} />}

            <main className="main-content">
                <div className="quiz-wrapper">
                    <div className="quiz-container">
                        <div className="quiz-number">
                            ({currentIndex + 1}/{total})
                        </div>
                        <div className="quiz-theme">
                            {currentQuestion?.questionText?.includes("빈칸")
                                ? "빈칸 채우기"
                                : currentQuestion?.questionText?.includes("뜻")
                                ? "뜻 고르기"
                                : ""
                            }
                        </div>
                        <div className="quiz-question">
                            {currentQuestion?.questionText}
                        </div>
                    </div>
                    
                    {/* <div className={`quiz ${cq.questionType}`}>
                        {cq.example}
                    </div> */}
                    <div className="quiz-answer">
                        {currentQuestion?.choices.map(choice => (
                            <button 
                                key={choice.choiceId}
                                className={selected === choice.choiceId ? "active" : ""}
                                onClick={() => {
                                    setSelected(choice.choiceId);
                                    selectAnswer(currentQuestion.questionId, choice.choiceId);
                                }}
                            >
                                {choice.choiceText}
                            </button>
                        ))}
                    </div>
                    {currentIndex < total - 1 ? (
                        <button className="next-btn" onClick={nextQuestion}>다음</button>
                    ) : (
                        <button className="next-btn" onClick={submitQuiz}>완료</button>
                    )}
                </div>
            </main>
        </>
    )
}