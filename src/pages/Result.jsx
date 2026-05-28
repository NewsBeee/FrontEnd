import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import Header from "../components/layout/Header";
import ListButton from "../components/common/ListButton";
import Navigation from "../components/layout/Navigation";
import ListModal from "../components/modals/ListModal"; 
import WordModal from "../components/modals/WordModal";
import Loading from "../components/common/Loading";
import Error from "../components/common/Error";
import logo from "../assets/logo3.png";
import '../styles/result.css';

import { saveVoca } from "../api/wordApi";
import { getArticleDetail } from "../api/articleApi";

import { useAuth } from "../hooks/useAuth";
import { useArticles } from '../hooks/useArticles';
import { useToast } from '../hooks/useToast';

export default function Result() { 
    const { articleId } = useParams();
    const location = useLocation();

    const isNew = location.state?.isNew ?? false;
    const articleState = location.state?.article;

    const { user } = useAuth();
    const { showToast } = useToast();
    const { list, loadMore, hasMore, loading: listLoading, reset } = useArticles();
    
    const [article, setArticle] = useState(articleState || null);
    const [articleLoading, setArticleLoading] = useState(!articleState);
    const [error, setError] = useState(null);
    const [isListOpen, setIsListOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedWord, setSelectedWord] = useState(null);

    const INITIAL_LIMIT = 2;
    const [limit, setLimit] = useState(INITIAL_LIMIT);

    useEffect(() => {
        if (articleState) {
            setArticle(articleState);
            setArticleLoading(false);
            return;
        }

        if (isNew) {
            setArticleLoading(false);
            return;
        }

        if (!articleId) {
            setArticleLoading(false);
            return;
        }

        async function fetchArticle() {
            try {
                const data = await getArticleDetail(articleId);
                console.log("기사 상세 정보:", data);
                setArticle(data);
            } catch (err) {
                console.error(err);
                setError(err);
            } finally {
                setArticleLoading(false);
            }
        }

        fetchArticle();
    }, [articleId, isNew, articleState]);

    const voca = article?.vocabulary || [];

    if (articleLoading) return <Loading message="데이터를 불러오는 중입니다..." />;

    if (!article) return <Error goHome={true} />

    // 변환 단어 강조
    function renderConvertArticle(text, replacementMap = []) {
        const items = Array.isArray(replacementMap)
            ? replacementMap
            : Object.values(replacementMap);

        const words = items.map(item =>
            typeof item === 'object' && item !== null ? item.word : item
        ).filter(Boolean);

        if (!text || words.length === 0) return text;

        const escapedWords = words.map(word => word.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'));

        const regex = new RegExp(`(${escapedWords.join('|')})`, 'g');

        return text.split(regex).map((part, index) => 
            words.includes(part) ? (
            <span key={index} className="highlighted-word">{part}</span>
        ) : (
            part
        ));
    }

    function openWordModal(vcb) {
        setSelectedWord(vcb);
        setIsModalOpen(true);
    }

    async function handleSaveWord() {
        try {
            await saveVoca({
                articleId: article.articleId,
                word: selectedWord.word,
                meaning: selectedWord.meaning,
            });

            showToast("단어가 저장되었습니다", "save");
            setIsModalOpen(false);
        } catch (err) {
            console.error(err);
            showToast(err.message, "fail");
        }
    }

    async function openListModal() {
        if (isListOpen) {
            setIsListOpen(false);
            return;
        }
        
        reset();
        setIsListOpen(true);

        if (user) {
            await loadMore();
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
                loading={listLoading}
                isLoggedIn={!!user}
            />

            <main className="main-content">
                <div className="result-wrapper">
                    <div className="result-content">
                        <span className="result-name">변환된 기사</span>
                        <div className="result-article">
                            <p className="article-text">{renderConvertArticle(article.convertArticle, article.replacement_map)}</p>
                            <div className="article-source">
                                <span>기사 원문:</span>
                                <a href={article.link} target="_blank" rel="noopener noreferrer" title={article.link}>
                                    {article.link}
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="result-content">
                        <span className="result-name">기사 요약</span>
                        <div className="result-summary">{article.summary}</div>                    
                    </div>
                    <div className="result-content">
                        <span className="result-name">단어장</span>
                        <div className="result-voca">
                            
                            {voca.length === 0 ? (
                                <div className="empty-voca">저장한 단어가 없습니다</div>
                            ) : (
                                <>
                                    {voca.slice(0, limit).map((vcb, index) => (
                                        <div className="voca-item" key={`${vcb.word}-${index}`}>
                                            <button 
                                                className={`voca-word ${!isNew ? 'disabled' : ''}`}
                                                onClick={() => isNew && openWordModal(vcb)}
                                            >
                                                {vcb.word}
                                            </button>
                                            <FaArrowRight />
                                            <button 
                                                className={`voca-meaning ${!isNew ? 'disabled' : ''}`}
                                                onClick={() => isNew && openWordModal(vcb)}
                                            >
                                                {vcb.meaning}
                                            </button>
                                        </div>
                                    ))}

                                    {voca.length > INITIAL_LIMIT && (
                                        <div className="voca-more-action">
                                            {limit < voca.length ? (
                                                <button 
                                                    className="more-btn" 
                                                    onClick={() => setLimit(voca.length)}
                                                >
                                                    더보기 (+{voca.length - limit})
                                                </button>
                                            ) : (
                                                <button 
                                                    className="more-btn" 
                                                    onClick={() => setLimit(INITIAL_LIMIT)}
                                                >
                                                    접기
                                                </button>
                                            )}
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                    
                </div>
            </main>

            <WordModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                wordData={selectedWord}
                onSave={handleSaveWord}
            />

            <Navigation />
        </>
    )
}