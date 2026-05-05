// const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:3000";
const BASE_URL = "http://localhost:3000";

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

const MOCK_VOCAS = [
    { vocaId: 1, word: "수요", meaning: "어떤 물건을 사려는 욕구", status: "UNMEMORIZED" },
    { vocaId: 2, word: "공급", meaning: "물건을 시장에 내놓아 파는 일", status: "MEMORIZED" },
    { vocaId: 3, word: "인플레이션", meaning: "화폐 가치가 하락하여 물가가 계속 오르는 현상", status: "UNMEMORIZED" },
    { vocaId: 4, word: "디플레이션", meaning: "경제 전반적으로 상품과 서비스의 가격이 지속적으로 하락하는 현상", status: "UNMEMORIZED" },
    { vocaId: 5, word: "금리", meaning: "빌려준 돈에 대한 이자율", status: "MEMORIZED" },
    { vocaId: 6, word: "환율", meaning: "자기 나라 돈과 다른 나라 돈의 교환 비율", status: "UNMEMORIZED" },
    { vocaId: 7, word: "주식", meaning: "주식회사의 자본을 이루는 단위", status: "MEMORIZED" },
    { vocaId: 8, word: "채권", meaning: "정부나 기업이 돈을 빌리고 주는 유가증권", status: "UNMEMORIZED" },
    { vocaId: 9, word: "가계 부채", meaning: "일반 가정에서 금융 기관으로부터 빌린 돈", status: "UNMEMORIZED" },
    { vocaId: 10, word: "국내총생산(GDP)", meaning: "한 나라 안에서 일정 기간 생산된 최종 생산물의 총 가치", status: "MEMORIZED" },
    { vocaId: 11, word: "무역 수지", meaning: "수출액과 수입액의 차이", status: "UNMEMORIZED" },
    { vocaId: 12, word: "경상 수지", meaning: "외국과 거래하여 벌어들인 돈과 지불한 돈의 차이", status: "UNMEMORIZED" },
    { vocaId: 13, word: "배당금", meaning: "기업이 이익의 일부를 주주들에게 나누어 주는 돈", status: "MEMORIZED" },
    { vocaId: 14, word: "공매도", meaning: "없는 주식을 빌려서 파는 투자 기법", status: "UNMEMORIZED" },
    { vocaId: 15, word: "유동성", meaning: "자산을 현금으로 바꿀 수 있는 정도", status: "UNMEMORIZED" },
    { vocaId: 16, word: "기회 비용", meaning: "하나를 선택함으로써 포기하게 되는 다른 것의 가치", status: "MEMORIZED" },
    { vocaId: 17, word: "낙수 효과", meaning: "대기업의 성장이 중소기업과 소비자에게 이어지는 현상", status: "UNMEMORIZED" },
    { vocaId: 18, word: "분수 효과", meaning: "저소득층의 소비 증대가 전체 경기를 부양하는 현상", status: "UNMEMORIZED" },
    { vocaId: 19, word: "벤처 기업", meaning: "첨단의 기술과 아이디어를 가진 신생 중소기업", status: "MEMORIZED" },
    { vocaId: 20, word: "지주 회사", meaning: "다른 회사의 주식을 소유하여 지배하는 회사", status: "UNMEMORIZED" },
    { vocaId: 21, word: "독점", meaning: "하나의 기업이 시장을 독차지하는 상태", status: "MEMORIZED" },
    { vocaId: 22, word: "과점", meaning: "소수의 기업이 시장을 장악하고 있는 상태", status: "UNMEMORIZED" },
    { vocaId: 23, word: "기준 금리", meaning: "중앙은행이 결정하는 한 나라의 대표 금리", status: "UNMEMORIZED" },
    { vocaId: 24, word: "재정 정책", meaning: "정부가 세입과 세출을 조절하여 경기를 조절하는 정책", status: "MEMORIZED" },
    { vocaId: 25, word: "통화 정책", meaning: "중앙은행이 돈의 양을 조절하여 물가를 안정시키는 정책", status: "UNMEMORIZED" },
    { vocaId: 26, word: "기축 통화", meaning: "국제 간 결제나 금융 거래의 중심이 되는 통화", status: "UNMEMORIZED" },
    { vocaId: 27, word: "상장", meaning: "주식이 증권 시장에서 거래될 수 있도록 등록하는 것", status: "MEMORIZED" },
    { vocaId: 28, word: "펀드", meaning: "다수에게 모은 자금을 전문가가 투자하여 수익을 돌려주는 상품", status: "UNMEMORIZED" },
    { vocaId: 29, word: "리스크", meaning: "투자에 따라 발생할 수 있는 위험이나 손실 가능성", status: "MEMORIZED" },
    { vocaId: 30, word: "포트폴리오", meaning: "위험 분산을 위해 여러 자산에 나누어 투자하는 방법", status: "UNMEMORIZED" },
    { vocaId: 31, word: "손익 분기점", meaning: "이익과 손실이 같아지는 지점", status: "UNMEMORIZED" },
    { vocaId: 32, word: "고용률", meaning: "전체 인구 중 취업자가 차지하는 비율", status: "MEMORIZED" },
    { vocaId: 33, word: "실업률", meaning: "경제활동인구 중 일자리가 없는 사람의 비율", status: "UNMEMORIZED" },
    { vocaId: 34, word: "비트코인", meaning: "블록체인 기술을 기반으로 하는 가상 자산", status: "MEMORIZED" },
    { vocaId: 35, word: "사회 간접 자본(SOC)", meaning: "도로, 항만 등 생산 활동에 필수적인 공공 시설", status: "UNMEMORIZED" },
    { vocaId: 36, word: "낙관론", meaning: "경제가 앞으로 좋아질 것이라고 보는 관점", status: "UNMEMORIZED" },
    { vocaId: 37, word: "비관론", meaning: "경제가 앞으로 나빠질 것이라고 보는 관점", status: "MEMORIZED" },
    { vocaId: 38, word: "매수", meaning: "물건이나 주식을 사는 것", status: "UNMEMORIZED" },
    { vocaId: 39, word: "매도", meaning: "물건이나 주식을 파는 것", status: "UNMEMORIZED" },
    { vocaId: 40, word: "블루칩", meaning: "수익성이 높고 재무 구조가 튼튼한 대형 우량주", status: "MEMORIZED" }
];

// 저장 단어 목록 조회
export async function getVoca(page = 0, size = 20) {
    // const res = await fetch(
    //     `${BASE_URL}/newsbee/vocabulary?page=${page}&size=${size}`, 
    //     {
    //         method: 'GET',
    //         credentials: 'include',
    //     }
    // );

    // if (!res.ok) {
    //     throw new Error('단어장 조회 실패');
    // }

    // const data = await res.json();

    // return data.result.vocabularies;

    return MOCK_VOCAS.slice(page * size, (page + 1) * size);
}

// 단어 학습 상태 변경
export async function updateStatus({ vocaId, status }) {
    // const res = await fetch(`${BASE_URL}/newsbee/vocabulary/${vocaId}/status`, {
    //     method: 'PATCH',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     credentials: 'include',
    //     body: JSON.stringify({ status })
    // });

    // if (!res.ok) {
    //     throw new Error('단어 학습 상태 변경 실패');
    // }

    // const data = await res.json();

    // return data.result;
    
    return {
        vocaId, status
    }
}