import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/layout/Header'
import BackButton from '../components/common/BackButton'
import StepIndicator from '../components/common/StepIndicator'
import '../styles/signup.css'

export default function SignUp() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        
        if (!email || !password || !confirmPassword) {
            alert('모든 필드를 입력해주세요.');
            return;
        }

        if (password !== confirmPassword) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }

        try {
            navigate('/signup/nickname', { 
                state: { email, password }
            });
        } catch (error) {
            alert('이메일 또는 비밀번호가 올바르지 않습니다.');
        }
    }

    return (
        <>
            <Header left={<BackButton />} />
            <StepIndicator currentStep={1} />
            <main className='main-content'>
                <div className='signup-wrapper'>
                    <div className='signup-welcome'>환영합니다!<br />막히는 단어 없이 읽히는 뉴스 NewsBee와 함께 해요!</div>
                    <div className='signup-content'>
                        <form className="signup-form" id="signupForm" onSubmit={handleSubmit}>
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
                            <div className='form-input'>
                                <label>비밀번호 재확인</label>
                                <input 
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)} />
                                <p>비밀번호는 영문, 숫자 조합 8~16자 이내로 입력해주세요.</p>
                            </div>
                        </form>
                    </div>
                    
                    <button 
                        type="submit" 
                        className='signup-btn' 
                        form='signupForm'
                    >
                        다음
                    </button>
                </div>
            </main>
        </>
    )
}