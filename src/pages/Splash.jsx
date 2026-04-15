import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/layout/Header";
import Logo from "../assets/logo3.png"
import PromotionImg from "../assets/image.png"
import OnboardingImg from "../assets/finish.png"
import "../styles/splash.css"

export default function Splash() {
    const navigate = useNavigate();
    const { type } = useParams();

    useEffect(() => {
        setTimeout(() => {
            if (type === "onboarding") {
                navigate("/");
            } else {
                navigate("/"); // `result/${type}` 퀴즈 결과 페이지
            }
        }, 2000);
    }, []);

    return (
        <>
            {type === "promotion" ? (
                <>
                    <Header left={<img src={Logo} style={{ width: '121px' }}/>} />
                    <main className='main-content'>
                        <div className="splash-wrapper">
                            <div className="splash-welcome">
                                퀴즈를 모두 풀었어요!
                                <p>잠시 후 결과를 알려드릴게요</p>
                            </div>
                            <img src={PromotionImg} style={{width: "211px"}}/>
                        </div>
                    </main>
                    </>
            ) : (
                <>
                    <Header />
                    <main className='main-content'>
                        <div className="splash-wrapper">
                            <div className="splash-welcome">
                                가입이 완료되었어요!
                                <p>잠시 후 서비스로 이동합니다</p>
                            </div>
                            <img src={OnboardingImg} style={{width: "211px"}}/>
                        </div>
                    </main>
                </>
            )}
        </>
    )
}