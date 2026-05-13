import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../components/layout/Header"
import BackButton from "../components/common/BackButton"
import "../styles/account-detail.css"

import { updateAccount } from "../api/authApi"
import { useToast } from '../hooks/useToast'

export default function AccountDetail() {
    const [nickname, setNickname] = useState("");

    const navigate = useNavigate();
    const { showToast } = useToast();

    async function handleSubmit() {
        if (!nickname.trim()) {
            showToast("닉네임을 입력해주세요", "error");
            return
        }

        try {
            await updateAccount(nickname)

            showToast("닉네임이 변경되었습니다", "success");

            navigate('/mypage')
        } catch (err) {
            console.error(err);
            showToast("닉네임 변경 처리에 오류가 발생했습니다", "fail");
        }
    }

    return (
        <>
            <Header 
                left={
                    <div className="left-group">
                        <BackButton />
                        <span>닉네임 변경</span>
                    </div>
                }
            />
            <main className="main-content">
                <div className="change-wrapper">                    
                    <div className="change-content">
                        <span>변경 후 닉네임</span>
                        <input 
                            className="change-input"
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)} 
                        />
                    </div>

                    <div className="change-btn">
                        <button className="change" onClick={handleSubmit}>저장</button>
                    </div>
                </div>                
            </main>

        </>
    )
}