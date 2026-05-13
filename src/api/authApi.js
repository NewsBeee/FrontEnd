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
    
    const data = await res.json();

    if (!res.ok) {
        const error = new Error(data.message || '로그인 오류');

        error.status = res.status;
        error.code = data.code;

        throw error;
    }
    
    return data;
}

// 로그아웃
export async function logout() {
    const res = await fetch(`${BASE_URL}/newsbee/auth/logout`, {
        method: 'POST',
        credentials: 'include'
    });

    const data = await res.json();

    if (!res.ok) {
        const error = new Error(data.message || '로그아웃 오류');

        error.status = res.status;
        error.code = data.code;

        throw error;
    }
    
    return data;
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

    const data = await res.json();

    if (!res.ok) {
        const error = new Error(data.message || '회원가입 오류');

        error.status = res.status;
        error.code = data.code;

        throw error;
    }
    
    return data;
}

// 회원 탈퇴
export async function deleteAccount() {
    const res = await fetch(`${BASE_URL}/newsbee/auth/withdraw`, {
        method: 'DELETE',
        credentials: 'include',
    });

    const data = await res.json();

    if (!res.ok) {
        const error = new Error(data.message || '회원탈퇴 오류');

        error.status = res.status;
        error.code = data.code;

        throw error;
    }
    
    return data;
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
        console.error('회원정보 수정 실패:', res.status);
        throw new Error('회원정보 수정 오류')
    }

    return await res.json();
}