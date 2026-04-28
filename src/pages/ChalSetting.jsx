import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiList } from "react-icons/fi";
import { setChallenge } from "../api/challengeApi";
import { getKSTDate } from "../utils/date";
import Header from "../components/layout/Header";
import BackButton from "../components/common/BackButton";
import "../styles/chal-setting.css";

export default function ChalSetting() {
    const navigate = useNavigate();
    const sliderRef = useRef(null);

    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(null);
    const [value, setValue] = useState(4);

    const percent = ((value - 1) / (7 - 1)) * 100;

    const [adjusted, setAdjusted] = useState(percent);

    useEffect(() => {
        if(!sliderRef.current) return;

        const width = sliderRef.current.offsetWidth;
        const thumbSize = 15;

        const offset = (thumbSize / width) * 100;
        const newAdjusted = percent * (1 - offset) + (offset / 2);
        setAdjusted(newAdjusted);
    }, [value, percent]);

    const categories = [
        { label: "정치", value: "정치" },
        { label: "경제", value: "경제" },
        { label: "사회", value: "사회" },
        { label: "생활/문화", value: "생활/문화" },
        { label: "IT/과학", value: "IT/과학" },
        { label: "세계", value: "세계" },
    ]

    async function handleSave() {
        if (!selected) {
            alert("카테고리를 선택해주세요");
            return;
        }

        try {
            await setChallenge({
                category: selected.value,
                goal: value,
                weekStart: getKSTDate()
            });

            navigate("/challenge");
        } catch (err) {
            console.error(err);
            alert("저장 실패");
        }
    }

    return (
        <>
            <Header 
                left={
                    <div className="left-group">
                        <BackButton />
                        <span>주간 챌린지 설정</span>
                    </div>
                } 
            />

            <main className="main-content">
                <div className="chal-setting-wrapper">
                    <div className="set-category">
                        <div className="category-header">
                            <div className="category-header-text">카테고리</div>
                            <div className="category-header-sub">매주 읽고 싶은 기사의 분야를 선택하세요</div>
                        </div>    
                        <div className="dropdown">
                            <button 
                                className={`dropdown-trigger ${selected ? "active" : ''}`}
                                onClick={() => setOpen(!open)}
                            >
                                <div 
                                    className={`dropdown-icon ${selected ? "active" : ''}`}
                                >
                                    <FiList size={24}/>
                                </div>
                                <div className="dropdown-header">
                                    <span className="title">기사 분야</span>
                                    <span className="subtitle">{selected ? `${selected.label}를 선택했습니다` : '관심있는 분야의 기사를 읽어요'}</span>
                                </div>
                            </button>

                            {open && (
                                <ul className="dropdown-menu">
                                    {categories.map((opt) => (
                                        <li
                                            key={opt.value}
                                            onClick={() => {
                                                setSelected(opt);
                                                setOpen(false);
                                            }}
                                        >
                                            {opt.label}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>   

                    <div className="set-goal">
                        <div className="goal-header">
                            <div className="goal-header-text">주간 챌린지 목표</div>
                            <div className="goal-header-sub">일주일에 어느 정도 학습할까요?</div>
                        </div>
                        <div className="progress-bar">
                            <input
                                type="range" 
                                min="1"
                                max="7"
                                value={value}
                                onChange={(e) => setValue(parseInt(e.target.value))}

                                style={{ "--progress": `${percent}%` }}
                                className="slider"
                            />
                            <div className="progress-num">{value}&nbsp;<span>/주</span></div>
                        </div>
                    </div>

                    <button className="chal-save" onClick={handleSave}>챌린지 저장</button>
                </div>
            </main>
        </>
    )
}