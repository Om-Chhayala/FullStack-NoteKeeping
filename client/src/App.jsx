import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {HomePage} from './pages/HomePage';
import {Note} from './pages/Note';
import {TopBar} from './components/TopBar'
import SignUp from './pages/SignUp';
import { Login } from './pages/Login';
// import CreateNote from './components/CreateNote';


function App() {
  const [count, setCount] = useState(0)

  return (
    <div style={{width: "100vw",
    height: "100vh",
    backgroundColor: "#eeeeee"}}
>
        <Router>
            {/* <TopBar /> */}
            <Routes>
                <Route path={"/"} element={<HomePage />} />
                <Route path={"/note/:id"} element={<Note />} />
                <Route path={"/signup"} element={<SignUp />} />
                <Route path={"/login"} element={<Login />} />
                {/* <Route path={"/note/:id"} element={<Note />} /> */}

                {/* <Route path={"/createnote"} element={<CreateNote />} /> */}

                
            </Routes>
        </Router>
</div>
  )
}

export default App
