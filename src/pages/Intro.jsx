import { Link } from 'react-router-dom'
import logo from '../assets/logo3.png'
import '../styles/intro.css'

export default function Intro() {
    return (
        <div className='wrapper'>
            <div className='top'>
                <div className='catch'>뉴스 기사로 어휘력 상승!</div>
                <img src={logo} alt="Logo" className='logo'/>
            </div>
            
            <div className='btn-container'>
                <Link to="/login" className='to-login'>로그인</Link> 
                <Link to="/signup" className='to-signup'>회원 가입</Link>
            </div>
        </div>
    )
}