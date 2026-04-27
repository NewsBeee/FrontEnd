import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { convertArticle } from '../api/articleApi'
// import { useAuth } from '../hooks/useAuth'
import Header from "../components/layout/Header"
import logo from '../assets/logo3.png'
import ListButton from '../components/common/ListButton'
import Navigation from "../components/layout/Navigation"
import ListModal from '../components/modals/ListModal'
import '../styles/home.css'

// 더미 데이터
const DUMMY_USER = {  name: '홍길동' }
const DUMMY_ARTICLES= [
  { id: 1, title: "영화 '프로젝트 헤일메리' 혼수 상태 우주여행 가능할까", link: 'https://www.dongascience.com/ko/news/76977' },
  { id: 2, title: '기사 제목 2', link: 'https://example.com/article2' },
  { id: 3, title: '기사 제목 3', link: 'https://example.com/article3' },
  { id: 3, title: '기사 제목 3', link: 'https://example.com/article3' },
  { id: 3, title: '기사 제목 3', link: 'https://example.com/article3' },
]

export default function Home() {
  const navigate = useNavigate();
  const [isListOpen, setIsListOpen] = useState(false)
  const [link, setLink] = useState('')

  // 임시  
  const user = DUMMY_USER
  const isLoggedIn = !!user

  async function handleSubmit(e) {
    e.preventDefault();

     if (!link.trim()) return alert('링크를 입력해주세요!')

    try {
      const result = await convertArticle(link);

      navigate("/result", {
        state: {article: result},
      });

      setLink('');
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  }

  return (
    <>
        <Header 
          left={<img src={logo} style={{ width: '121px' }}/>} 
          right={<ListButton isOpen={isListOpen} onToggle={() => setIsListOpen(prev => !prev)} />}
        />

        <ListModal isOpen={isListOpen} onClose={() => setIsListOpen(false)} />

        <main className='main-content'>
          <div className="home-wrapper">
            <div className='home-welcome'>
              <div className='home-user'>
                {isLoggedIn ? `반가워요! ${user.name}님` : ''}
              </div>
              <div>변환하고 싶은 기사를 <br /> 입력해주세요</div>
              <div className='home-status'>
                {isLoggedIn ? '기사의 링크를 복사해주세요!' : '비로그인 시 최대 5회까지 변환할 수 있습니다'}
                </div>
            </div>

            <form className='home-input' onSubmit={handleSubmit}>
              <input 
                type="url" 
                placeholder='기사 링크를 입력해주세요...' 
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
              <button className='convert' type="submit">
                어휘 변환하기
              </button>
            </form>

            <div className='recommend'>
              <div className='recommend-name'>추천 기사</div>
              <div className='article-list'>
                {DUMMY_ARTICLES.map(article => (
                  <div key={article.id} className='recommend-item'>
                    <a href={article.link} target="_blank" rel="noopener noreferrer">
                      {article.title}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>

        <Navigation />
    </>
  )
}