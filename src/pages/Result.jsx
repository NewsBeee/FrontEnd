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

const MOCK_ARTICLE_DATA = {
    articleId: 104,
    link: "https://news.example.com/article/1263482305928027127587592837982374983749837",
    convertArticle: "지구 온난화로 인해 봄꽃이 피는 시기가 평년보다 일주일 이상 빨라졌습니다. 이로 인해 겨울잠에서 깨어난 꿀벌들이 꽃가루를 모으는 시기와 꽃이 피는 시기가 서로 어긋나는 생태계 불일치 현상이 나타나고 있습니다. 꿀벌이 사라지면 식물이 열매를 맺지 못해 인간이 먹는 농작물 생산에도 심각한 타격을 입게 됩니다. 환경 단체들은 기후 변화를 막기 위한 탄소 배출 줄이기 운동에 적극적으로 동참해야 한다고 강조합니다.",
    summary: "지구 온난화로 꽃이 일찍 피면서 꿀벌의 활동 시기와 맞지 않는 생태계 문제가 발생하고 있으며, 이는 향후 농작물 생산 감소로 이어질 위험이 있습니다.",
    vocabulary: [
        { word: "조성", meaning: "[1]무엇을 만들어서 이룸.;[2]분위기나 정세 따위를 만듦" },
        { word: "자부", meaning: "자기 자신 또는 자기와 관련되어 있는 것에 대하여 스스로 그 가치나 능력을 믿고 마음을 당당히 가짐" },
        { word: "탄소 배출", meaning: "공장을 가동하거나 차를 탈 때 지구를 덥게 만드는 온실가스를 뿜어내는 것" }
    ],
    remainingGuestCount: 2
};

export default function Result() {
    const location = useLocation();
    const navigate = useNavigate();
    const { showToast } = useToast();
    
    const [isListOpen, setIsListOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedWord, setSelectedWord] = useState(null);
    
    const article = location.state?.article || MOCK_ARTICLE_DATA;
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
                                <span>기사 원문:</span>
                                <a href={article.link} target="_blank" rel="noopener noreferrer" title={article.link}>
                                    {article.link}
                                </a>
                                
                                {/* <a href={article.link} target="_blank" rel="noopener noreferrer">
                                        {article.link}
                                    </a> */}
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
                                    <button className="voca-meaning" onClick={() => openWordModal(vcb)}>
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