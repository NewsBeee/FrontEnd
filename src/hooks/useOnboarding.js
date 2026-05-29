import { useEffect, useState } from "react";
import { fetchOnboarding, submitOnboarding } from "../api/quizApi";
import { useToast } from "./useToast";

export function useOnboarding() {
    const [sessionId, setSessionId] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [selectedChoiceId, setSelectedChoiceId] = useState(null);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { showToast } = useToast();

    const loadOnboarding = async () => {
        try {
            setLoading(true);
            setError(null);

            const data = await fetchOnboarding();

            // console.log("온보딩 응답:", data);

            setSessionId(data.sessionId);
            setCurrentQuestion(data.question);
            setSelectedChoiceId(null);
        } catch (err) {
            console.error(err);
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadOnboarding();
    }, []);

    const selectAnswer = (choiceId) => {
        setSelectedChoiceId(choiceId);
    };

    const submitAnswer = async () => {
        if (selectedChoiceId === null) {
            showToast("답안을 선택해주세요.", "error");
            return;
        }

        try {
            setError(null);

            const res = await submitOnboarding({
                sessionId,
                choiceId: selectedChoiceId,
            });

            if (res.completed) {
                setResult(res);
                return;
            }
            
            setCurrentQuestion(res.nextQuestion);
            setSelectedChoiceId(null);
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
        selectedChoiceId,
        selectAnswer,
        submitAnswer,
        result,
        retry: loadOnboarding,
    } 
}