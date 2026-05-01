const BASE_URL = import.meta.env.VITE_BASE_URL;

// 로그인
export async function login({ email, password} ) {
    const res = await fetch(`${BASE_URL}/newsbee/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
        throw new Error('로그인 실패');
    }

    return res.json();
}

// 로그아웃
export async function logout() {
    const res = await fetch(`${BASE_URL}/newsbee/auth/logout`, {
        method: 'POST',
    });
}

// 회원가입
export async function signUp({ email, password, nickname }) {
    const res = await fetch(`${BASE_URL}/newsbee/auth/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, nickname }),
    });

    if (!res.ok) {
        throw new Error('회원가입 실패');
    }
    
    return await res.json();
}

// 회원 탈퇴
export async function deleteAccount() {
    const res = await fetch(`${BASE_URL}/newsbee/auth/withdraw`, {
        method: 'DELETE',
    })
}