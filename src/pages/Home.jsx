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
import { ConvertEpochTimeStamp, formatedDate, timeFormatedArray } from '../utils/helper'
import LoadingScreen from '../components/LoadingScreen'
import NetworkErrorScreen from '../components/NetworkErrorScreen'
import DownloadModal from '../components/DownloadModal';
import { Bounce, toast } from 'react-toastify'
import ThemeModal from '../components/ThemeModal'
// import MyChip from '../components/Chip'


export default function Home() {
  
  const navigate = useNavigate();
  const FirebaseContext = useFirebaseContext();
  
const FetchRealtimeData = ()=>{

  let user = JSON.parse(localStorage.getItem("User_ID"));
    
  if (user) {

    const DB = getDatabase();
    const REALTIME_DB_PATH =  'data/';

    const Database_Credentials = ref(DB,REALTIME_DB_PATH);
    
    onValue(Database_Credentials,(snapshot)=>{

      try{    
          
          const data = snapshot.val();

          console.log("realtime data",data); 
          
          const newPacket = Object.values(data);

     const {humidity,temperature} = {...newPacket[newPacket?.length -3]}; 

     const TimeStamp = newPacket[newPacket?.length -1]?.timestamp

    //  console.log("YYY",TimeStamp)
     FirebaseContext.setLastTimestamp(TimeStamp);

    FirebaseContext.setDataPacket({humidity,temperature});

    FirebaseContext.setIsDataLoaded(true);

  }catch(err){

    FirebaseContext.setIsDataLoaded(false);
    console.log("Error when reading realtime data from Firebase",err);

    

  }
  
},(error)=>{

  //Show Error While Fetching Realtime Data From Firebase

  toast.error(`${error.message}!`,{
    position: "top-center",
   autoClose: 3500,
   hideProgressBar: false,
   closeOnClick: true,
   pauseOnHover: true,
   draggable: true,
   progress: undefined,
   theme: "light",
   transition: Bounce,
   });
   
   window.location.reload();
  
})


} else{
    
        navigate("/");
       
      }
  
}

const FetchDataLogs = ()=>{

  let user = JSON.parse(localStorage.getItem("User_ID"));
    
  if (user) {

    const DB = getDatabase();
    const LOGS_DB_PATH =  'dataLogs/';
    
    const Database_Credentials = ref(DB,LOGS_DB_PATH);
    
    onValue(Database_Credentials,(snapshot)=>{

      try{    
          
          const data = snapshot.val();

          console.log("dataLogs",data); 
          
          const newArr = Object.values(data);
        
          // FirebaseContext.setTimesArr();
          
          if(newArr.length <= 48){
            
            FirebaseContext.setDataRecords(newArr);
          }else{
            
            FirebaseContext.setDataRecords(newArr.slice(-48));
          }
          
          // FirebaseContext.setDataRecords(newArr.slice(-48));
            // console.log("length of logs data",newArr.slice(-48).length)

          FirebaseContext.setDateLimits({
            minimumDate:formatedDate(newArr[0].timestamp),
            maximumDate:formatedDate(newArr[newArr.length-1].timestamp),
          });

  }catch(err){

    console.log("Error when reading data logs from Firebase",err);

    
  }
  
},(error)=>{

  //Show Error While Fetching Data Logs From Firebase
  toast.error(`${error.message}!`,{
    position: "top-center",
   autoClose: 3500,
   hideProgressBar: false,
   closeOnClick: true,
   pauseOnHover: true,
   draggable: true,
   progress: undefined,
   theme: "light",
   transition: Bounce,
   });
   
   window.location.reload();
  
})


} else{
    
        navigate("/");
       
      }
  
  

}

  // for Data Fetching
  React.useEffect(()=>{
    
    FetchRealtimeData();
    FetchDataLogs();

   
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

// backgroundColor:"#CED3FD"
<div style={{position:"relative h-[80%]" ,zIndex:"-10", }}  className='bg-primary'>

  <MyFullScreenModal/>
  <DownloadModal/>
  <ThemeModal/>
  <LogoutModal />
  
  {/* calc(100vh - 90px) */}
  {/* bg12.jpg */}
  {/* <img src="/images/bg12.jpg" alt="background image"  style={{position:"absolute",height:"100vh",width:"100%",objectFit:"cover", top:0,zIndex:0}}/>  */}
   

  <MyNavbar/> 

  <section className='w-[100%] bg-primary flex justify-center items-center flex-col absolute  z-50' style={{height:"calc(100vh - 90px)",}}>
  
  
   <Monitor/> 
  
   </section>
  

  </div> 

) : (<LoadingScreen/>)} 
    

</>
)}
