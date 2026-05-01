import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa6";
import { FiCheck } from "react-icons/fi";
import { IoIosClose } from "react-icons/io";
import Header from "../components/layout/Header";
import Navigation from "../components/layout/Navigation"
import logo from "../assets/logo3.png";
import stampImage from "../assets/stamp2.png";
import "../styles/challenge.css";

import { useChallenge } from "../hooks/useChallenge";

export default function Challenge() {
    const {
        hasChallenge, 
        goal, 
        target, 
        completed, 
        quizAvailable, 
        weekCount,
        articleCount,
        level,
        readingStatus, 
        resetDay,
        loading, 
        error
     } = useChallenge();

    if (loading) return <div>로딩중...</div>;
    if (error) return <div>에러 발생</div>;

    const percent = goal > 0 ? Math.min((completed / goal) * 100, 100) : 0;

    const stamps = [1, 2, 3, 4];
    const isCompletedThisWeek = completed >= target;

    const rawCount = weekCount % 4 + (isCompletedThisWeek ? 1 : 0);

    const stampCount = rawCount > 4 ? 4 : rawCount;

    return (
        <>
            <Header left={<img src={logo} style={{ width: '121px' }}/>} />

            <main className="main-content">
                <div className="chal-wrapper">
                    {!hasChallenge ? (
                        <div className="chal-goal">
                            <div className="chal-goal-text">
                                <div className="text-header">이번주 목표를 설정하지 않으셨네요!</div>
                                <div className="text-sub">새로운 목표를 설정하고 승급 챌린지에 도전해보세요!</div>
                            </div>
                            <Link to="/challenge/setting" className="to-chal-setting">
                                목표 설정하기<FaChevronRight />
                            </Link>
                        </div>
                    ) : (
                        <div className="chal-goal-current">
                            <div className="goal-current">
                                <div className="goal-text">
                                    <div className="goal-header">이번주 챌린지</div>
                                    <div className="goal-sub">기사 {goal}개 읽기</div>
                                </div>
                                <div className="goal-num">{completed}/{goal}</div>
                            </div>
                            <div className="goal-progress">
                                <div 
                                    className="goal-progress-bar"
                                    style={{width: `${percent}%`}}
                                />
                            </div>
                            <div className="goal-description">
                                {goal-completed}개만 더 읽으면 완료!<br/>매주 {resetDay}요일에 기록이 초기화 돼요!
                            </div>
                        </div>
                    )}
                
                    <div className="chal-tracker">
                        <p>이번주 읽기 기록</p>
                        <div className="week-wrapper">
                            {Object.keys(readingStatus).map((day) => {
                                const status = readingStatus[day] || 'none';
                                return (
                                    <div key={day} className="day-item">
                                        <div className={`status-box ${status}`}>
                                            {status === 'read' ? <FiCheck strokeWidth={3}/> : status === 'unread' ? <IoIosClose size={30} strokeWidth={4}/> : status === 'pending' ? '?' : ''}
                                        </div>
                                        <span className={`day-label ${status === 'pending' ? 'active-day' : ''}`}>{day}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="chal-achievements">
                        <p>달성 현황</p>
                        <div className="achievements-wrapper">
                            <div className="achievement-week">
                                <div className="count">{weekCount}</div>
                                <div className="name">완료한 주</div>
                            </div>
                            <div className="achievement-count">
                                <div className="count">{articleCount}</div>
                                <div className="name">읽은 기사</div>
                            </div>
                            <div className="achievement-level">
                                <div className="count">{level}</div>
                                <div className="name">나의 레벨</div>
                            </div>
                        </div>
                    </div>

                    <div className="chal-record">
                        <div className="chal-record-header">
                            <div className="record-name">승급 퀴즈 도전</div>
                            <div className="record-description">4개를 모으면 승급 퀴즈에 도전할 수 있어요</div>    
                        </div>
                        <div className="stamp-list">
                            {stamps.map((num) => (
                                <div 
                                    key={num} 
                                    className={`stamp-slot ${num <= stampCount ? 'active' : 'empty'}`}
                                >
                                    {num <= stampCount ? (
                                        <img src={stampImage} className="stamp-img" />
                                    ) : (
                                        <span className="stamp-number"></span>
                                    )}
                                </div>
                            ))}
                        </div>
                        {quizAvailable ? (
                            <div className="chal-quiz-btn active">
                                <Link to='/promotion' className="chal-btn">승급 퀴즈 도전하기</Link>
                            </div>
                        ):(
                            <div className="chal-quiz-btn">
                                1주만 더 달성하면 퀴즈 도전 가능
                            </div>
                        )}
                        
                    </div>
                </div>
            </main>

            <Navigation />
        </>
    )
}