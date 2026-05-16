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
import { useToast } from '../hooks/useToast'

export default function Home() {
  const [isListOpen, setIsListOpen] = useState(false);
  const [link, setLink] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [guestCount, setGuestCount] = useState(null);
  const [summaryCount, setSummaryCount] = useState(5);

  const navigate = useNavigate();
  const { user } = useAuth();
  const { list, loadMore, hasMore, loading, reset } = useArticles(); 
  const { showToast } = useToast();

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
    if (user) return;

    async function fetchGuestCount() {
      try {
        const data = await getQuota();
        setGuestCount(data.nowCount);
      } catch (err) {
        console.error('비회원 잔여 횟수 조회 오류:',err);
        setGuestCount(5);
      }
    }
    
    fetchGuestCount();
  }, [user]);

  async function openListModal() {
    if (!user) {
      showToast("로그인 후 목록을 확인할 수 있습니다", "error");
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

  // 기사 변환 
  async function handleSubmit(e) {
    e.preventDefault();

    if (!link.trim()) {
      showToast("링크를 입력해주세요", "error");
      return;
    }

    try {
      const data = await convertArticle({
        link,
        summary_count: summaryCount,
      });

      const article = data.result;
      const articleId = article.articleId;

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
        showToast("비로그인 사용자는 최대 5회까지 변환할 수 있습니다", "error");
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
                {user 
                  ? '기사의 링크를 복사해주세요!' 
                  : guestCount == null || guestCount === 5 
                    ? '비로그인 시 최대 5회까지 변환할 수 있습니다'
                    : `변환 횟수 ${guestCount}회 남았습니다.`
                }
              </div> 
            </div>

            <form className='home-input' onSubmit={handleSubmit}>
              <input 
                type="url" 
                placeholder='기사 링크를 입력해주세요...' 
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
              <div className='summary-options'>
                <span>기사 요약</span>
                {[5, 10, 15].map((line) => (
                  <button key={line} type='button' className={summaryCount === line ? "active" : ""}
                  onClick={() => setSummaryCount(line)}>{line}줄</button>
                ))}
              </div>
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
                  recommendations.slice(0, 7).map((article, index) => (
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