const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:3000";

// 사용자 프로필 조회
export async function getInfo() {
    const res = await fetch(`${BASE_URL}/newsbee/users/me`, {
        method: 'GET',
        credentials: 'include',
    })

    if (!res.ok) {
        throw new Error('사용자 프로필 조회 실패');
    }

    const data = await res.json();

    return data.result;
}

// 학습 데이터 조회
export async function getStats() {
    const res = await fetch(`${BASE_URL}/newsbee/users/me/stats`, {
        method: 'GET',
        credentials: 'include',
    });

    if (!res.ok) {
        throw new Error('학습 데이터 조회 실패');
    }

    const data = await res.json();

    return data.result;
}