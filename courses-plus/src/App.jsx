import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import AddCourse from './components/Addcourse'
import Appbar from './components/Appbar'
import Courses from './components/Courses'
import Course from './components/Course'
import LandingPage from './components/LandingPage'
import Login from './components/Login'
import Signup from './components/Signup'
import { useState } from "react";
function App() {
  const [userEmail, setUserEmail] = useState(null);
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
      <Appbar userEmail = {userEmail} setUserEmail = {setUserEmail}></Appbar>
        <Routes>
          <Route path="/" element= {<LandingPage userEmail = {userEmail}></LandingPage>} />
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
