const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:3000";

// 온보딩 문항 조회
export const fetchOnboarding = async () => {
    const res = await fetch(`${BASE_URL}/newsbee/onboarding/questions`, {
        credentials: "include",
    });

    if (!res.ok) {
        throw new Error("온보딩 문항 조회 실패");
    }

    const data = await res.json();
    
    return data.result.questions;

}

// 온보딩 답안 제출
export const submitOnboarding = async (answers) => {
    const res = await fetch(`${BASE_URL}/newsbee/onboarding/submit`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ answers }),
    });

    if (!res.ok) {
        throw new Error("온보딩 답안 제출 실패");
    }
    
    const data = await res.json();

    return data.result;
}

// 승급 퀴즈 문항 조회
export const fetchPromotion = async () => {
    const res = await fetch(`${BASE_URL}/newsbee/quizzes/promotion/questions`, {
        credentials: "include",
    });

    if (!res.ok) {
        throw new Error("승급 퀴즈 문항 조회 실패");
    }

    const data = await res.json();
    
    return data.result.questions;

}

// 승급 퀴즈 답안 제출
export const submitPromotion = async (answers) => {
    const res = await fetch(`${BASE_URL}/newsbee/quizzes/promotion/submit`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ answers }),
    });

    if (!res.ok) {
        throw new Error("승급퀴즈 답안 제출 실패");
    }
    
    const data = await res.json();

    return data.result;
}