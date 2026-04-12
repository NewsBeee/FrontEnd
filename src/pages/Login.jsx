import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/layout/Header'
import BackButton from '../components/common/BackButton'
import '../styles/login.css'

import { login } from '../api/authApi';

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        // try {
        //     const data = await login(email, password)
        //     navigate('/'); // 로그인 성공 시 홈으로 이동
        // } catch (error) {
        //     alert('이메일 또는 비밀번호가 올바르지 않습니다.');

        // }
        // if (!email || !password) {
        //     alert('모든 필드를 입력해주세요.');
        //     return;
        // }
        navigate('/home');
    }

    return (
        <>
            <Header left={<BackButton />} />
            <main className='main-content'>
                <div className='login-wrapper'>
                    <div className='login-welcome'>반가워요!<br />뉴스비와 함께 공부해요!</div>
                    <div className='login-content'>
                        <form className="login-form" id="loginForm" onSubmit={handleSubmit}>
                            <div className='form-input'>
                                <label>이메일</label>
                                <input
                                    type="text"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className='form-input'>
                                <label>비밀번호</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </form>
                    </div>
                    
                    <button type="submit" className='login-btn' form='loginForm'>로그인</button>
                </div>
            </main>
            
        </>
    )
}