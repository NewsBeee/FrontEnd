import { HiOutlineMenu } from 'react-icons/hi'
import './styles/list-button.css'

export default function ListButton({ onToggle }) {
    return (
        <button className="list-button" onClick={onToggle}>
            <HiOutlineMenu size={24} />
        </button>
    )
}