import React from 'react'
import { Navigate, useLocation, useParams } from 'react-router-dom';

export default function AuthProtection({children}) {

const TOKEN = localStorage.getItem("User_ID");

if(TOKEN) {
    return <Navigate to={'/app'} replace/>

}

return children

}

// Black -> ground
// Red serial ->  clock 
// White ->  data
// Yellow -> VCC