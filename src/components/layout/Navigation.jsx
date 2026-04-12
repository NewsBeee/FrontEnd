import { useLocation, Link } from 'react-router-dom'
import { RiMedalFill } from 'react-icons/ri'
import { FaHouse, FaUserLarge } from 'react-icons/fa6'
import './styles/navigation.css'

export default function Navigation() {
    const location = useLocation()

    const navItems = [
        { name: '챌린지', icon: <RiMedalFill size={26} />, path: '/challenge' },
        { name: '홈', icon: <FaHouse size={26} />, path: '/' },
        { name: '마이페이지', icon: <FaUserLarge size={26} />, path: '/mypage' },
    ]
    
    return (
        <nav className="navigation">
            <ul>
                {navItems.map((item) => (
                    <li key={item.path} className={location.pathname === item.path ? 'active' : ''}>
                        <Link to={item.path}>
                            {item.icon}
                            <span>{item.name}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}