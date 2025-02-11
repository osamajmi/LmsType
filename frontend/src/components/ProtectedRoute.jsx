

import React from 'react';
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({allowedRoles}) => {

    const token = localStorage.getItem('token')
    const allowedrole = localStorage.getItem('role') || ''
  
    if(!token){
        return <Navigate to="/login" replace={true} />
    }
    if(!allowedrole.includes(allowedRoles)){
        return <Navigate to="/" replace={true} />
    }



   return <Outlet />
}

export default ProtectedRoute;
