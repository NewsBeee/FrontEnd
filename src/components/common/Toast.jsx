import { BsCheckCircleFill, BsBookmarkFill, BsXCircleFill } from "react-icons/bs";
import { IoAlertCircle } from "react-icons/io5";
import './styles/toast.css'

export default function Toast({ message, type }) {
    const icon = {
        success: <BsCheckCircleFill size={18} />,
        error: <IoAlertCircle size={22}/>,
        fail: <BsXCircleFill size={18} />, 
        save: <BsBookmarkFill size={18} />, 
    }

    return (
        <div className='toast-container'>
            <div className="toast-icon">
                {icon[type]}
            </div>
            <div className="toast-message">
                {message}
            </div>
        </div>
    )
}