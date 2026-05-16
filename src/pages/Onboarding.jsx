import Quiz from "../components/quiz/Quiz"
import { useOnboarding } from "../hooks/useOnboarding"

export default function Onboarding() {
        const quizData = useOnboarding();

        return <Quiz type="onboarding" {...quizData} />
}