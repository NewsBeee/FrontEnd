// const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:3000";
const BASE_URL = "http://localhost:8080";

// 현재 주간 목표 조회
export async function getCurrentChallenge() {
    const res = await fetch(`${BASE_URL}/newsbee/challenges/current`, {
        method: 'GET',
        credentials: 'include',
    });

    if (!res.ok) {
        throw new Error("현재 주간 목표 조회 실패");
    }

    const { success, result, message} = await res.json();

    if (!success) {
        throw new Error(message);
    }

    return result;
}

// 주간 학습 진행 현황 조회
export async function getChallengeProgress(weekStart) { 
    const params = new URLSearchParams({weekStart});

    const res = await fetch(`${BASE_URL}/newsbee/challenges/progress?${params}`, {
        method: 'GET',
        credentials: 'include',
    }); 

    if (!res.ok) {
        throw new Error("주간 학습 진행 현황 조회 실패"); 
    }

    const { success, result, message } = await res.json();

    if (!success) {
        throw new Error(message);
    }

    return result; 
}

// 주간 챌린지 달성 이력 조회
export async function getChallengeHistory() {
    const res = await fetch(`${BASE_URL}/newsbee/challenges/history`, {
        method: 'GET',
        credentials: 'include'
    });

    if (!res.ok) {
        throw new Error("주간 챌린지 달성 이력 조회 실패");
    }

    const { success, result, message} = await res.json();

    if (!success) {
        throw new Error(message);
    }

    return result;
}

// 주간 목표 설정
export async function setChallenge({ weekStart, category, goal }) {
    const res = await fetch(`${BASE_URL}/newsbee/challenges`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ weekStart, category, goal }),
    });

    if (!res.ok) {
        throw new Error("주간 목표 설정 실패");
    }

    const { success, result, message } = await res.json();

    if (!success) {
        throw new Error(message);
    }

    return result;
}