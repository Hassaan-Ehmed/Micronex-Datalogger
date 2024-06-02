
import React from 'react';
import './App.css';
// import Card from './components/Card';
import { Route, Routes } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Home from './pages/Home';
// import { useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';
import NetworkErrorScreen from './components/NetworkErrorScreen';
import SignupForm from './components/SignupForm.';
import ErrorPage from './pages/Error404';
import AuthProtection from './utils/AuthProtection';
import RouteProtection from './utils/RouteProtection';


function App() {

  const DB =  getDatabase();
  const DB_REF_REALTIME = ref(DB,'data/');  
  const DB_REF_DATA_LOGS = ref(DB,'dataLogs/');  

  const [isOnline,setIsOnline] = React.useState(window.navigator.onLine);

  // for Detecting Network Status
React.useEffect(()=>{

  const updateOnlineStatus=()=>{

    setIsOnline(window.navigator.onLine)
  }
  
  // IIFE (iffy)

  (()=>{

    // for realtime data monitoring (every second)
    // set(DB_REF_REALTIME,realtime_data);


    // for data logs that create every 30 min interval  (every 30 min)
    // set(DB_REF_DATA_LOGS,data_logs)


  })()
  

  window.addEventListener('online',updateOnlineStatus);
  window.addEventListener('offline',updateOnlineStatus);
  
  
  // clean up function to remove unnessary callback from memory
  return ()=>{
    
    window.removeEventListener('online',updateOnlineStatus);
    window.removeEventListener('offline',updateOnlineStatus);
  }
},[]);




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



console.log("isOnline",isOnline)

return (

<Routes>

<Route path='/' element={ <AuthProtection> <LoginForm/> </AuthProtection> }/>    

<Route path='/app' element={ <RouteProtection> {isOnline ?  <Home/>  : <NetworkErrorScreen/>} </RouteProtection> }/>

<Route path='/add-user' element={<RouteProtection Protection>  <SignupForm/>  </RouteProtection>}/>

<Route path='*' element={<ErrorPage/>}/>

</Routes>
  

  );
}
export default App;
