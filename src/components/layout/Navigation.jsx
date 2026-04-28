import { useLocation, Link, useNavigate } from 'react-router-dom'
import { RiMedalFill } from 'react-icons/ri'
import { FaHouse, FaUserLarge } from 'react-icons/fa6'
import './styles/navigation.css'

// 임시
const DUMMY_USER = { name: '홍길동' }

export default function Navigation() {
    const location = useLocation()
    const navigate = useNavigate()

    const navItems = [
        { name: '챌린지', icon: <RiMedalFill size={26} />, path: '/challenge' },
        { name: '홈', icon: <FaHouse size={26} />, path: '/', activePaths: ['/', '/result'] },
        { name: '마이페이지', icon: <FaUserLarge size={26} />, path: '/mypage' },
    ]

    // 임시
    const user = DUMMY_USER
    const isLoggedIn = !!user

    const handleNavClick = (e, page) => {
        if (!isLoggedIn && page.path !== '/') {
            e.preventDefault()
            navigate('/intro')
        }
    }
    
    return (
        <nav className="navigation">
            {/* <ul>
                {navItems.map((item) => (
                    <li key={item.path} className={location.pathname === item.path ? 'active' : ''}>
                        <Link to={item.path} onClick={(e) => handleNavClick(e, item)}>
                            {item.icon}
                            <span>{item.name}</span>
                        </Link>
                    </li>
                ))}
            </ul> */}
            <div className='nav-container'>
                {/* {navItems.map((page) => (
                    <div key={page.path} className={
                        page.activePaths
                            ? page.activePaths.includes(location.pathname) ? 'active' : ''
                            : location.pathname === page.path ? 'active' : ''
                    }>
                        <Link to={page.path} onClick={(e) => handleNavClick(e, page)}>
                            {page.icon}
                            <span>{page.name}</span>
                        </Link>
                    </div>
                ))} */}
                {navItems.map((page) => {
                    const isActive = page.activePaths
                        ? page.activePaths.includes(location.pathname)
                        : location.pathname === page.path;

                    return (
                        <div key={page.path} className={isActive ? 'active' : ''}>
                            <Link to={page.path} onClick={(e) => handleNavClick(e, page)}>
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