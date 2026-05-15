import ErrImg from '../../assets/sad.png';
import './styles/error.css'

export default function Error({ message, onRetry }) {
    return(
        <div className="error-page">
            <p>{message}</p>
            <img src={ErrImg} width={150} />
            {onRetry && (<button onClick={onRetry}>다시 시도</button>)}
        </div>
    )
}