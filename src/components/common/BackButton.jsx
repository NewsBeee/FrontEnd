import { useNavigate } from "react-router-dom";
import { GoChevronLeft } from "react-icons/go";
import "./styles/back-button.css"

export default function BackButton({to, state}) {
    const navigate = useNavigate();

    function handleBack() {
        if (to) {
            navigate(to, { state });
        } else {
            navigate(-1);
        }
    }

    return (
        <button onClick={handleBack} className="back-btn">
            <GoChevronLeft size={35} strokeWidth={1}/>
        </button>
    )
}