import { useEffect, useRef } from 'react';
import './styles/list-modal.css'

export default function ListModal({ isOpen, onClose, articles = [], loadMore, hasMore, loading }) {
    const observerRef = useRef(null);

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
                <p className="list-header">최신순</p>

                <div className='list-container'>
                    
                    {articles.length === 0 && !loading ? (
                        <div className='list-empty'>기사 목록이 없습니다</div>
                        ): (
                            articles.map(article => (
                            <div key={article.articleId} className='list-item'>
                                <a href={article.link} target="_blank" rel="noopener noreferrer">
                                    {article.summary}
                                </a>
                            </div>
                        ))
                    )}
                    
                    {loading ? (
                        <div className='list-loading'>
                            <div className='dot'></div>
                            <div className='dot'></div>
                            <div className='dot'></div>
                        </div>
                    ) : (
                        hasMore && <div ref={observerRef} style={{height: "20px", width: "100%"}} />
                    )}
                </div>
            </div>
        </div>
    )
}