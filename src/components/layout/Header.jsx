import './styles/header.css'
import logo from '../../assets/logo3.png'

export default function Header({ left, right }) {
    return (
        <header className="header">
            <div className="left">{left}</div>
            <div className="right">{right}</div>
        </header>
    )
}