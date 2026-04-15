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
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
