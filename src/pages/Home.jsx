import React, { useEffect, useState } from 'react'
// import Card from '../components/Card'
// import { Button } from '@nextui-org/react'
import { AiOutlineLogout } from 'react-icons/ai'
import { firebaseAuth, useFirebaseContext } from '../context/FirebaseApp'
import {getAuth, signOut} from 'firebase/auth'
// import Navbar from '../components/Navbar'
import MyNavbar from '../components/Navbar'
import Monitor from '../components/Monitor'
import MyTabs from '../components/Tabs'
import { getDatabase, onValue, ref } from 'firebase/database'
import { useLocation, useNavigate } from 'react-router-dom'
import LogoutModal from '../components/LogoutModal'
import LineChart from '../components/LineChart'
// import Gauges from '../components/Gauges'
import { HumidityBarChartsData } from '../data/DUMMY_DATA'
import NextDropDown from '../components/LineDropDown'
import MyFullScreenModal from '../components/FullScreenModal'
import { ConvertEpochTimeStamp } from '../utils/helper'
import LoadingScreen from '../components/LoadingScreen'
import NetworkErrorScreen from '../components/NetworkErrorScreen'
import DownloadModal from '../components/DownloadModal';

export default function Home() {
  
  const navigate = useNavigate();
  const FirebaseContext = useFirebaseContext();
  


  // for Data Fetching
  React.useEffect(()=>{
    
    let user = JSON.parse(localStorage.getItem("User_ID"));
    
    if (user) {

      const DB = getDatabase();
      const REALTIME_DB_PATH =  'data/';
      // const LOGS_DB_PATH =  'dataLogs/';
      
      const Database_Credentials = ref(DB,REALTIME_DB_PATH);
      
      onValue(Database_Credentials,(snapshot)=>{
  
        try{    
            
            const data = snapshot.val();

            console.log("data",data); 
            
            const newArr = Object.values(data);

       console.log("Length",newArr.length)
       const {humidity,temperature,timestamp} = {...newArr[newArr.length-1]}; 

      //  console.log("TIMESTAMP:::::",timestamp);
      //  console.log("After Conversion > ",ConvertEpochTimeStamp(timestamp).split(":").slice(0,2).join(":"));

       // Send humidity & temperature (packet)
      FirebaseContext.setDataPacket({humidity,temperature});
      // console.log("Hello Data",newArr);
     
      // Send latest 30 records     
      FirebaseContext.setDataRecords(newArr.slice(-30));
      // FirebaseContext.setDataRecords(newArr.splice(120,150));
      FirebaseContext.setIsDataLoaded(true);

    }catch(err){

      FirebaseContext.setIsDataLoaded(false);
      console.log("Error when reading data from Firebase",err);

      
 
    }
    
  })

  
} else{
      
          navigate("/");
         
        }
    
  },[]);


// React.useEffect(()=>{

// if('humidity' in FirebaseContext.dataPacket){


//   console.log("in he!!",true)
//   FirebaseContext.setIsDataLodead(false)
  
// }else{
//   console.log("out he!!",true)
//   FirebaseContext.setIsDataLodead(true)

// }


// console.log(FirebaseContext.dataPacket);


// },[FirebaseContext.dataPacket]);



  return (
<>

  {(FirebaseContext.isDataLoaded) ? (


<div style={{position:"relative h-full" ,zIndex:"-10"}}>


  <MyFullScreenModal/>
  
  <DownloadModal/>
  <LogoutModal />


  
  <img src="/images/bg12.jpg" alt="background image"  style={{position:"absolute",height:"105%",width:"100%",objectFit:"cover", top:0,zIndex:0}}/> 
   
  <MyNavbar/> 
  
  <section className='w-[100%] flex justify-center items-center flex-col absolute z-50' style={{height:"calc(100vh - 60px)"}}>
  
  <Monitor/> 
  
  </section>
  

  </div> ) : (<LoadingScreen/>)} 
    






</>
)}
