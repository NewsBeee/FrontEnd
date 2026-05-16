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


// export const MOCK_ARTICLES = {
//   "result": {
//     "articles": [
//       { "articleId": 101, "link": "https://news.example.com/article/101", "summary": "🍯 뉴스비 서비스 오픈! 당신만을 위한 키워드 맞춤형 기사 추천 시스템 전격 도입", "createdAt": "2026-03-30" },
//       { "articleId": 102, "link": "https://news.example.com/article/102", "summary": "🌱 올봄 유행할 카키 무드 인테리어, 차분한 대지 톤으로 방 꾸미기 팁 공개", "createdAt": "2026-03-29" },
//       { "articleId": 103, "link": "https://news.example.com/article/103", "summary": "📈 국내 주식 시장 완만한 회복세, 반도체 및 신재생에너지 섹터 강세", "createdAt": "2026-03-28" },
//       { "articleId": 104, "link": "https://news.example.com/article/104", "summary": "☕️ '얼죽아'도 흔들린다? 쌀쌀한 날씨에 다시 주목받는 따뜻한 허니 자몽 블랙티", "createdAt": "2026-03-27" },
//       { "articleId": 105, "link": "https://news.example.com/article/105", "summary": "💻 프론트엔드 개발자 필수 역량, 무한 스크롤 최적화를 위한 IntersectionObserver 활용법", "createdAt": "2026-03-26" },
//       { "articleId": 106, "link": "https://news.example.com/article/106", "summary": "🐝 양봉 농가 돕기 프로젝트, 도심 속 미니 화단 가꾸기가 꿀벌에게 미치는 긍정적 영향", "createdAt": "2026-03-25" },
//       { "articleId": 107, "link": "https://news.example.com/article/107", "summary": "🎨 2026년 가을·겨울 트렌드 컬러 발표, 자연을 닮은 '세이지 그린'과 '토프 브라운'", "createdAt": "2026-03-24" },
//       { "articleId": 108, "link": "https://news.example.com/article/108", "summary": "🚀 스타트업 생존기, 초기 서비스 프로토타이핑을 위한 노코드 플랫폼 비교 분석", "createdAt": "2026-03-23" },
//       { "articleId": 109, "link": "https://news.example.com/article/109", "summary": "📚 '도파민 디톡스' 열풍, 자극적인 숏폼 대신 긴 글 읽기에 도전하는 청년들", "createdAt": "2026-03-22" },
//       { "articleId": 110, "link": "https://news.example.com/article/110", "summary": "✈️ 완벽한 힐링을 위한 국내 조용한 숲속 숙소 TOP 5 추천", "createdAt": "2026-03-21" },
//       { "articleId": 111, "link": "https://news.example.com/article/111", "summary": "🥗 건강한 식습관의 시작, 톤다운된 그린 푸드가 몸에 좋은 이유 세 가지", "createdAt": "2026-03-20" },
//       { "articleId": 112, "link": "https://news.example.com/article/112", "summary": "🦊 도심에 나타난 아기 여우? 자연 생태계 복원이 가져온 도심 속 변화", "createdAt": "2026-03-19" },
//       { "articleId": 113, "link": "https://news.example.com/article/113", "summary": "💡 React 19 신기능 프리뷰, 개발자들의 DX(개발자 경험)를 높여줄 핵심 기능 정리", "createdAt": "2026-03-18" },
//       { "articleId": 114, "link": "https://news.example.com/article/114", "summary": "🪵 따뜻하고 아늑한 우드 가구 관리법, 오래도록 은은한 광택 유지하는 꿀팁", "createdAt": "2026-03-17" },
//       { "articleId": 115, "link": "https://news.example.com/article/115", "summary": "☁️ AWS Lightsail을 활용한 1인 블로그 구축 기기, 가성비 최고의 선택", "createdAt": "2026-03-16" },
//       { "articleId": 116, "link": "https://news.example.com/article/116", "summary": "🎵 지친 퇴근길, 마음을 차분하게 가라앉혀 줄 로파이(Lo-Fi) 플레이리스트 추천", "createdAt": "2026-03-15" },
//       /* --- 여기서부터 2페이지에 로딩될 데이터 (17번째 기사) --- */
//       { "articleId": 117, "link": "https://news.example.com/article/117", "summary": "🌼 봄꽃 개화 시기 앞당겨졌다, 전국 주요 봄꽃 축제 일정 총정리", "createdAt": "2026-03-14" },
//       { "articleId": 118, "link": "https://news.example.com/article/118", "summary": "🥞 달콤한 주말 브런치, 집에서 실패 없이 만드는 퐁신퐁신 수플레 팬케이크 레시피", "createdAt": "2026-03-13" },
//       { "articleId": 119, "link": "https://news.example.com/article/119", "summary": "🔍 현대인들의 고질병 '거북목' 교정, 의자 위에서 3분 만에 하는 스트레칭", "createdAt": "2026-03-12" },
//       { "articleId": 120, "link": "https://news.example.com/article/120", "summary": "🌿 실내 공기 정화식물 초보자 가이드, 물 자주 안 줘도 잘 자라는 베스트 3", "createdAt": "2026-03-11" },
//       { "articleId": 121, "link": "https://news.example.com/article/121", "summary": "🥑 아보카도와 올리브유를 활용한 건강하고 깊은 풍미의 샐러드 드레싱 만들기", "createdAt": "2026-03-10" },
//       { "articleId": 122, "link": "https://news.example.com/article/122", "summary": "📊 2026년 상반기 재테크 전략, 안정적인 자산 배분을 위한 포트폴리오 제안", "createdAt": "2026-03-09" },
//       { "articleId": 123, "link": "https://news.example.com/article/123", "summary": "🧸 빈티지 소품샵 투어, 서촌과 망원동 골목길 구석구석 숨은 감성 상점들", "createdAt": "2026-03-08" },
//       { "articleId": 124, "link": "https://news.example.com/article/124", "summary": "🔋 차세대 배터리 기술 어디까지 왔나, 전고체 배터리 상용화의 문턱", "createdAt": "2026-03-07" },
//       { "articleId": 125, "link": "https://news.example.com/article/125", "summary": "🏡 미니멀 라이프 실천하기, 일주일 동안 매일 물건 하나씩 비우기 챌린지", "createdAt": "2026-03-06" }
//     ]
//   }
// };

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

    // return MOCK_ARTICLES.result.articles.slice(page * size, (page + 1) * size);
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