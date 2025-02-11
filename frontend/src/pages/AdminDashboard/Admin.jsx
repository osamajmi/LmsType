import React, { useCallback, useEffect } from 'react';
import "../css/bothAdmin.css"
import {  Link, NavLink } from 'react-router-dom';
import axios from 'axios';
import Home from './pages/Home';
import Video from './pages/Video';
import Categories from './pages/Categories';

export const Admin = () => {
   
  

    

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        // console.log("Token after logout:", localStorage.getItem("token")); 
        // console.log("Role after logout:", localStorage.getItem("role")); 
        window.location.reload(); 
        
    };
 const [Component , setComp] = React.useState("home");
 
 
 const renderComponent = () => {
    switch (Component) {
        case 'home':
            return <Home />;
        case 'Videos':
            return <Video />;
        case 'Categories':
            return <Categories />;
       
        default:
            return <Home />;
    }
}; 
   
    
    return (

      <>
      
    <div className="sidebar">
        <h3 className="text-center text-white">Admin Dashboard</h3>
        <ul className="nav flex-column">
            <li className="nav-item">
                <NavLink href="#" onClick={()=>setComp("home")}><i className="fas fa-tachometer-alt active"></i> Dashboard</NavLink>
            </li>
            <li className="nav-item">
                <NavLink href="#" onClick={()=>setComp("Videos")}><i className="fas fa-video"></i> Videos</NavLink>
            </li>
            <li className="nav-item">
                <NavLink href="#" onClick={()=>setComp("Categories")}><i className="fas fa-plus-circle"></i> Add Categories</NavLink>
            </li>
           
            <li className="nav-item">
                <NavLink href="#" onClick={handleLogout}><i className="fas fa-sign-out-alt"></i> Logout</NavLink>
            </li>
        </ul>
    </div>

    <div className="bottom-nav">
    <NavLink to="#" onClick={() => setComp("home")} className={Component === "home" ? "active" : ""}>
        <i className="bi bi-house-door"></i>
        <span>Dashboard</span>
    </NavLink>
    <NavLink to="#" onClick={() => setComp("Videos")} className={Component === "Videos" ? "active" : ""}>
        <i className="bi bi-camera-video"></i>
        <span>Videos</span>
    </NavLink>
    <NavLink to="#" onClick={() => setComp("Categories")} className={Component === "Categories" ? "active" : ""}>
        <i className="bi bi-folder-plus"></i>
        <span>Categories</span>
    </NavLink>
    <NavLink to="#" onClick={handleLogout} className={Component === "Logout" ? "active" : ""}>
        <i className="bi bi-box-arrow-right"></i>
        <span>Logout</span>
    </NavLink>
</div>



    <div className="topbar justify-content-between ">
        <h2 className='ms-5 headM'>Welcome To Admin Dashboard</h2>
        <div className="profile">
            <img src="https://www.w3schools.com/w3images/avatar2.png" alt="Profile" data-bs-toggle="dropdown" />
          
            <span>Admin</span>
            <span className="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                <i className="fas fa-chevron-down"></i>
            </span>
            <div className="dropdown-menu">
                <Link>Settings</Link>
                <Link onClick={handleLogout}>Logout</Link>
            </div>
        </div>
    </div>

   <div className="main-content">
     {
        renderComponent()
     }
   </div>
    

  
    <div className="footer">
        <p>&copy; 2025 Admin Dashboard. All Rights Reserved.   developed by md osama Khan</p>
    </div>

      
      </>
       
    );
}


