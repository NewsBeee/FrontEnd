import Header from "../components/layout/Header";
import SuccessImg from '../assets/finish.png';
import FailImg from '../assets/sad2.png';
import '../styles/quiz-result.css';

export default function QuizResult() {
    return (
        <>
            <Header />
            <main className="main-content">
                <div className="qr-wrapper">
                    {/* 승급 */}
                    <div className="qr-welcome">
                        승급을 축하합니다!
                        <p>앞으로도 꾸준히 공부해봐요!</p>
                    </div>
                    <img src={SuccessImg} />
                     {/* 탈락 */}
                     <div className="qr-welcome">
                        승급하지 못했어요...
                        <p>도장을 모아서 다시 도전할 수 있어요!</p>
                    </div>
                    <img src={FailImg} />

                    <button className="qr-btn"></button>
                </div>
            </main>
        </>
    )
}