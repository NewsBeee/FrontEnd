const BASE_URL = import.meta.env.VITE_BASE_URL;
const TEST_DATA = {
    "articleId": 101,
    "link": "https://news.example.com/article/123",
    "convertArticle": "한국은행은 물가 안정을 위해 이자율을 그대로 유지하기로 했습니다. 최근 경기침체 우려가 커지고 있습니다.",
    "summary": "한국은행이 이자율을 유지했으며 경기침체 우려가 증가하고 있다.",
    "replacement_map": [
      "물가",
      "이자율",
      "경기침체"
    ],
    "vocabulary": [
      {
        "word": "물가",
        "meaning": "상품과 서비스의 가격 수준"
      },
      {
        "word": "경기침체",
        "meaning": "경제 활동이 줄어드는 상태"
      }
    ],
    "remainingGuestCount": 2
  
}
// 기사 변환
export async function convertArticle({link, summary_count}) {
    // const res = await fetch(`${BASE_URL}/newsbee/articles/transform`, {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     credentials: 'include',
    //     body: JSON.stringify({ 
    //         link,
    //         summary_count,
    //     }),
    // });

    // const data = await res.json();
    
    // if (!res.ok) {
    //     const error = new Error(data.message || '기사 변환 실패');
    //     error.status = res.status;
    //     error.data = data;
    //     throw error;
    // }

    // return data;
    return TEST_DATA;
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

// 기사 상세 조회
export async function getArticleDetail(articleId) {
    const res = await fetch(`${BASE_URL}/newsbee/articles/${articleId}`, {
        method: 'GET',
        credentials: 'include',
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || '기사 상세 조회 실패');
    }
 
    return data.result;
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