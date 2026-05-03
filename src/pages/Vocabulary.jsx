import { useState, useEffect, useRef } from "react";
import { IoIosSearch } from "react-icons/io";
import Header from "../components/layout/Header";
import BackButton from "../components/common/BackButton";
import "../styles/voca.css"

import { updateStatus } from "../api/wordApi";
import { useWord } from "../hooks/useWord";

export default function Vocabulary() {
    const observerRef = useRef(null);
    const { list, setList, loadMore, hasMore, loading } = useWord();
    const [filter, setFilter] = useState("all");
    const [text, setText] = useState("");

    useEffect(() => {
        if (!observerRef.current) return;

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                loadMore();
            }
        });

        observer.observe(observerRef.current);

        return () => observer.disconnect();
    }, [loadMore]);

    const filterVoca = list.filter(item => {
        const matchFilter =
            filter === "all" || 
            (filter === "known" && item.status === "MEMORIZED") ||
            (filter === "unknown" && item.status === "UNMEMORIZED");

        const matchSearch = item.word.includes(text); 

        return matchFilter && matchSearch;
    })

    async function toggleStatus(id, currentStatus) {
        const nextStatus = 
            currentStatus === "MEMORIZED" ? "UNMEMORIZED" : "MEMORIZED";
        
        try {
            await updateStatus({
                vocaId: id,
                status: nextStatus,
            });

            setList(prev =>
                prev.map(item =>
                    item.vocaId === id
                        ? { ...item, status: nextStatus }
                        : item
                )
            );
        } catch (e) {
            console.error(e);
            alert("단어 상태 변경 처리 중 오류가 발생했습니다");
        }
    }

    return (
        <>
            <Header 
                left={
                    <div className="left-group">
                        <BackButton />
                        <span>단어장</span>
                    </div>
                }
            />

            <main className="main-content">
                <div className="voca-wrapper">
                    <div className="voca-header">
                        <div className="search-container">
                            <span><IoIosSearch size={25} strokeWidth={15} /></span>
                            <input 
                                className="search" 
                                placeholder="단어 검색"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                            />
                        </div>
                        
                        <div className="search-tags">
                            <button 
                                className={`tag ${filter === "all" ? "active" : ""}`}
                                onClick={() => setFilter("all")}
                            >전체</button>
                            <button 
                                className={`tag ${filter === "unknown" ? "active" : ""}`}
                                onClick={() => setFilter("unknown")}
                            >모르겠어요</button>
                            <button 
                                className={`tag ${filter === "known" ? "active" : ""}`}
                                onClick={() => setFilter("known")}
                            >외웠어요</button>
                        </div>
                    </div>

                    <div className="vocabulary">
                        {filterVoca.map(item => (
                            <div className="voca-container" key={item.vocaId}>
                                <div className="word-items">
                                    <div className="word">{item.word}</div>
                                    <div className="meaning">{item.meaning}</div>
                                </div>
                                <button 
                                    className={`toggle-switch ${item.status === "MEMORIZED" ? "on" : ""}`}
                                    onClick={() => toggleStatus(item.vocaId, item.status)}
                                >
                                    <span className="toggle-handle"></span>
                                </button>
                            </div>
                        ))}

                        {loading && <div>불러오는 중...</div>} 

                        <div ref={observerRef} style={{ height: "1px" }} />                 
                    </div>
                </div>
            </main>
        </>
    )
}