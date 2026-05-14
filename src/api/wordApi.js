const BASE_URL = import.meta.env.VITE_BASE_URL;

// 기사 내 단어 저장
export async function saveVoca({ articleId, word, meaning}) {
    const res = await fetch(`${BASE_URL}/newsbee/vocabulary`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            articleId,
            word,
            meaning,
            isBookmarked: true
         }),
    });

    if (!res.ok) {
        throw new Error('단어 저장 실패');
    }

    return await res.json();
}

// 저장 단어 목록 조회
export async function getVoca(page = 0, size = 20) {
    const res = await fetch(
        `${BASE_URL}/newsbee/vocabulary?page=${page}&size=${size}`, 
        {
            method: 'GET',
            credentials: 'include',
        }
    );

    if (!res.ok) {
        throw new Error('단어장 조회 실패');
    }

    const data = await res.json();

    return data.result.vocabularies;
}

// 단어 학습 상태 변경
export async function updateStatus({ vocaId, status }) {
    const res = await fetch(`${BASE_URL}/newsbee/vocabulary/${vocaId}/status`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ status })
    });

    if (!res.ok) {
        throw new Error('단어 학습 상태 변경 실패');
    }

    const data = await res.json();

    return data.result;
}