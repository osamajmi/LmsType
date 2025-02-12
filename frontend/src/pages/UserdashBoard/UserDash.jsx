import React, { useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import "../css/bothAdmin.css"
import VideoPanel from './videoPanel';

const UserDash = () => {

    const [user, setUsers] = React.useState('');
    const [photo,setphoto] = React.useState('');

    useEffect(()=>{
        const  userName = localStorage.getItem("name");
        const  image = localStorage.getItem("image");

        if(userName){
            setUsers(userName)
        }
        if(image){
            setphoto(image)
        }

    },[]);
    console.log(photo)
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        // console.log("Token after logout:", localStorage.getItem("token")); 
        // console.log("Role after logout:", localStorage.getItem("role")); 
        window.location.reload(); 
        
    };


    return (
       <>
         
    <div className="sidebar">
        <h3 className="text-center text-white">Admin Dashboard</h3>
        <ul className="nav flex-column">
            <li className="nav-item">
                <Link href="#"><i className="fas fa-tachometer-alt"></i> Dashboard</Link>
            </li>
            {/* <li className="nav-item">
                <Link href="#"><i className="fas fa-video"></i> Videos</Link>
            </li> */}
           
            <li className="nav-item">
                <Link href="#" onClick={handleLogout}><i className="fas fa-sign-out-alt"></i> Logout</Link>
            </li>
        </ul>
    </div>

    
    <div className="topbar">
    <h1 className='text-center userStd'>Welcome to Dashboard {user}</h1>
        <div className="profile">
            <img src={`https://lmstype.onrender.com/uploads/${photo}`} alt="Profile" data-bs-toggle="dropdown" />
          
            <span>{user}</span>
            <span className="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                <i className="fas fa-chevron-down"></i>
            </span>
            <div className="dropdown-menu">
                <Link>Settings</Link>
                <Link onClick={handleLogout}>Logout</Link>
            </div>
        </div>
    </div>
    <div className="bottom-nav">
    <NavLink to="/">
        <i className="bi bi-house-door"></i>
        <span>Dashboard</span>
    </NavLink>
    {/* <NavLink to="#" onClick={() => setComp("Videos")} className={Component === "Videos" ? "active" : ""}>
        <i className="bi bi-camera-video"></i>
        <span>Videos</span>
    </NavLink>
    <NavLink to="#" onClick={() => setComp("Categories")} className={Component === "Categories" ? "active" : ""}>
        <i className="bi bi-folder-plus"></i>
        <span>Categories</span>
    </NavLink> */}
    <NavLink to="#" onClick={handleLogout}>
        <i className="bi bi-box-arrow-right"></i>
        <span>Logout</span>
    </NavLink>
</div>
   
    <div className="main-content">
      
      <VideoPanel />
     
       
        
    </div>

  
    <div className="footer">
        <p>&copy; 2025 Admin Dashboard. All Rights Reserved.   developed by md osama Khan</p>
    </div>
       
       </>
    );
}

export default UserDash;
