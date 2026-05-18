import { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './styles/list-modal.css';

export default function ListModal({ isOpen, onClose, articles = [], loadMore, hasMore, loading, isLoggedIn }) {
    const observerRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isOpen || !hasMore) return;

        const observer = new IntersectionObserver((entries) => {
            const target = entries[0];

            if (target.isIntersecting && !loading) {
                loadMore();
            }
        }, { threshold: 0.1 });

        const currentTarget = observerRef.current;
        if (currentTarget) {
            observer.observe(observerRef.current);
        }

        return () => {
            if (currentTarget) {
                observer.unobserve(currentTarget);
            }
        };
    }, [isOpen, loadMore, hasMore, loading]);

    if (!isOpen) return null;
    
    return (
        <div className="list-modal" onClick={onClose}>
            <div className="list-content" onClick={(e) => e.stopPropagation()}>
                <div className="list-header">
                    <div className='list-header-left'>읽은 기사 목록</div>
                    <div className='list-header-right'>최신순</div>
                </div>

                <div className='list-container'>
                    {!isLoggedIn ? (
                        <div className='list-empty'>
                            <Link to='/intro'>로그인</Link>&nbsp;후 최근 기사 목록을 확인할 수 있습니다
                        </div>
                    ) : articles.length === 0 && !loading ? (
                            <div className='list-empty'>기사 목록이 없습니다</div>
                    ) : (
                        articles.map(article => (
                            <div key={article.articleId} className='list-item'>
                                <button 
                                    type="button"
                                    className='list-title'
                                    onClick={() => {
                                        onClose();
                                        navigate(`/result/${article.articleId}`, {
                                            state: { isNew: false }
                                        });
                                    }}
                                >
                                    {article.title}
                                </button>
                            </div>
                        ))
                    )}
                    
                    {isLoggedIn && (
                        loading ? (
                            <div className='list-loading'>
                                <div className='dot'></div>
                                <div className='dot'></div>
                                <div className='dot'></div>
                            </div>
                        ) : (
                            hasMore && <div ref={observerRef} style={{height: "20px", width: "100%"}} />
                        )
                    )}
                </div>
            </div>
        </div>
    )
}