import React, { useCallback, useEffect } from 'react';
import "../css/bothAdmin.css"
import { Await, Link, NavLink } from 'react-router-dom';
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
      
    <div class="sidebar">
        <h3 class="text-center text-white">Admin Dashboard</h3>
        <ul class="nav flex-column">
            <li class="nav-item">
                <NavLink href="#" onClick={()=>setComp("home")}><i class="fas fa-tachometer-alt active"></i> Dashboard</NavLink>
            </li>
            <li class="nav-item">
                <NavLink href="#" onClick={()=>setComp("Videos")}><i class="fas fa-video"></i> Videos</NavLink>
            </li>
            <li class="nav-item">
                <NavLink href="#" onClick={()=>setComp("Categories")}><i class="fas fa-plus-circle"></i> Add Categories</NavLink>
            </li>
           
            <li class="nav-item">
                <NavLink href="#" onClick={handleLogout}><i class="fas fa-sign-out-alt"></i> Logout</NavLink>
            </li>
        </ul>
    </div>

    
    <div class="topbar">
        <div class="profile">
            <img src="https://www.w3schools.com/w3images/avatar2.png" alt="Profile" data-bs-toggle="dropdown" />
          
            <span>Admin</span>
            <span class="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="fas fa-chevron-down"></i>
            </span>
            <div class="dropdown-menu">
                <Link>Settings</Link>
                <Link onClick={handleLogout}>Logout</Link>
            </div>
        </div>
    </div>

   <div class="main-content">
     {
        renderComponent()
     }
   </div>
    

  
    <div class="footer">
        <p>&copy; 2025 Admin Dashboard. All Rights Reserved.   developed by md osama Khan</p>
    </div>

      
      </>
       
    );
}


