import Header from "../components/layout/Header"
import BackButton from "../components/common/BackButton"
import StepIndicator from "../components/common/StepIndicator"

export default function Onboarding() {
    return (
        <>
            <Header left={<BackButton />} />
            <StepIndicator currentStep={3} />
            <div className="onboarding-wrapper">
                <h1>온보딩 페이지</h1>
            </div>
        </>
        
    )
}