import Header from '../layout/Header'
import logo from '../../assets/logo3.png'
import LoadImg from '../../assets/image.png'
import './styles/loading.css'

export default function Loading({message}) {
    return (
        <>
            <Header left={<img src={logo} style={{ width: '121px' }} />} />
            <div className="loading-wrapper">
                <div className='loading-message'>{message || '로딩 중...'}</div>

                <div className='loading-img'>
                    <img src={LoadImg} width={220}/>
                </div>
            
                <div className="loading-container">
                    <div className='dot'></div>
                    <div className='dot'></div>
                    <div className='dot'></div>
                </div>
            </div>
        </>
    )
}