const BASE_URL = import.meta.env.VITE_BASE_URL;

// 더미 질문 리스트
// const DUMMY_QUESTIONS = [
//   {
//     questionId: 1,
//     questionText: "다음 단어의 뜻으로 가장 알맞은 것을 고르세요.",
//     choices: [
//       { choiceId: 1, choiceText: "의견" },
//       { choiceId: 2, choiceText: "가격" },
//       { choiceId: 3, choiceText: "행동" },
//       { choiceId: 4, choiceText: "방법" }
//     ]
//   },
//   {
//     questionId: 2,
//     questionText: "뉴스의 핵심 내용을 파악하기 위해 가장 중요한 요소는?",
//     choices: [
//       { choiceId: 5, choiceText: "제목" },
//       { choiceId: 6, choiceText: "광고" },
//       { choiceId: 7, choiceText: "댓글" },
//       { choiceId: 8, choiceText: "글꼴" }
//     ]
//   }
// ];

// let currentIndex = 0;

// 온보딩 문항 조회
export const fetchOnboarding = async () => {
    const res = await fetch(`${BASE_URL}/newsbee/onboarding/questions`, {
     method: "GET",   
     credentials: "include",
    });

    if (!res.ok) {
        throw new Error("온보딩 문항 조회 오류");
    }

    const data = await res.json();
    
    return data.result;

    // 테스트 코드
    // await new Promise(resolve => setTimeout(resolve, 500));

    // const question = DUMMY_QUESTIONS[currentIndex % DUMMY_QUESTIONS.length];
    
    // currentIndex++;

    // return {
    //     sessionId: "dummy-session",
    //     question: question
    // }
}

// 온보딩 답안 제출
export const submitOnboarding = async ({ sessionId, choiceId }) => {
    const res = await fetch(`${BASE_URL}/newsbee/onboarding/submit`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ sessionId, choiceId }),
    });

    if (!res.ok) {
        throw new Error("온보딩 답안 제출 오류");
    }
    
    const data = await res.json();

    return data.result;

    // 테스트 코드
    // await new Promise(resolve => setTimeout(resolve, 500));

    // return {
    //     completed: true,
    //     result: {
    //         level: 3
    //     }
    // }
}

// 승급 퀴즈 문항 조회
export const fetchPromotion = async () => {
    const res = await fetch(`${BASE_URL}/newsbee/quizzes/promotion/questions`, {
        method: "GET",
        credentials: "include",
    });

    if (!res.ok) {
        throw new Error("승급 퀴즈 문항 조회 오류");
    }

    const data = await res.json();
    
    return data.result;

    // 테스트 코드
    // await new Promise(resolve => setTimeout(resolve, 500));

    // const question = DUMMY_QUESTIONS[currentIndex % DUMMY_QUESTIONS.length];
    
    // currentIndex++;

    // return {
    //     sessionId: "dummy-session",
    //     question: question
    // }
}

// 승급 퀴즈 답안 제출
export const submitPromotion = async ({ sessionId, choiceId}) => {
    const res = await fetch(`${BASE_URL}/newsbee/quizzes/promotion/submit`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ sessionId, choiceId }),
    });

    if (!res.ok) {
        throw new Error("승급퀴즈 답안 제출 오류");
    }
    
    const data = await res.json();

    return data.result;

    // 테스트 코드
    // await new Promise(resolve => setTimeout(resolve, 500));

    // return {
    //     result: {
    //         passed: true,
    //         previousLevel: 2,
    //         newLevel: 3
    //     }
    // }
}