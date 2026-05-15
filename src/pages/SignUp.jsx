import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Header from '../components/layout/Header'
import BackButton from '../components/common/BackButton'
import StepIndicator from '../components/common/StepIndicator'
import '../styles/signup.css'

import { useToast } from '../hooks/useToast'

export default function SignUp() {
    const location = useLocation();
    const navigate = useNavigate();
    const [email, setEmail] = useState(location.state?.email || '');
    const [password, setPassword] = useState(location.state?.password || '');
    const [confirmPassword, setConfirmPassword] = useState(location.state?.confirmPassword || '');
    const [pwError, setPwError] = useState(false);
    const [errors, setErrors] = useState({});

    const { showToast } = useToast();

    const isFormEmpty = !email || !password || !confirmPassword;

    async function handleSubmit(e) {
        e.preventDefault();

        const newErrors = {};

        if (!email.trim()) {
            newErrors.email = '이메일을 입력해주세요.';
        }

        if (!password.trim()) {
            newErrors.password = '비밀번호를 입력해주세요.';
        }

        if (!confirmPassword.trim()) {
            newErrors.confirmPassword = '비밀번호를 다시 입력해주세요.';
        }
        
        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            showToast("모든 필드를 입력해주세요.", "error");
            return;
        }

         if (password !== confirmPassword) {
            showToast("비밀번호를 확인해주세요.", "error");
            setPwError(true);
            return;
        }

        setPwError(false);

        navigate('/signup/nickname', { 
            state: { email, password, confirmPassword }
        });
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
                                    type="email" 
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        setErrors(prev => ({ ...prev, email: '' }));
                                    }}
                                />  
                                {errors.email && <p className="error-message">{errors.email}</p>}
                            </div>

                            <div className='form-input'>
                                <label>비밀번호</label>
                                <input 
                                    type="password" 
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        setErrors(prev => ({ ...prev, password: '' }));
                                        setPwError(false);
                                    }}
                                />
                                {
                                    errors.password ? (
                                        <p className='error-message'>{errors.password}</p>
                                    ) : pwError ? (
                                        <p className='error-message'>비밀번호가 일치하지 않습니다.</p>
                                    ) : (
                                        <p className='pw-info'>비밀번호는 영문, 숫자 조합 8~16자 이내로 입력해주세요.</p>
                                    )
                                }
                            </div>

                            <div className='form-input'>
                                <label>비밀번호 재확인</label>
                                <input 
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => {
                                        setConfirmPassword(e.target.value);
                                        setErrors(prev => ({ ...prev, confirmPassword: '' }));
                                        setPwError(false);
                                    }}
                                />
                                {pwError ? (
                                        <p className="error-message">비밀번호가 일치하지 않습니다.</p>
                                ) : errors.confirmPassword ? (
                                    <p className='error-message'>{errors.confirmPassword}</p>
                                ) : null}
                            </div>
                        </form>
                    </div>
                    
                    <button 
                        type="submit" 
                        className={`signup-btn ${isFormEmpty ? 'disabled' : ''}`}
                        form='signupForm'
                    >
                        다음
                    </button>
                </div>
            </main>
        </>
    )
}