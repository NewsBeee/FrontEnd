const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:3000";

// 기사 변환
export async function convertArticle(link) {
    const res = await fetch(`${BASE_URL}/newsbee/articles/transform`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ link }),
    });
    
    if (!res.ok) {
        throw new Error('기사 변환 실패');
    }

    return await res.json();
}

// 기사 읽기 기록 저장
// export async function recordRead(articleId) {
//     const res = await fetch(`${BASE_URL}/newsbee/articles/{articledId}/read`, {
//         method: 'POST',
//     })
    
    
// }

// 추천 기사
export async function getRecommendation() {
    const res = await fetch(`/newsbee/recommendations/articles`, {
        method: 'GET',
        credentials: 'include'
    })

    if (!res.ok) {
        throw new Error('추천 기사 조회 실패');
    }

    const result = await res.json()

    return result
}