import { useEffect, useState } from "react";
import { getCurrentChallenge, getChallengeProgress, getChallengeHistory } from "../api/challengeApi";

export function convertDailyStatus(dailyStatus) {
    if (!dailyStatus) return {};

    const result = {};

    const weekDays = ['월','화','수','목','금','토','일'];

    const dayMap = {
        '월': 'mon',
        '화': 'tue',
        '수': 'wed',
        '목': 'thu',
        '금': 'fri',
        '토': 'sat',
        '일': 'sun'
    };

    const todayIndex = new Date().getDay();
    const weekOrder = ['sun','mon','tue','wed','thu','fri','sat'];
    const todayKey = weekOrder[todayIndex];

    weekDays.forEach((day) => {
        const key = dayMap[day];

        if (key === todayKey) {
            result[day] = 'pending'; // 오늘
        } else if (dailyStatus[key]) {
            result[day] = 'read';
        } else {
            const currentIdx = weekOrder.indexOf(key);
            const todayIdx = weekOrder.indexOf(todayKey);

            if (currentIdx > todayIdx) {
                    result[day] = 'none';
            } else {
                    result[day] = 'unread';
            }
        }
    });

    return result;
}

// 초기화 요일 계산
function getDayOfWeek(dateString) {
    const date = new Date(dateString);
    date.setDate(date.getDate() + 7);
    const days = ['일','월','화','수','목','금','토'];
    return days[date.getDay()];
}

export function useChallenge() {
    const [challenge, setChallenge] = useState(null);
    const [progress, setProgress] = useState(null);
    const [history, setHistory] = useState(null)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const challenge = await getCurrentChallenge();

                setChallenge(challenge);

                const progress = await getChallengeProgress(challenge.weekStart);

                setProgress(progress);

                const history = await getChallengeHistory();

                setHistory(history);

            } catch (err) {
                console.error(err);
                setError(err);
            } finally {
                setLoading(false);
            }
        }

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
        error 
    };
}