const BASE_URL = import.meta.env.VITE_BASE_URL;

// 기사 변환
export async function convertArticle({link, summary_count}) {
    const res = await fetch(`${BASE_URL}/newsbee/articles/transform`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ 
            link,
            summary_count,
        }),
    });

    const data = await res.json();
    
    if (!res.ok) {
        const error = new Error(data.message || '기사 변환 실패');
        error.status = res.status;
        error.data = data;
        throw error;
    }

    return data;
}

// 기사 읽기 기록 저장
export async function recordRead(articleId) {
    const res = await fetch(`${BASE_URL}/newsbee/articles/${articleId}/read`, {
        method: 'POST',
        credentials: "include",
    });
    
    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || '읽기 기록 저장 오류');
    }
    
    return data;
}

// 추천 기사
export async function getRecommendation(level) {    
    const queryPath = level ? `?level=${level}` : '';

    const res = await fetch(`${BASE_URL}/newsbee/recommendations/articles${queryPath}`, {
        method: 'GET',
        credentials: 'include',
    })

    if (!res.ok) {
        throw new Error('추천 기사 조회 실패');
    }

    const data = await res.json()

    return data.result.articles;
}

// 변환한 기사 목록 조회
export async function getArticles(page = 0, size = 16) {
    const res = await fetch(`${BASE_URL}/newsbee/articles?page=${page}&size=${size}`, {
        method: 'GET',
        credentials: 'include',
    });

    if (!res.ok) {
        throw new Error('기사 목록 조회 오류')
    }

    const data = await res.json();
    
    return data.result.articles;
}

// 비회원 기사 변환 잔여 횟수 조회
export async function getQuota() {
    const res = await fetch(`${BASE_URL}/newsbee/articles/guest/quota`, {
        method: 'GET',
        credentials: 'include'
    });

    if (!res.ok) {
        throw new Error('비회원 잔여 횟수 조회 오류');
    }

    const data = await res.json();

    return data.result;
}