// 기사 변환
export async function convertArticle(link) {
    try {
        const res = await fetch('/api/convert', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url: link }),
        });
    
        if (!res.ok) {
            throw new Error('기사 변환 실패');
        }

        return res.json();
    } catch (error) {
        console.error('Error converting article:', error);
        throw error;
    }
}

// 추천 기사

// 변환 결과