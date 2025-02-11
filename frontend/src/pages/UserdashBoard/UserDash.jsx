import React from 'react';
import { Link } from 'react-router-dom';
import "../css/bothAdmin.css"

const UserDash = () => {

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        // console.log("Token after logout:", localStorage.getItem("token")); 
        // console.log("Role after logout:", localStorage.getItem("role")); 
        window.location.reload(); 
        
    };
    return (
       <>
         
    <div class="sidebar">
        <h3 class="text-center text-white">Admin Dashboard</h3>
        <ul class="nav flex-column">
            <li class="nav-item">
                <Link href="#"><i class="fas fa-tachometer-alt"></i> Dashboard</Link>
            </li>
            <li class="nav-item">
                <Link href="#"><i class="fas fa-video"></i> Videos</Link>
            </li>
            <li class="nav-item">
                <Link href="#"><i class="fas fa-plus-circle"></i> Add Categories</Link>
            </li>
            <li class="nav-item">
                <Link href="#"><i class="fas fa-cogs"></i> Settings</Link>
            </li>
            <li class="nav-item">
                <Link href="#" onClick={handleLogout}><i class="fas fa-sign-out-alt"></i> Logout</Link>
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
        <h1>Welcome to Dashboard</h1>

       
        <div class="row">
            <div class="col-md-3">
                <div class="stat-card">
                    <div class="stat-text">Total Students</div>
                    <div class="stat-digit">500</div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="stat-card">
                    <div class="stat-text">Total Teachers</div>
                    <div class="stat-digit">50</div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="stat-card">
                    <div class="stat-text">Active Courses</div>
                    <div class="stat-digit">20</div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="stat-card">
                    <div class="stat-text">New Enrollments</div>
                    <div class="stat-digit">30</div>
                </div>
            </div>
        </div>

       
        <div class="card">
            <div class="card-header">
                Recent Activity
            </div>
            <div class="card-body">
                <table>
                    <thead>
                        <tr>
                            <th>Sr. No</th>
                            <th>Name</th>
                            <th>Photo</th>
                            <th>User ID</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>John Doe</td>
                            <td><img src="https://www.w3schools.com/w3images/avatar2.png" alt="User"/></td>
                            <td>xyz_1</td>
                            <td><button class="btn btn-danger btn-sm">Delete</button></td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Alice Smith</td>
                            <td><img src="https://www.w3schools.com/w3images/avatar2.png" alt="User"/></td>
                            <td>xyz_2</td>
                            <td><button class="btn btn-danger btn-sm">Delete</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

  
    <div class="footer">
        <p>&copy; 2025 Admin Dashboard. All Rights Reserved.   developed by md osama Khan</p>
    </div>
       
       </>
    );
}

export default UserDash;
