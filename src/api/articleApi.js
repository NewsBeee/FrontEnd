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
export async function recordRead(articleId) {
    const res = await fetch(`${BASE_URL}/newsbee/articles/${articledId}/read`, {
        method: 'POST',
        credentials: "include",
    });
    
    if (!res.ok) {
        throw new Error('읽기 기록 저장 오류')
    }
    
    return await res.json();
}

// 추천 기사
export async function getRecommendation(level) {
    const queryPath = level ? `?level=${level}` : '';
    
    const res = await fetch(`${BASE_URL}/newsbee/recommendations/articles`, {
        method: 'GET',
        credentials: 'include'
    })

    if (!res.ok) {
        throw new Error('추천 기사 조회 실패');
    }

    const result = await res.json()

    return result.articles;
}

// const DUMMY_ARTICLES = [
//     {
//         articleId: 1,
//         link: "https://example.com/news/1",
//         summary: "중앙은행, 기준금리 동결 발표... 시장 예상치에 부합하는 결정",
//         createdAt: "2026-05-01T10:00:00Z"
//     },
//     {
//         articleId: 2,
//         link: "https://example.com/news/2",
//         summary: "반도체 수출 호조에 무역수지 12개월 연속 흑자 행진 기록",
//         createdAt: "2026-05-01T11:30:00Z"
//     },
//     {
//         articleId: 3,
//         link: "https://example.com/news/3",
//         summary: "고물가 지속에 외식업계 타격... 소비 심리 위축 우려 심화",
//         createdAt: "2026-05-02T09:15:00Z"
//     },
//     {
//         articleId: 4,
//         link: "https://example.com/news/4",
//         summary: "나스닥 최고치 경신, 기술주 중심의 강력한 매수세 유입",
//         createdAt: "2026-05-02T14:45:00Z"
//     },
//     {
//         articleId: 5,
//         link: "https://example.com/news/5",
//         summary: "국제 유가 급등에 항공·물류 업계 수익성 악화 비상",
//         createdAt: "2026-05-02T16:20:00Z"
//     },
//     {
//         articleId: 6,
//         link: "https://example.com/news/6",
//         summary: "정부, 청년층 주거 안정을 위한 신규 대책 다음 달 발표 예정",
//         createdAt: "2026-05-03T08:00:00Z"
//     },
//     {
//         articleId: 7,
//         link: "https://example.com/news/7",
//         summary: "가상자산 시장 규제 강화 움직임에 비트코인 변동성 확대",
//         createdAt: "2026-05-03T10:10:00Z"
//     },
//     {
//         articleId: 8,
//         link: "https://example.com/news/8",
//         summary: "인공지능(AI) 스타트업 투자 유치 사상 최대치 기록",
//         createdAt: "2026-05-03T13:05:00Z"
//     },
//     {
//         articleId: 9,
//         link: "https://example.com/news/9",
//         summary: "내수 경기 활성화를 위한 전통시장 온누리상품권 혜택 강화",
//         createdAt: "2026-05-03T15:40:00Z"
//     },
//     {
//         articleId: 10,
//         link: "https://example.com/news/10",
//         summary: "글로벌 공급망 재편 속 국내 자동차 부품업계 해외 진출 가속화",
//         createdAt: "2026-05-04T07:25:00Z"
//     },
//     {
//         articleId: 11,
//         link: "https://example.com/news/11",
//         summary: "원/달러 환율 하락세 전환... 수출 기업 환차손 우려",
//         createdAt: "2026-05-04T09:50:00Z"
//     },
//     {
//         articleId: 12,
//         link: "https://example.com/news/12",
//         summary: "신규 상장 기업 공모가 상단 돌파... IPO 시장 훈풍",
//         createdAt: "2026-05-04T11:15:00Z"
//     },
//     {
//         articleId: 13,
//         link: "https://example.com/news/13",
//         summary: "배당금 지급 시즌 도래... 주주 환원 정책 강화하는 기업들",
//         createdAt: "2026-05-04T13:40:00Z"
//     },
//     {
//         articleId: 14,
//         link: "https://example.com/news/14",
//         summary: "온라인 쇼핑 거래액 역대 최대... 모바일 결제 비중 압도적",
//         createdAt: "2026-05-04T15:20:00Z"
//     },
//     {
//         articleId: 15,
//         link: "https://example.com/news/15",
//         summary: "ESG 경영 평가 결과 공개... 친환경 기업 주가 상승세",
//         createdAt: "2026-05-04T17:05:00Z"
//     },
//     // ... (데이터의 일관성을 위해 16~40번까지 요약된 형태로 지속됩니다)
//     { articleId: 16, link: "https://example.com/news/16", summary: "금값 사상 최고가 돌파, 안전 자산 선호 현상 뚜렷", createdAt: "2026-05-04T18:00:00Z" },
//     { articleId: 17, link: "https://example.com/news/17", summary: "전기차 배터리 신기술 개발 성공 소식에 관련주 급등", createdAt: "2026-05-04T19:20:00Z" },
//     { articleId: 18, link: "https://example.com/news/18", summary: "최저임금 위원회 첫 회의 개최... 노사 간 이견 팽팽", createdAt: "2026-05-04T20:45:00Z" },
//     { articleId: 19, link: "https://example.com/news/19", summary: "친환경 에너지 비중 확대 정부 로드맵 발표", createdAt: "2026-05-04T21:10:00Z" },
//     { articleId: 20, link: "https://example.com/news/20", summary: "대형 마트 휴무일 평일 전환 논의 확산", createdAt: "2026-05-04T22:30:00Z" },
//     { articleId: 21, link: "https://example.com/news/21", summary: "개인 투자자 주식 보유 비중 소폭 감소 추세", createdAt: "2026-05-05T08:15:00Z" },
//     { articleId: 22, link: "https://example.com/news/22", summary: "은퇴 설계 필수... 연금 저축 상품 가입자 급증", createdAt: "2026-05-05T09:40:00Z" },
//     { articleId: 23, link: "https://example.com/news/23", summary: "부동산 공시가격 하향 조정에 보유세 부담 경감 기대", createdAt: "2026-05-05T10:20:00Z" },
//     { articleId: 24, link: "https://example.com/news/24", summary: "배달 플랫폼 수수료 인상 논란... 자영업자 반발", createdAt: "2026-05-05T11:55:00Z" },
//     { articleId: 25, link: "https://example.com/news/25", summary: "K-푸드 수출 영토 확장, 중동 시장 공략 가속화", createdAt: "2026-05-05T13:10:00Z" },
//     { articleId: 26, link: "https://example.com/news/26", summary: "상업용 부동산 공실률 상승, 오피스 시장 냉기", createdAt: "2026-05-05T14:50:00Z" },
//     { articleId: 27, link: "https://example.com/news/27", summary: "로봇 프로세스 자동화 도입 기업 만족도 상승", createdAt: "2026-05-05T15:30:00Z" },
//     { articleId: 28, link: "https://example.com/news/28", summary: "클라우드 서비스 이용료 인상 움직임에 기업들 긴장", createdAt: "2026-05-05T16:45:00Z" },
//     { articleId: 29, link: "https://example.com/news/29", summary: "구직 시장 유연화... 프로젝트 단위 계약직 선호 증가", createdAt: "2026-05-05T17:25:00Z" },
//     { articleId: 30, link: "https://example.com/news/30", summary: "지속 가능한 패션 관심 증가, 리사이클링 소재 각광", createdAt: "2026-05-05T18:05:00Z" },
//     { articleId: 31, link: "https://example.com/news/31", summary: "지방 소멸 위기 대응을 위한 기업 유치 혜택 확대", createdAt: "2026-05-05T19:35:00Z" },
//     { articleId: 32, link: "https://example.com/news/32", summary: "스마트 팜 기술 고도화로 농가 수익성 대폭 개선", createdAt: "2026-05-05T20:50:00Z" },
//     { articleId: 33, link: "https://example.com/news/33", summary: "디지털 헬스케어 기기 인증 절차 간소화 추진", createdAt: "2026-05-05T21:15:00Z" },
//     { articleId: 34, link: "https://example.com/news/34", summary: "우주 항공 산업 육성을 위한 민관 협력 강화", createdAt: "2026-05-05T22:40:00Z" },
//     { articleId: 35, link: "https://example.com/news/35", summary: "OTT 구독료 인상... 스트리밍 시장 경쟁 재편", createdAt: "2026-05-06T08:30:00Z" },
//     { articleId: 36, link: "https://example.com/news/36", summary: "국제 곡물 가격 하락세, 식품 업계 원가 부담 완화", createdAt: "2026-05-06T09:20:00Z" },
//     { articleId: 37, link: "https://example.com/news/37", summary: "관광 시장 회복세 뚜렷... 해외 여행객 수 급증", createdAt: "2026-05-06T10:45:00Z" },
//     { articleId: 38, link: "https://example.com/news/38", summary: "정기 예금 금리 인하 움직임... 투자 대기 자금 이동", createdAt: "2026-05-06T11:10:00Z" },
//     { articleId: 39, link: "https://example.com/news/39", summary: "희귀 금속 확보 전쟁, 자원 외교의 중요성 부각", createdAt: "2026-05-06T13:55:00Z" },
//     { articleId: 40, link: "https://example.com/news/40", summary: "하반기 경기 낙관론 확산... 소비 활성화 기대감", createdAt: "2026-05-06T15:00:00Z" }
// ];

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
    const articles = data.result.articles;
    
    return {
        list: articles,
        hasMore: articles.length === size,
    };

    // const sortedData = [...DUMMY_ARTICLES].sort(
    //     (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    // );

    // const start = page * size;
    // const end = start + size;

    // const sliced = sortedData.slice(start, end);

    // return {
    //     list: sliced,
    //     hasMore: end < DUMMY_ARTICLES.length,
    // }
}

// 변환한 기사 상세 조회??


// 비회원 기사 변환 잔여 횟수 조회
export async function getQuota() {
    const res = await fetch(`${BASE_URL}/newsbee/articles/guest/quota`, {
        method: 'GET',
    })
}