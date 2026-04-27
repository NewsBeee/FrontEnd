import './styles/word-modal.css'

export default function WordModal({ isOpen, onClose, wordData, onSave }) {
    if (!isOpen || !wordData) return null;

    return (
        <div className="word-modal">
            <div className="word-content" onClick={(e) => e.stopPropagation()}>
                <div className="word-header">
                    <div className='word-header-text'>선택한 단어를 저장할까요?</div>
                    <div className='header-sub'>저장한 단어는 마이페이지 - 단어장에서<br/>확인할 수 있습니다</div>    
                </div>

                <div className='word-container'>
                    <div className='word-item'>{wordData.word}</div>
                    <div className='word-meaning'>{wordData.meaning}</div>
                </div>

                <div className='word-btn-container'>
                    <button className="save-button" onClick={onSave}>저장하기</button>
                    <button className="cancel-button" onClick={onClose}>취소</button>
                </div>
            </div>
        </div>
    )
}