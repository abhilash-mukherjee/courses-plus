import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Signup from './Signup'
import Appbar from './Appbar'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from './Login'
function App() {

  return (
    <>
    <div style={{
      backgroundColor: "#eeeeee",
      width: "100vw",
      height: "100vh"
    }}>
      <Router>
      <Appbar></Appbar>
        <Routes>
          <Route path="/login" element= {<Login></Login>} />
          <Route path="/" element= {<Login></Login>} />
          <Route path="/signup" element= {<Signup></Signup>} />
        </Routes>
      </Router>

    </div>
    </>
  )
}

export default App
