import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import Header from "../components/layout/Header";
import ListButton from "../components/common/ListButton";
import Navigation from "../components/layout/Navigation";
import ListModal from "../components/modals/ListModal"; 
import WordModal from "../components/modals/WordModal";
import Error from "../components/common/Error";
import logo from "../assets/logo3.png";
import '../styles/result.css';

import { saveVoca } from "../api/wordApi";
import { useToast } from '../hooks/useToast'

export default function Result() {
    const location = useLocation();
    const navigate = useNavigate();
    const { showToast } = useToast();
    
    const [isListOpen, setIsListOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedWord, setSelectedWord] = useState(null);
    
    const article = location.state?.article;
    const voca = article?.vocabulary || [];

    if (!article) return <Error />

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

    return (
        <>
            <Header 
                left={<img src={logo} style={{ width: '121px' }}/>} 
                right={<ListButton isOpen={isListOpen} onToggle={() => setIsListOpen(prev => !prev)} />}
            />
            <ListModal isOpen={isListOpen} onClose={() => setIsListOpen(false)} />

            <main className="main-content">
                <div className="result-wrapper">
                    <div className="result-content">
                        <span className="result-name">변환된 기사</span>
                        <div className="result-article">
                            {article.convertArticle}
                            <div className="article-source">
                                <span>기사 원문: &nbsp;
                                    <a href={article.link} target="_blank" rel="noopener noreferrer">
                                        {article.link}
                                    </a>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="result-content">
                        <span className="result-name">단어장</span>
                        <div className="result-voca">
                            {voca.map((vcb, index) => (
                                <div className="voca-item" key={`${vcb.word}-${index}`}>
                                    <button className="voca-word" onClick={() => openWordModal(vcb)}>
                                        {vcb.word}
                                    </button>
                                    <FaArrowRight />
                                    <button className="voca-word" onClick={() => openWordModal(vcb)}>
                                        {vcb.meaning}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="result-content">
                        <span className="result-name">기사 요약</span>
                        <div className="result-summary">{article.summary}</div>                    
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