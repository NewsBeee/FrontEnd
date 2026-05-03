import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoChevronRight, GoXCircle, GoSignOut } from "react-icons/go";
import { HiOutlineBars3BottomLeft } from "react-icons/hi2";
import Header from "../components/layout/Header";
import Navigation from "../components/layout/Navigation";
import logo from "../assets/logo3.png";
import '../styles/mypage.css';

import { useAuth } from "../hooks/useAuth";
import { logout } from "../api/authApi";
import { getStats } from "../api/mypageApi";
import { useStats } from "../hooks/useStats";

export default function MyPage() {
    const {
        name,
        email,
        level,
        readCount,
        saveVoca,
        understood,
        notUnderstood,
        loading,
        error
    } = useStats();

    const navigate = useNavigate();
    const { clearUser } = useAuth();

    if (loading) return <div>로딩중...</div>;
    if (error) return <div>에러 발생</div>;

    async function handleLogout() {
        if (!window.confirm('로그아웃 하시겠습니까?')) return;

        try {
            await logout();
        } catch (e) {
            console.error(e);
        } finally {
            clearUser();
            navigate('/intro');
        }
    }

    return (
        <>
            <Header left={<img src={logo} style={{ width: '121px' }}/>} />

            <main className="main-content">
                <div className="mypage-wrapper">
                    <div className="mypage-account">
                        <div className="account-detail">
                            <div className="profile-img">

                            </div>
                            <div className="profile-detail">
                                <div className="profile-nickname">{name} 님</div>
                                <div className="profile-email">{email}</div>
                            </div>
                            <button className="to-accountdetail" onClick={() => navigate('/account-detail')}>
                                <GoChevronRight size={28} />
                            </button>
                        </div>
                        
                        <div className="account-record">
                            <div className="mylevel">
                                Lv.{level}
                                <span>읽기 레벨</span>
                            </div>
                            <div className="myarticle">
                                {readCount}
                                <span>읽은 기사</span>
                            </div>
                            <div className="myword">
                                {saveVoca}
                                <span>저장한 어휘</span>
                            </div>
                        </div>

                        <div className="mypage-voca-section">
                            <span>단어장</span>
                            <button className="mypage-voca" onClick={() => navigate('/vocabulary')}>
                                <div className="mypage-voca-container">
                                    <div className="mypage-voca-header">
                                        <div className="header-num">
                                            <HiOutlineBars3BottomLeft size={23} strokeWidth={2}/> 
                                            내 단어 {saveVoca}개
                                        </div>
                                        <div className="header-chevron"><GoChevronRight size={23} /></div>
                                    </div>
                                    <div className="voca-record">
                                        <div className="voca-yet">
                                            {notUnderstood}
                                            <span>아직 모르겠어요</span>
                                        </div>
                                        <div className="voca-know">
                                            {understood}
                                            <span>이제 알겠어요</span>
                                        </div>
                                    </div>
                                </div>
                            </button>
                        </div>    

                        <div className="mypage-setting-section">
                            <span>설정</span>
                            <div className="mypage-setting">
                                <button className="logout-btn" onClick={handleLogout}>
                                    <div className="logout"><GoSignOut size={23} /> 로그아웃</div>
                                    <GoChevronRight size={23} />
                                    {/*<div className="logout-chevron"><GoChevronRight size={23} /></div>*/}
                                </button>
                                <button className="to-delete" onClick={() => navigate('/withdraw')}>
                                    <div className="delete"><GoXCircle size={23} /> 회원 탈퇴</div>
                                    <GoChevronRight size={23} />
                                    {/*<div className="delete-chevron"></div>*/}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Navigation />
        </>
    )
}