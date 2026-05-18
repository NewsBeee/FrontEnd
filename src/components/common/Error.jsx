import { useNavigate } from 'react-router-dom';
import ErrImg from '../../assets/sad.png';
import './styles/error.css'

export default function Error({ message, onRetry, goHome = false }) {
    const navigate = useNavigate();
    
    return(
        <div className="error-page">
            <p>{message || "오류가 발생했습니다."}</p>
            <img src={ErrImg} width={150} />
            {onRetry && (<button onClick={onRetry}>다시 시도</button>)}
            {goHome && (<button onClick={() => navigate('/intro')}>확인</button>)}
        </div>
    )
}