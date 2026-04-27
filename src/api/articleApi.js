// const API_BASE = import.meta.env.VITE_API_BASE;

// 기사 변환
export async function convertArticle(link) {
    const res = await fetch(`${API_BASE}/newsbee/articles/transform`, {
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

// 추천 기사
