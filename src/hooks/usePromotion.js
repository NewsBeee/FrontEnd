import { useEffect, useState } from "react";
import { fetchPromotion, submitPromotion } from "../api/quizApi";

export function usePromotion() {
    const [sessionId, setSessionId] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [selectedChoiceId, setSelectedChoiceId] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [result, setResult] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadPromotion = async () => {
            try {
                const data = await fetchPromotion();

                setSessionId(data.sessionId);
                setCurrentQuestion(data.question);
            } catch (err) {
                console.error(err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        loadPromotion();
    }, []);

    const selectAnswer = (choiceId) => {
        setSelectedChoiceId(choiceId);
    };

    const submitAnswer = async () => {
        if (selectedChoiceId === null) {
            alert("답안을 선택해주세요.");
            return;
        }

        try {
            const res = await submitPromotion({
                sessiondId,
                choiceId: selectedChoiceId
            });
            
            if (res.completed) {
                setResult(res);
                return;
            }

            const nextQuestion = await fetchPromotion();

            setSessionId(nextQuestion.sessionId);
            setCurrentQuestion(nextQuestion.question);
            setSelectedChoiceId(null);
            setCurrentIndex((prev) => prev + 1);
        } catch (err) {
            console.error(err);
            setError(err);
        }
    };

    return {
        loading,
        error,
        sessionId,
        currentQuestion,
        currentIndex,
        selectedChoiceId,
        selectAnswer,
        submitAnswer,
        result
    } 
}