import { useNavigate } from "react-router-dom";
import { GoChevronLeft } from "react-icons/go";
import "./styles/back-button.css"

export default function BackButton() {
    const navigate = useNavigate();

    return (
        <button onClick={() => navigate(-1)} className="back-btn">
            <GoChevronLeft size={25} />
        </button>
    )
}