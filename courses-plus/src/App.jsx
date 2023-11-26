import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddCourse from './components/Addcourse'
import Appbar from './components/Appbar'
import Courses from './components/Courses'
import Course from './components/Course'
import LandingPage from './components/LandingPage'
import Login from './components/Login'
import Signup from './components/Signup'
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [userEmail, setUserEmail] = useState(null);
  useEffect(() => {
    init();
  }, [])

  async function init() {
    const response = await axios.get('http://localhost:3000/admin/me/', {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json"
      }
    })
    if (response && response.status === 200) {
      setUserEmail(response.data.username);
    }
    else {
      console.log("couldn't fetch account details", response);
    }

  }
  return (
    <>
      <div style={{
        backgroundColor: "#eeeeee",
        width: "100vw",
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Router>
          <Appbar userEmail={userEmail} setUserEmail={setUserEmail}></Appbar>
          <Routes>
            <Route path="/" element={<LandingPage userEmail={userEmail}></LandingPage>} />
            <Route path="/login" element={<Login setUserEmail = {setUserEmail}></Login>} />
            <Route path="/signup" element={<Signup setUserEmail={setUserEmail}></Signup>} />
            <Route path="/addcourse" element={<AddCourse></AddCourse>} />
            <Route path="/courses" element={<Courses></Courses>} />
            <Route path="/courses/:courseId" element={<Course></Course>} />
          </Routes>
        </Router>
      </div>
    </>
  )
}

function init(){
  
}

export default App
