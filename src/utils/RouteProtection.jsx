import React from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

export default function RouteProtection({children}) {

  const TOKEN  = localStorage.getItem("User_ID");
  
  const URL = useLocation().pathname;
  const isAdmin = JSON.parse(TOKEN)?.email?.split("admin");

  try{

    if(!TOKEN){

      return <Navigate to={'/'} replace />
      
    }else{
      
      if((URL == "/add-user") && (isAdmin.length == 1)){

        return <Navigate to={'/app'} replace />

      }else{
     return children;
   
      }


    }


  }catch(error){
    console.log("Error",error);

  }

}
