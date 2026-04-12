import './styles/step-indicator.css'

export default function StepIndicator({ currentStep, totalSteps = 3 }) {
    return (
        <div className="step-wrapper">
            {Array.from({ length: totalSteps }, (_, i) => (
                <div
                    key={i}
                    className={`step ${i < currentStep ? "active" : ""}`}
                />
            ))}
        </div>
    );
}