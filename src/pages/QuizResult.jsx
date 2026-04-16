import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/layout/Header";
import SuccessImg from '../assets/finish.png';
import FailImg from '../assets/sad2.png';
import '../styles/quiz-result.css';

export default function QuizResult() {
    const location = useLocation();
    const navigate = useNavigate();
    const { result } = location.state || {};

    // if (!result) return <div>잘못된 접근입니다.</div>;

    const isPassed = true// result.passed;

    return (
        <>
            <Header />
            <main className="main-content">
                <div className="qr-wrapper">
                    {isPassed ? (
                        <>
                            <div className="qr-welcome">
                                승급을 축하합니다!
                                <p>{result.previousLevel} → {result.newLevel}</p> 
                            </div>
                            <img src={SuccessImg} />
                        </>
                    ) : (
                        <>
                            <div className="qr-welcome">
                                승급하지 못했어요...
                                <p>도장을 모아서 다시 도전할 수 있어요!</p>
                            </div>
                            <img src={FailImg} />
                        </>
                    )}
                    
                    <button className="qr-btn" onClick={() => navigate("/challenge")}>확인</button>
                </div>
            </main>
        </>
    )
}