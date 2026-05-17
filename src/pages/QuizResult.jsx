import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import Header from "../components/layout/Header";
import Error from "../components/common/Error";
import Logo from "../assets/logo3.png"
import SuccessImg from '../assets/finish.png';
import FailImg from '../assets/sad2.png';
import '../styles/quiz-result.css';

export default function QuizResult() {
    const location = useLocation();
    const navigate = useNavigate();
    const { result } = location.state || {} ;

    if (!result) return <Error goHome={true}/>;

    const isPassed = result.passed;

    return (
        <>
            <Header left={<img src={Logo} style={{ width: '121px' }}/>}/>
            <main className="main-content">
                <div className="qr-wrapper">
                    {isPassed ? (
                        <>
                            <div className="qr-welcome">
                                <div className="qr-result">승급을 축하합니다!</div>
                                <div className="qr-level">
                                   <div className="qr-level-prev">Lv.{result.previousLevel}</div> 
                                   <div className="qr-arrow"><FaArrowRight /></div> 
                                   <div className="qr-level-new">Lv.{result.newLevel}</div>
                                </div> 
                            </div>
                            <img src={SuccessImg} width={200} />
                        </>
                    ) : (
                        <>
                            <div className="qr-welcome">
                                <div className="qr-result">승급하지 못했어요...</div>
                                <dic className="qr-message">도장을 모아서 다시 도전할 수 있어요!</dic>
                            </div>
                            <img src={FailImg} width={195} />
                        </>
                    )}
                    
                    <button className="qr-btn" onClick={() => navigate("/challenge")}>확인</button>
                </div>
            </main>
        </>
    )
}