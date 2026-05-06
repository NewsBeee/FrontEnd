import { useLocation, Link, useNavigate } from 'react-router-dom'
import { RiMedalFill } from 'react-icons/ri'
import { FaHouse, FaUserLarge } from 'react-icons/fa6'
import './styles/navigation.css'

export default function Navigation() {
    const location = useLocation()
    const navigate = useNavigate()

    const navItems = [
        { name: '챌린지', icon: <RiMedalFill size={26} />, path: '/challenge' },
        { name: '홈', icon: <FaHouse size={26} />, path: '/', activePaths: ['/', '/result'] },
        { name: '마이페이지', icon: <FaUserLarge size={26} />, path: '/mypage' },
    ]
    
    return (
        <nav className="navigation">
            <div className='nav-container'>
                {navItems.map((page) => {
                    const isActive = page.activePaths
                        ? page.activePaths.includes(location.pathname)
                        : location.pathname === page.path;

                    return (
                        <div key={page.path} className={isActive ? 'active' : ''}>
                            <Link to={page.path}>
                                {page.icon}
                                <span>{page.name}</span>
                            </Link>
                        </div>
                    );
                })}
            </div> 
        </nav>
    )
}