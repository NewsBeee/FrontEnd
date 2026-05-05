import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from "../components/layout/Header"
import logo from '../assets/logo3.png'
import ListButton from '../components/common/ListButton'
import Navigation from "../components/layout/Navigation"
import ListModal from '../components/modals/ListModal'
import '../styles/home.css'

import { convertArticle, getRecommendation, recordRead } from '../api/articleApi'
import { useAuth } from '../hooks/useAuth'
import { useArticles } from '../hooks/useArticles'

// 더미 데이터
// const DUMMY_USER = {  name: '홍길동' }
const DUMMY_ARTICLES= [
  { id: 1, title: "영화 '프로젝트 헤일메리' 혼수 상태 우주여행 가능할까", link: 'https://www.dongascience.com/ko/news/76977' },
  { id: 2, title: '기사 제목 2', link: 'https://example.com/article2' },
  { id: 3, title: '기사 제목 3', link: 'https://example.com/article3' },
]

export default function Home() {
  const [isListOpen, setIsListOpen] = useState(false);
  const [link, setLink] = useState('');
  const [recommendations, setRecommendations] = useState([]);

  const navigate = useNavigate();
  const { user } = useAuth();
  const { list, loadMore, hasMore, loading, reset } = useArticles(); 

  // 임시  
  // const user = DUMMY_USER
  // const isLoggedIn = !!user

  useEffect(() => {
    async function fetchRecommendations() {
      try {
        const currentLevel = user?.level || 2;

        const data = await getRecommendation(currentLevel);
        setRecommendations(data);
      } catch (err) {
        console.error("추천 기사 로딩 실패:", err);
      }
    }

    fetchRecommendations();
  }, [user]);

  async function openListModal() {
    if (isListOpen) {
      setIsListOpen(false);
      return;
    }
    
    reset();
    setIsListOpen(true);
    await loadMore();
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!link.trim()) return alert('링크를 입력해주세요!');

    // 비로그인
    // if (!user) {
    //   const count = Number(localStorage.getItem('guestConvertCount') || 0);

    //   if (count >= 5) {
    //     alert('비로그인 사용자는 최대 5회까지만 변환할 수 있습니다.');
    //     navigate('/login');
    //     return;
    //   }
    // }

    try {
      // 기사 변환 요청
      const data = await convertArticle(link);

      // if (!user) {
      //   const count = Number(localStorage.getItem('guestConvertCount') || 0);
      //   localStorage.setItem('guestConvertCount', count + 1);
      // }

      // 기사 읽기 기록 저장 요청
      const articleId = data.result.articleId;

      // if (user) {
      //   await recordRead(articleId);
      // } 

      await recordRead(articleId);
    
      navigate("/result", {
        state: {article: data.result},
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
          right={<ListButton isOpen={isListOpen} onToggle={openListModal} />}
        />

        <ListModal 
          isOpen={isListOpen} 
          onClose={() => setIsListOpen(false)} 
          articles={list}
          loadMore={loadMore}
          hasMore={hasMore}
          loading={loading}
         />

        <main className='main-content'>
          <div className="home-wrapper">
            <div className='home-welcome'>
              <div className='home-user'>
                {user ? `반가워요! ${user.nickname}님` : ''}
              </div>
              <div>변환하고 싶은 기사를 <br /> 입력해주세요</div>
              <div className='home-status'>
                {user ? '기사의 링크를 복사해주세요!' : '비로그인 시 최대 5회까지 변환할 수 있습니다'}
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
                {recommendations.length > 0 ? (
                  recommendations.map((article, index) => (
                    <div key={index} className='recommend-item'>
                      <a href={article.link} target="_blank" rel="noopener noreferrer">
                        {article.title}
                      </a>
                    </div>
                  ))
                ) : (
                  <div className='recommend-item'>로그인 후 이용할 수 있습니다.</div>
                )}
              </div>
            </div>
          </div>
        </main>

        <Navigation />
    </>
  )
}