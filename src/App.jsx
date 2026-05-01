// import { Helmet } from 'react-helmet'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Intro from './pages/Intro'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Nickname from './pages/Nickname'
import Onboarding from './pages/Onboarding'
import ChalQuiz from './pages/ChalQuiz'
import Quiz from './pages/Quiz'
import Splash from './pages/Splash'
import QuizResult from './pages/QuizResult'
import Result from './pages/Result'
import Challenge from './pages/Challenge'
import ChalSetting from './pages/ChalSetting'
import MyPage from './pages/MyPage'
import ProtectedRoute from './components/common/ProtectedRoute'
// import './App.css'

function App() {
  return (
    <>
      {/* <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet> */}
      <div className="app-wrapper">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/intro" element={<Intro />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signup/nickname" element={<Nickname />} />
            <Route path="/signup/onboarding" element={<Onboarding />} />
            <Route path="/promotion" element={<ChalQuiz />}/>
            <Route path="/quiz/:type" element={<Quiz />} />
            <Route path="/splash/:type" element={<Splash />} />
            <Route path="/promotion/result" element={<QuizResult />} />
            <Route path="/result" element={<Result />} />
            <Route path="/challenge" 
              element={
                <ProtectedRoute>
                      <Challenge />
                </ProtectedRoute>
              } 
            />
            <Route path="/challenge/setting" element={<ChalSetting />} />
            <Route path="/mypage" element={<MyPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
