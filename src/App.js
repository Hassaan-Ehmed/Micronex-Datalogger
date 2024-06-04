
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


  // const data_logs = {
  //   "070124_0000": {
  //       "humidity": 76.81,
  //       "temperature": 41.56,
  //       "timestamp": "070124_0000",
  //       "datepoint": "2024-01-07"
  //   },
  //   "070124_0400": {
  //       "humidity": 75.62,
  //       "temperature": 41.21,
  //       "timestamp": "070124_0400",
  //       "datepoint": "2024-01-07"
  //   },
  //   "070124_0800": {
  //       "humidity": 74.15,
  //       "temperature": 40.89,
  //       "timestamp": "070124_0800",
  //       "datepoint": "2024-01-07"
  //   },
  //   "070124_1200": {
  //       "humidity": 72.93,
  //       "temperature": 40.62,
  //       "timestamp": "070124_1200",
  //       "datepoint": "2024-01-07"
  //   },
  //   "070124_1600": {
  //       "humidity": 71.85,
  //       "temperature": 40.38,
  //       "timestamp": "070124_1600",
  //       "datepoint": "2024-01-07"
  //   },
  //   "070124_2000": {
  //       "humidity": 70.87,
  //       "temperature": 40.17,
  //       "timestamp": "070124_2000",
  //       "datepoint": "2024-01-07"
  //   },
  //   "080124_0000": {
  //       "humidity": 69.98,
  //       "temperature": 39.99,
  //       "timestamp": "080124_0000",
  //       "datepoint": "2024-01-08"
  //   },
  //   "080124_0400": {
  //       "humidity": 69.15,
  //       "temperature": 39.82,
  //       "timestamp": "080124_0400",
  //       "datepoint": "2024-01-08"
  //   },
  //   "080124_0800": {
  //       "humidity": 68.36,
  //       "temperature": 39.67,
  //       "timestamp": "080124_0800",
  //       "datepoint": "2024-01-08"
  //   },
  //   "080124_1200": {
  //       "humidity": 67.60,
  //       "temperature": 39.53,
  //       "timestamp": "080124_1200",
  //       "datepoint": "2024-01-08"
  //   },
  //   "080124_1600": {
  //       "humidity": 66.87,
  //       "temperature": 39.41,
  //       "timestamp": "080124_1600",
  //       "datepoint": "2024-01-08"
  //   },
  //   "080124_2000": {
  //       "humidity": 66.16,
  //       "temperature": 39.30,
  //       "timestamp": "080124_2000",
  //       "datepoint": "2024-01-08"
  //   },
  //   "090124_0000": {
  //       "humidity": 65.47,
  //       "temperature": 39.20,
  //       "timestamp": "090124_0000",
  //       "datepoint": "2024-01-09"
  //   },
  //   "090124_0400": {
  //       "humidity": 64.81,
  //       "temperature": 39.11,
  //       "timestamp": "090124_0400",
  //       "datepoint": "2024-01-09"
  //   },
  //   "090124_0800": {
  //       "humidity": 64.16,
  //       "temperature": 39.02,
  //       "timestamp": "090124_0800",
  //       "datepoint": "2024-01-09"
  //   },
  //   "090124_1200": {
  //       "humidity": 63.52,
  //       "temperature": 38.94,
  //       "timestamp": "090124_1200",
  //       "datepoint": "2024-01-09"
  //   },
  //   "090124_1600": {
  //       "humidity": 62.89,
  //       "temperature": 38.86,
  //       "timestamp": "090124_1600",
  //       "datepoint": "2024-01-09"
  //   },
  //   "090124_2000": {
  //       "humidity": 62.27,
  //       "temperature": 38.79,
  //       "timestamp": "090124_2000",
  //       "datepoint": "2024-01-09"
  //   },
  //   "100124_0000": {
  //       "humidity": 61.65,
  //       "temperature": 38.72,
  //       "timestamp": "100124_0000",
  //       "datepoint": "2024-01-10"
  //   },
  //   "100124_0400": {
  //       "humidity": 61.03,
  //       "temperature": 38.65,
  //       "timestamp": "100124_0400",
  //       "datepoint": "2024-01-10"
  //   },
  //   "100124_0800": {
  //       "humidity": 60.41,
  //       "temperature": 38.58,
  //       "timestamp": "100124_0800",
  //       "datepoint": "2024-01-10"
  //   },
  //   "100124_1200": {
  //       "humidity": 59.79,
  //       "temperature": 38.51,
  //       "timestamp": "100124_1200",
  //       "datepoint": "2024-01-10"
  //   },
  //   "100124_1600": {
  //       "humidity": 59.18,
  //       "temperature": 38.45,
  //       "timestamp": "100124_1600",
  //       "datepoint": "2024-01-10"
  //   },
  //   "100124_2000": {
  //       "humidity": 58.57,
  //       "temperature": 38.39,
  //       "timestamp": "100124_2000",
  //       "datepoint": "2024-01-10"
  //   },
  //   "110124_0000": {
  //       "humidity": 57.96,
  //       "temperature": 38.33,
  //       "timestamp": "110124_0000",
  //       "datepoint": "2024-01-11"
  //   },
  //   "110124_0400": {
  //       "humidity": 57.36,
  //       "temperature": 38.27,
  //       "timestamp": "110124_0400",
  //       "datepoint": "2024-01-11"
  //   },
  //   "110124_0800": {
  //       "humidity": 56.75,
  //       "temperature": 38.21,
  //       "timestamp": "110124_0800",
  //       "datepoint": "2024-01-11"
  //   },
  //   "110124_1200": {
  //       "humidity": 56.14,
  //       "temperature": 38.15,
  //       "timestamp": "110124_1200",
  //       "datepoint": "2024-01-11"
  //   },

  // }

  // const data_logs = {
  //   "010624_0000": { "humidity": 76.81, "temperature": 41.56, "timestamp": "010624_0000" },
  //   "010624_0030": { "humidity": 75.39, "temperature": 38.11, "timestamp": "010624_0030" },
  //   "010624_0100": { "humidity": 77.52, "temperature": 36.60, "timestamp": "010624_0100" },
  //   "010624_0130": { "humidity": 74.15, "temperature": 37.22, "timestamp": "010624_0130" },
  //   "010624_0200": { "humidity": 78.34, "temperature": 39.05, "timestamp": "010624_0200" },
  //   "010624_0230": { "humidity": 73.29, "temperature": 40.14, "timestamp": "010624_0230" },
  //   "010624_0300": { "humidity": 77.61, "temperature": 37.88, "timestamp": "010624_0300" },
  //   "010624_0330": { "humidity": 74.89, "temperature": 38.45, "timestamp": "010624_0330" },
  //   "010624_0400": { "humidity": 75.67, "temperature": 36.79, "timestamp": "010624_0400" },
  //   "010624_0430": { "humidity": 76.22, "temperature": 37.33, "timestamp": "010624_0430" },
  //   "010624_0500": { "humidity": 77.18, "temperature": 41.10, "timestamp": "010624_0500" },
  //   "010624_0530": { "humidity": 74.58, "temperature": 39.50, "timestamp": "010624_0530" },
  //   "010624_0600": { "humidity": 78.10, "temperature": 37.85, "timestamp": "010624_0600" },
  //   "010624_0630": { "humidity": 75.49, "temperature": 36.44, "timestamp": "010624_0630" },
  //   "010624_0700": { "humidity": 77.92, "temperature": 40.22, "timestamp": "010624_0700" },
  //   "010624_0730": { "humidity": 74.31, "temperature": 39.89, "timestamp": "010624_0730" },
  //   "010624_0800": { "humidity": 76.98, "temperature": 41.35, "timestamp": "010624_0800" },
  //   "010624_0830": { "humidity": 75.12, "temperature": 37.70, "timestamp": "010624_0830" },
  //   "010624_0900": { "humidity": 77.45, "temperature": 38.90, "timestamp": "010624_0900" },
  //   "010624_0930": { "humidity": 76.01, "temperature": 40.50, "timestamp": "010624_0930" },
  //   "010624_1000": { "humidity": 75.78, "temperature": 38.12, "timestamp": "010624_1000" },
  //   "010624_1030": { "humidity": 77.29, "temperature": 36.66, "timestamp": "010624_1030" },
  //   "010624_1100": { "humidity": 76.41, "temperature": 37.99, "timestamp": "010624_1100" },
  //   "010624_1130": { "humidity": 75.58, "temperature": 39.30, "timestamp": "010624_1130" },
  //   "010624_1200": { "humidity": 77.15, "temperature": 40.45, "timestamp": "010624_1200" },
  //   "010624_1230": { "humidity": 76.34, "temperature": 38.03, "timestamp": "010624_1230" },
  //   "010624_1300": { "humidity": 75.89, "temperature": 36.50, "timestamp": "010624_1300" },
  //   "010624_1330": { "humidity": 77.72, "temperature": 39.20, "timestamp": "010624_1330" },
  //   "010624_1400": { "humidity": 76.45, "temperature": 40.10, "timestamp": "010624_1400" },
  //   "010624_1430": { "humidity": 75.76, "temperature": 37.65, "timestamp": "010624_1430" },
  //   "010624_1500": { "humidity": 77.33, "temperature": 36.90, "timestamp": "010624_1500" },
  //   "010624_1530": { "humidity": 76.82, "temperature": 41.56, "timestamp": "010624_1530" },
  //   "010624_1600": { "humidity": 75.39, "temperature": 38.11, "timestamp": "010624_1600" },
  //   "010624_1630": { "humidity": 77.52, "temperature": 36.60, "timestamp": "010624_1630" },
  //   "010624_1700": { "humidity": 74.15, "temperature": 37.22, "timestamp": "010624_1700" },
  //   "010624_1730": { "humidity": 78.34, "temperature": 39.05, "timestamp": "010624_1730" },
  //   "010624_1800": { "humidity": 73.29, "temperature": 40.14, "timestamp": "010624_1800" },
  //   "010624_1830": { "humidity": 77.61, "temperature": 37.88, "timestamp": "010624_1830" },
  //   "010624_1900": { "humidity": 74.89, "temperature": 38.45, "timestamp": "010624_1900" },
  //   "010624_1930": { "humidity": 75.67, "temperature": 36.79, "timestamp": "010624_1930" },
  //   "010624_2000": { "humidity": 76.22, "temperature": 37.33, "timestamp": "010624_2000" },
  //   "010624_2030": { "humidity": 77.18, "temperature": 41.10, "timestamp": "010624_2030" },
  //   "010624_2100": { "humidity": 74.58, "temperature": 39.50, "timestamp": "010624_2100" },
  //   "010624_2130": { "humidity": 78.10, "temperature": 37.85, "timestamp": "010624_2130" },
  //   "010624_2200": { "humidity": 75.49, "temperature": 36.44, "timestamp": "010624_2200" },
  //   "010624_2230": { "humidity": 77.92, "temperature": 40.22, "timestamp": "010624_2230" },
  //   "010624_2300": { "humidity": 74.31, "temperature": 39.89, "timestamp": "010624_2300" },
  //   "010624_2330": { "humidity": 76.98, "temperature": 41.35, "timestamp": "010624_2330" }
  // };    
  
  // const realtime_data = {

  //   // 13th second
  //   "010624_0013":{
  //     humidity:77.45,
  //     temperature:38.9
  //   }
  
  // };
  // // IIFE (iffy)

  //   // for realtime data monitoring (every second)
  //   set(DB_REF_REALTIME,realtime_data);


  //   // for data logs that create every 30 min interval  (every 30 min)
    // set(DB_REF_DATA_LOGS,data_logs)

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
