import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Signup from './Signup'
import Appbar from './Appbar'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from './Login'
import AddCourse from './Addcourse'
import Courses from './Courses'
import Course from './Course'
function App() {

  return (
    <>
    <div style={{
      backgroundColor: "#eeeeee",
      width: "100vw",
      minHeight: '100vh',
      display:'flex',
      flexDirection:'column'
    }}>
      <Router>
      <Appbar></Appbar>
        <Routes>
          <Route path="/login" element= {<Login></Login>} />
          <Route path="/signup" element= {<Signup></Signup>} />
          <Route path="/addcourse" element= {<AddCourse></AddCourse>} />
          <Route path="/courses" element= {<Courses></Courses>} />
          <Route path="/courses/:courseId" element= {<Course></Course>} />
        </Routes>
      </Router>

    </div>
    </>
  )
}

export default App
