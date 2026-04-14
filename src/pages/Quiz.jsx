import { useState } from "react";
import { useParams } from "react-router-dom";
import BackButton from "../components/common/BackButton";
import StepIndicator from "../components/common/StepIndicator";
import Header from "../components/layout/Header";
import "../styles/quiz.css";

export default function Quiz() {
    // 임시
    const quizData = [
        {
            questionType: "blank", // 빈칸 채우기
            question: "빈칸에 들어갈 알맞은 단어를 고르세요",
            example: "정부는 올해 하반기까지 ____ 정책을 지속해 중소기업 대출 금리를 낮출 계획이라고 밝혔다",
            options: ["긴축재정", "양적완화", "디커플링", "스태그플레이션"]
        },
        {
            questionType: "meaning", // 뜻 고르기
            question: "다음 중 올바른 뜻을 고르세요",
            example: "경상수지",
            options: ["기업이 해외에 투자한 자본의 총합", "국가 간 상품, 서비스 거래의 수입과 지출 차이",
                "중앙은행이 설정한 기준 금리", "국내 총생산 대비 수출 비율"
            ]
        }
    ]
    const cq = quizData[1];

    const [selected, setSelected] = useState(null);
    const { type } = useParams();

    return (
        <>
            <Header left={<BackButton />} />
            {type === "onboarding" && <StepIndicator currentStep={3} />}

            <main className="main-content">
                <div className="quiz-wrapper">
                    <div className="quiz-container">
                        <div className="quiz-number">(1/10)</div>
                        <div className="quiz-theme">
                            {cq.questionType === "meaning" ? "뜻 고르기" : "빈칸 채우기"}
                        </div>
                        <div className="quiz-question">
                            {cq.question}
                        </div>
                    </div>
                    
                    <div className={`quiz ${cq.questionType}`}>
                        {cq.example}
                    </div>
                    <div className="quiz-answer">
                        {cq.options.map((opt, idx) => (
                            <button 
                                key={idx}
                                className={selected === opt ? "active" : ""}
                                onClick={() => setSelected(opt)}
                            >
                                {opt}
                            </button>
                        ))}
                    </div>
                </div>
            </main>
        </>
    )
}