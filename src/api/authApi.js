const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5173';

// 로그인
export async function login(email, password) {
    const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        throw new Error('로그인 실패');
    }

    return response.json();
}

// 회원가입
export async function signUp(email, password, nickname) {
    const response = await fetch(`${BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, nickname }),
    });

    if (!response.ok) {
        throw new Error('회원가입 실패');
    }
    
    return response.json();
}

// 회원가입-닉네임