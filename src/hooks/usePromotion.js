import { use, useEffect, useState } from "react";
import { fetchPromotion, submitPromotion } from "../api/quizApi";

export function usePromotion() {
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState([]);

    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState(null);

    useEffect(() => {
        const loadPromotion = async () => {
            try {
                const data = await fetchPromotion();
                setQuestions(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        loadPromotion();
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
            const res = await submitPromotion(answers);
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