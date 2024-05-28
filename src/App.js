
import React,{useEffect, useState} from 'react'
import './App.css';
// import Card from './components/Card';
import LoginForm from './components/LoginForm';
import { BrowserRouter as Router, Routes , Route, useNavigate  } from 'react-router-dom';
import Home from './pages/Home';
// import { useEffect } from 'react';
import { firebaseApp, firebaseAuth, setupUI, useFirebaseContext } from './context/FirebaseApp';
import {getAuth, onAuthStateChanged} from 'firebase/auth' 
import { getDatabase, onValue, ref } from 'firebase/database';
import firebase from 'firebase/compat/app';
import Svg from './components/SVGS/Svg';
import { SVG_ICON } from './components/SVGS/Svg';
import MyTabs from './components/Tabs';
import SignupForm from './components/SignupForm.';
import AuthProtection from './utils/AuthProtection';
import RouteProtection from './utils/RouteProtection';
import ErrorPage from './pages/Error404';
import LoadingScreen from './components/LoadingScreen';


function App() {

document.addEventListener("DOMContentLoaded",function(){
  
    onAuthStateChanged(getAuth(),(user)=>{
   
    if(user){      

      console.log("user logged in!");
      console.log("user",user);
         
      // navigate("/app");
      
    }else{
      
      console.log("user logged out!");

      
      // localStorage.setItem("User_ID",JSON.stringify("NO_USER_EXSIST"));
      
      // navigate("/");
      
    }

  });

})


return (

<Routes>

<Route path='/' element={ <AuthProtection> <LoginForm/> </AuthProtection> }/>    

<Route path='/app' element={ <RouteProtection>  <Home/>  </RouteProtection> }/>

<Route path='/add-user' element={<RouteProtection Protection>  <SignupForm/>  </RouteProtection>}/>

<Route path='*' element={<ErrorPage/>}/>

</Routes>
  

  );
}
export default App;
