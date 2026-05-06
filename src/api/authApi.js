// const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:3000";
const BASE_URL = "http://localhost:8080";

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
        throw new Error('로그인 오류');
    }

    return res.json();
}

// 로그아웃
export async function logout() {
    const res = await fetch(`${BASE_URL}/newsbee/auth/logout`, {
        method: 'POST',
        credentials: 'include'
    });

    if (!res.ok) {
        throw new Error('로그아웃 오류')
    }

    return await res.json();
}

// 회원가입
export async function signUp({ email, password, nickname }) {
    const res = await fetch(`${BASE_URL}/newsbee/auth/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password, nickname }),
    });

    if (!res.ok) {
        throw new Error('회원가입 오류');
    }
    
    return await res.json();
}

// 회원 탈퇴
export async function deleteAccount() {
    const res = await fetch(`${BASE_URL}/newsbee/auth/withdraw`, {
        method: 'DELETE',
        credentials: 'include',
    });

    if (!res.ok) {
        throw new Error('회원 탈퇴 오류')
    }

    return await res.json();
}

// 사용자 정보 수정
export async function updateAccount(nickname) {
    const res = await fetch(`${BASE_URL}/newsbee/users/me`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ nickname })
    });

    if (!res.ok) {
        throw new Error('회원정보 수정 오류')
    }

    return await res.json();
}