import { useEffect, useRef } from 'react';
import './styles/list-modal.css'

export default function ListModal({ isOpen, onClose, articles = [], loadMore, hasMore, loading, setList }) {
    const observerRef = useRef(null);

    useEffect(() => {
        if (!isOpen || !hasMore || loading) return;

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasMore && !loading) {
                loadMore();
            }
        }, { threshold: 1.0 });

        // const target = observerRef.current;
        // observer.observe(target);

        // return () => observer.unobserve(target);
        if (observerRef.current) {
            observer.observe(observerRef.current);
        }

        return () => observer.disconnect();
    }, [isOpen, loadMore, hasMore, loading]);

    if (!isOpen) return null;
    
    return (
        <div className="list-modal" onClick={onClose}>
            <div className="list-content" onClick={(e) => e.stopPropagation()}>
                <p className="list-header">최신순</p>

                <div className='list-container'>
                    {articles.map(article => (
                        <div key={article.articleId} className='list-item'>
                            <a href={article.link} target="_blank" rel="noopener noreferrer">
                                {article.summary}
                            </a>
                        </div>
                    ))}

                    <div ref={observerRef} style={{ height: "10px", width: "100%" }} />
                </div>

                {loading && <div>불러오는 중...</div>}
            </div>
        </div>
    )
}