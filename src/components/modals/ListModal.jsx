import './styles/list-modal.css'

const DUMMY_ARTICLES= [
  { id: 1, title: "영화 '프로젝트 헤일메리' 혼수 상태 우주여행 가능할까", link: 'https://www.dongascience.com/ko/news/76977' },
  { id: 2, title: '기사 제목 2', link: 'https://example.com/article2' },
  { id: 3, title: '기사 제목 3', link: 'https://example.com/article3' },
  
]

export default function ListModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div className="list-modal" onClick={onClose}>
            <div className="list-content" onClick={(e) => e.stopPropagation()}>
                <p className="list-header">최신순</p>
                <div className='list-container'>
                    {DUMMY_ARTICLES.map(article => (
                    <div key={article.id} className='list-item'>
                        <a href={article.link} target="_blank" rel="noopener noreferrer">
                        {article.title}
                        </a>
                    </div>
                    ))}
                </div>
            </div>
        </div>
    )
}