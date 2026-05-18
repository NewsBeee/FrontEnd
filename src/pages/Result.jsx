import { useState } from "react";
import { useLocation } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import Header from "../components/layout/Header";
import ListButton from "../components/common/ListButton";
import Navigation from "../components/layout/Navigation";
import ListModal from "../components/modals/ListModal"; 
import WordModal from "../components/modals/WordModal";
import Error from "../components/common/Error";
import logo from "../assets/logo3.png";
import '../styles/result.css';

import { useAuth } from "../hooks/useAuth";
import { saveVoca } from "../api/wordApi";
import { useToast } from '../hooks/useToast';
import { useArticles } from '../hooks/useArticles';

export default function Result() {
    const location = useLocation();
    const { showToast } = useToast();
    const { user } = useAuth();
    const { list, loadMore, hasMore, loading, reset } = useArticles();
    
    const [isListOpen, setIsListOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedWord, setSelectedWord] = useState(null);

    const INITIAL_LIMIT = 2;
    const [limit, setLimit] = useState(INITIAL_LIMIT);
    
    const article = location.state?.article;
    const voca = article?.vocabulary || [];

    if (!article) return <Error goHome={true} />

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
                loading={loading}
            />

            <main className="main-content">
                <div className="result-wrapper">
                    <div className="result-content">
                        <span className="result-name">변환된 기사</span>
                        <div className="result-article">
                            {article.convertArticle}
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
                            {voca.slice(0, limit).map((vcb, index) => (
                                <div className="voca-item" key={`${vcb.word}-${index}`}>
                                    <button className="voca-word" onClick={() => openWordModal(vcb)}>
                                        {vcb.word}
                                    </button>
                                    <FaArrowRight />
                                    <button className="voca-meaning" onClick={() => openWordModal(vcb)}>
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