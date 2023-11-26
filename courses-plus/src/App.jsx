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
import { useRecoilState } from "recoil";
import { userState } from "./store/atoms/user";

function App() {
  const [userLoginState, setUserEmail] = useRecoilState(userState);
  useEffect(() => {
    init();
  }, [])

  async function init() {
    try {
      const response = await axios.get('http://localhost:3000/admin/me/', {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json"
        }
      })
      if (response && response.status === 200) {
        setUserEmail({
          email: response.data.username,
          isLoading: false
        });
      }
      else {
        console.log("couldn't fetch account details", response);
      }
    }
    catch (e) {
      setUserEmail({
        email: null,
        isLoading: false
      });
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
          <Appbar />
          <Routes>
            <Route path="/" element={<LandingPage></LandingPage>} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/addcourse" element={<AddCourse></AddCourse>} />
            <Route path="/courses" element={<Courses></Courses>} />
            <Route path="/courses/:courseId" element={<Course></Course>} />
          </Routes>
        </Router>
      </div>
    </>
  )
}


export default App
