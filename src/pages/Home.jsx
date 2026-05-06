import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from "../components/layout/Header"
import logo from '../assets/logo3.png'
import ListButton from '../components/common/ListButton'
import Navigation from "../components/layout/Navigation"
import ListModal from '../components/modals/ListModal'
import '../styles/home.css'

import { convertArticle, getQuota, getRecommendation, recordRead } from '../api/articleApi'
import { useAuth } from '../hooks/useAuth'
import { useArticles } from '../hooks/useArticles'

export default function Home() {
  const [isListOpen, setIsListOpen] = useState(false);
  const [link, setLink] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [guestCount, setGuestCount] = useState(null);

  const navigate = useNavigate();
  const { user } = useAuth();
  const { list, loadMore, hasMore, loading, reset } = useArticles(); 

  // 추천 기사
  useEffect(() => {
    async function fetchRecommendations() {
      if (!user) {
        setRecommendations([]);
        return;
      }

      try {
        const data = await getRecommendation(user.level);
        setRecommendations(data);
      } catch (err) {
        console.error("추천 기사 로딩 오류:", err);
      }
    }

    fetchRecommendations();
  }, [user]);

  // 비회원 잔여 횟수
  useEffect(() => {
    async function fetchGuestCount() {
      if (user) return;

      try {
        const data = await getQuota();
        setGuestCount(data);
      } catch (err) {
        console.error('비회원 잔여 횟수 조회 오류:',err);
      }

      fetchGuestCount();
    }
  }, [user]);

  async function openListModal() {
    if (!user) {
      alert('로그인 후 목록을 확인할 수 있습니다.')
      return;
    }

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

    try {
      // 기사 변환 요청
      const data = await convertArticle(link);

      const article = data.result;
      const articeId = article.articleId;

      // 기사 읽기 기록 저장 요청
      if (user) {
        await recordRead(articleId);
      } 
    
      navigate("/result", {
        state: { article },
      });

      setLink('');
    } catch (err) {
      console.error(err);

      // 비회원 사용 횟수 초과
      if (err.status === 403 && err.data?.code === "ARTICLE_403") {
        alert("비로그인 사용자는 최대 5회까지 변환할 수 있습니다.");
        navigate("/intro");
        return;
      }

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
                {!user ? (
                  <div className='recommend-login'>
                    <Link to='/intro'>로그인</Link> 후 맞춤 추천 기사를 읽어볼 수 있어요
                  </div>
                ) : recommendations.length > 0 ? (
                  recommendations.map((article, index) => (
                    <div key={index} className='recommend-item'>
                      <a href={article.link} target="_blank" rel="noopener noreferrer">
                        {article.title}
                      </a>
                    </div>
                  ))
                ) : (
                  <div style={{color: "#727272", fontSize: "13px"}}>추천 기사가 없습니다.</div>
                )}
              </div>
            </div>
          </div>
        </main>

        <Navigation />
    </>
  )
}