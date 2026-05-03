import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/layout/Header";
import BackButton from "../components/common/BackButton";
import DeleteImg from "../assets/sad.png";
import "../styles/withdraw.css"

import { deleteAccount } from "../api/authApi";
import { useAuth } from "../hooks/useAuth";

export default function Withdraw() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); 
    const { clearUser } = useAuth();
    
    async function handleDelete() {
        // if (!window.confirm('정말 계정을 삭제하시겠습니까?')) return;

        try {
            setLoading(true);

            await deleteAccount();

            clearUser();

            alert('회원 탈퇴가 정상적으로 처리되었습니다.');
            navigate('/intro');
        } catch (error) {
            console.error(error);
            alert('회원 탈퇴 처리 중 오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <Header 
                left={
                    <div className="left-group">
                        <BackButton />
                        <span>회원 탈퇴</span>
                    </div>
                }
            />
            <main className="main-content">
                <div className="delete-content">
                    <div className="delete-header">
                        계정을 삭제하시겠습니까?
                        <span>계정 삭제 후 30일이 지나면 뉴스비와의 모든 기록이 사라져요!</span>
                    </div>
                    
                    <div className="delete-img">
                        <img src={DeleteImg} style={{width: "180px"}}/>
                    </div>

                    <div className="delete-btns">
                        <button 
                            className="delete-btn"
                            onClick={handleDelete}
                            disabled={loading}
                        >
                            계정 삭제
                        </button>
                        <button 
                            className="cancel" 
                            onClick={() => navigate('/mypage')}
                            disabled={loading}
                        >
                            취소
                        </button>
                    </div>
                </div>                
            </main>

        </>
    )
}