const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5173';

// 로그인
export async function login(email, password) {
    const res = await fetch(`${BASE_URL}/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
        throw new Error('로그인 실패');
    }

    return res.json();
}

// 로그아웃
export async function logout() {
    const res = await fetch(`${BASE_URL}/`, {
        method: 'POST',
        credentials: 'include', // 쿠키 전송을 위해 필요
    });
}

// 회원가입
export async function signUp(email, password, nickname) {
    const res = await fetch(`${BASE_URL}/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, nickname }),
    });

    if (!res.ok) {
        throw new Error('회원가입 실패');
    }
    
    return res.json();
}

// 회원가입-닉네임

