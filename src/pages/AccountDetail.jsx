import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../components/layout/Header"
import BackButton from "../components/common/BackButton"
import "../styles/account-detail.css"

import { updateAccount } from "../api/authApi"

export default function AccountDetail() {
    const [nickname, setNickname] = useState("");
    const navigate = useNavigate()

    async function handleSubmit() {
        if (!nickname.trim()) {
            alert('닉네임을 입력해주세요')
            return
        }

        try {
            await updateAccount(ninckname)

            alert('닉네임이 변경되었습니다')

            navigate('/mypage')
        } catch (err) {
            console.error(err)
            alert('닉네임 변경 실패')
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