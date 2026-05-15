import { useEffect, useState } from "react";
import { getCurrentChallenge, getChallengeProgress, getChallengeHistory } from "../api/challengeApi";

export function convertDailyStatus(dailyStatus) {
    if (!dailyStatus) return {};

    const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

    const dayMap = {
        '일': 'sun', '월': 'mon', '화': 'tue', '수': 'wed', 
        '목': 'thu', '금': 'fri', '토': 'sat'
    };

    const result = {};
    const today = new Date().getDay();

    weekDays.forEach((day, index) => {
        const key = dayMap[day];

        if (dailyStatus[key]) {
            result[day] = 'read'; // true로 온 경우
        } else if (index === today) {
            result[day] = 'pending'; // 오늘, 안 읽음
        } else if (index > today) {
            result[day] = 'none'; // 미래
        } else {
            result[day] = 'unread'; // 과거, 안 읽음
        }
    });

    return result;
}

// 초기화 요일 계산
function getDayOfWeek(dateString) {
    if (!dateString) return '';

    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day); 
    
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    return days[date.getDay()];
}

export function useChallenge() {
    const [challenge, setChallenge] = useState(null);
    const [progress, setProgress] = useState(null);
    const [history, setHistory] = useState(null)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            setLoading(true);

            const challenge = await getCurrentChallenge();
            console.log(challenge);

            setChallenge(challenge);

            if (!challenge?.challengeId || !challenge?.weekStart) {
                const history = await getChallengeHistory();
                console.log("2. getChallengeHistory(챌린지없음) 결과:", history);

                setHistory(history);
                return
            }

            console.log("3. progress 요청 보낼 weekStart:", challenge.weekStart);
            const progress = await getChallengeProgress(challenge.weekStart);
            console.log("4. getChallengeProgress 결과:", progress);

            setProgress(progress);

            const history = await getChallengeHistory();
            console.log("5. getChallengeHistory(챌린지있음) 결과:", history);

            setHistory(history);

        } catch (err) {
            console.error(err);
            setError(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const readingStatus = convertDailyStatus(progress?.dailyStatus);

    const resetDay = challenge?.weekStart ? getDayOfWeek(challenge.weekStart) : '';

    return { 
        hasChallenge: !!challenge?.challengeId, 
        // category: challenge?.category,
        goal: challenge?.goal ?? 0,
        target: progress?.targetArticleCount ?? 0,
        completed: progress?.completedArticleCount ?? 0,
        quizAvailable: progress?.promotionQuizAvailable ?? false, 
        weekCount: history?.completedWeekCount ?? 0,
        articleCount: history?.readArticleCount ?? 0,
        level: history?.level ?? 0,
        readingStatus,
        resetDay,
        loading, 
        error,
        retry: fetchData
    };
}