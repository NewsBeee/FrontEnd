import Header from "../components/layout/Header"
import logo from '../assets/logo3.png'
import Navigation from "../components/layout/Navigation"
import '../styles/home.css'

export default function Home() {
  return (
    <>
        <Header left={<img src={logo} style={{ width: '121px' }}/>} />
        <div className="home-wrapper">
            <h1>홈 페이지</h1>
        </div>
        <Navigation />
    </>
  )
}