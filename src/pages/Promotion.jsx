import Quiz from "../components/quiz/Quiz";
import { usePromotion } from "../hooks/usePromotion"

export default function Promotion() {
    const quizData = usePromotion();

    return <Quiz type="promotion" {...quizData} />
}