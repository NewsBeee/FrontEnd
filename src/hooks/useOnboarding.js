import { useEffect, useState } from "react";
import { fetchOnboarding, submitOnboarding } from "../api/quizApi";

export function useOnboarding() {
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState([]);

    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState(null);

    useEffect(() => {
        const loadOnboarding = async () => {
            try {
                const data = await fetchOnboarding();
                setQuestions(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        loadOnboarding();
    }, []);

    const currentQuestion = questions[currentIndex];

    const selectAnswer = (questionId, choiceId) => {
        setAnswers((prev) => {
            const filtered = prev.filter((a) => a.questionId !== questionId);
            return [...filtered, { questionId, choiceId }];
        })
    };

    const nextQuestion = () => {
        setCurrentIndex((prev) => prev + 1);
    }

    const submitQuiz = async () => {
        try {
            const res = await submitOnboarding(answers);
            setResult(res);
        } catch (err) {
            console.error(err);
        }
    };

    return {
        loading,
        currentQuestion,
        currentIndex,
        total: questions.length,
        selectAnswer,
        nextQuestion,
        submitQuiz,
        result
    } 
}