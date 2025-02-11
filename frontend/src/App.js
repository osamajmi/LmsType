import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/navbar';
import { Admin } from './pages/AdminDashboard/Admin';
import UserDash from './pages/UserdashBoard/UserDash';
import ProtectedRoute from './components/ProtectedRoute';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
  return (
    <div className="App">
        {/* <Navbar /> */}
        <ToastContainer position="top-right" autoClose={3000} />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path='/Login' element={<Login />} />
          <Route path='/Register' element={<Register />} />
          {/* <Route path='/AdminDashBoard' element ={<Admin/>} />
          <Route path='/StudentDashboard' element ={<UserDash/>} /> */}

           {/* Protected Routes */}
           <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
                    <Route path="/AdminDashBoard" element={<Admin />} />
                </Route>

                <Route element={<ProtectedRoute allowedRoles={["student"]} />}>
                    <Route path="/StudentDashboard" element={<UserDash />} />
                </Route>

        </Routes>
      </Router>


    </div>
  );
}

export default App;
