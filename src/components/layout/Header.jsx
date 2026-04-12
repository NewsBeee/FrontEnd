import './styles/header.css'

export default function Header({ left, right }) {
    return (
        <header className="header">
            <div className="left">{left}</div>
            <div className="right">{right}</div>
        </header>
    )
}