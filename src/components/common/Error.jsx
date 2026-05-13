import { useNavigate } from "react-router-dom";
import ErrImg from '../../assets/sad.png';
import './styles/error.css'

export default function Error() {
    const navigate = useNavigate();
    return(
        <div className="error-page">
            <p>오류가 발생했습니다</p>
            <img src={ErrImg} width={150} />
            <button onClick={() => navigate("/")}>홈으로 돌아가기</button>
        </div>
    )
}