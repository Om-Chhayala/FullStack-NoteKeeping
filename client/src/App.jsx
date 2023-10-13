import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {HomePage} from './pages/HomePage';
import {Note} from './pages/Note';
import {TopBar} from './components/TopBar'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div style={{width: "100vw",
    height: "100vh",
    backgroundColor: "#eeeeee"}}
>
        <Router>
            <TopBar />
            <Routes>
                <Route path={"/"} element={<HomePage />} />
                <Route path={"/note/:id"} element={<Note />} />

                
            </Routes>
        </Router>
</div>
  )
}

export default App
