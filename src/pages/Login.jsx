import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/layout/Header'
import BackButton from '../components/common/BackButton'
import '../styles/login.css'

import { login } from '../api/authApi';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../hooks/useToast'

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { setUser } = useAuth();
    const { showToast } = useToast();

    async function handleSubmit(e) {
        e.preventDefault();

        if (!email || !password) {
            showToast("모든 필드를 입력해주세요", "fail");
            return;
        }

        try {
            const data = await login({ email, password });

            setUser(data.result);

            if (!data.result.onboardingCompleted) {
                showToast("온보딩을 먼저 진행해주세요!", "error");
                navigate('/quiz-intro/onboarding');
            } else {
                navigate('/');
            }

        } catch (error) {
            console.error(error);
            showToast(error.message, "fail");
        }
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
                                    type="email"
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