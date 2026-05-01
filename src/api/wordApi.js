const BASE_URL = import.meta.env.VITE_BASE_URL;

// 변환 기사 내 단어 저장
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