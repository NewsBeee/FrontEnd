const BASE_URL = import.meta.env.VITE_BASE_URL;

// 현재 주간 목표 조회
export async function getCurrentChallenge() {
    const res = await fetch(`${BASE_URL}/newsbee/challenges/current`, {
        method: 'GET',
        credentials: 'include',
    });

    const data = await res.json();

    if (res.status === 404 && data.code === "CHALLENGE_604") {
        return null;
    }

    if (!res.ok) {
        throw new Error(data.message || "현재 주간 목표 조회 실패");
    }

    return data.result;
}

// 주간 학습 진행 현황 조회
export async function getChallengeProgress(weekStart) { 
    const date = new Date(weekStart);

    // 한국 시간 기준 YYYY-MM-DD 형식으로 변환
    const correctedWeekStart = new Intl.DateTimeFormat('sv-SE', {
        timeZone: 'Asia/Seoul',
    }).format(date);

    const params = new URLSearchParams({ weekStart: correctedWeekStart});

    const res = await fetch(`${BASE_URL}/newsbee/challenges/progress?${params}`, {
        method: 'GET',
        credentials: 'include',
    }); 

    const data = await res.json();

    console.log(data)

    if (res.status === 404 && data.code === "CHALLENGE_604") {
        console.log("해당 주차의 상세 진행 데이터가 없습니다.");
        return null; 
    }

    if (!res.ok) {
        throw new Error(data.message || "주간 학습 진행 현황 조회 실패"); 
    }

    return data.result; 
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