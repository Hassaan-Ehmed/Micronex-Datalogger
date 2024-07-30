import React from 'react'
// import Card from '../components/Card'
// import { Button } from '@nextui-org/react'
import { firestore, useFirebaseContext } from '../context/FirebaseApp'
// import Navbar from '../components/Navbar'
import { getDatabase, onValue, ref } from 'firebase/database'
import {collection, CollectionReference, doc,endAt,getDoc,getDocs,onSnapshot, orderBy, query, startAt} from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import LogoutModal from '../components/LogoutModal'
import Monitor from '../components/Monitor'
import MyNavbar from '../components/Navbar'
// import Gauges from '../components/Gauges'
import { Bounce, toast } from 'react-toastify'
import DownloadModal from '../components/DownloadModal'
import MyFullScreenModal from '../components/FullScreenModal'
import LoadingScreen from '../components/LoadingScreen'
import ThemeModal from '../components/ThemeModal'
import { formatedDate } from '../utils/helper'
// import MyChip from '../components/Chip'  

export default function Home() {
  
  const navigate = useNavigate();
  const FirebaseContext = useFirebaseContext();
  
const FetchRealtimeData = ()=>{

  FirebaseContext.settingUserTheme();

  let user = JSON.parse(localStorage.getItem("User_ID"));
  let DB_URL_PATH = JSON.parse(localStorage.getItem("Url_Path"));
  DB_URL_PATH = DB_URL_PATH+"/realtime"
  const  COPMANY_NAME  =  DB_URL_PATH.split("/")[0]
  const  DEVICE_NAME  =  DB_URL_PATH.split("/")[2]

  // const docRef = doc(firestore, COPMANY_NAME, "devices", DEVICE_NAME, "data", "realtime" );
  
  
  if (user) {
    
    
    const collectionRef = collection(firestore, COPMANY_NAME, "devices", DEVICE_NAME, "data", "realtime");

    onSnapshot(collectionRef, (snapshot) => {
    
      try{

        const document = snapshot.docs[0].data();

      let Realtime_Storage = JSON.parse(localStorage.getItem("Realtime_Storage"));
     
      
      console.log("Realtime_Storage",Realtime_Storage);

      if(Realtime_Storage.length === 0){
       
        Realtime_Storage.push(document);
        localStorage.setItem("Realtime_Storage",JSON.stringify(Realtime_Storage));

        FirebaseContext.setDataRecords(Realtime_Storage);

        console.log("RS_LS::::0",Realtime_Storage)
      }
      else if(Realtime_Storage.length <= 48 ){

        let lastUpdatedPacket = Realtime_Storage.slice(-1)[0]

        if(lastUpdatedPacket.timestamp !== document.timestamp){
        
           Realtime_Storage.push(document);
           localStorage.setItem("Realtime_Storage",JSON.stringify(Realtime_Storage));
         
             FirebaseContext.setDataRecords(Realtime_Storage);
             
            }else{

              FirebaseContext.setDataRecords(Realtime_Storage);
              
            } 
        
      }else{
        
        Realtime_Storage.push(document);
        Realtime_Storage =  Realtime_Storage.slice(-48);
        
        localStorage.setItem("Realtime_Storage",JSON.stringify(Realtime_Storage));
          FirebaseContext.setDataRecords(Realtime_Storage);
      }

    //  const {humidity,temperature} = {...documents[documents?.length -1]}; 
     const {humidity,temperature} = {document}; 

    //  const TimeStamp = documents[documents?.length -1]?.timestamp
     const TimeStamp = document.timestamp

     FirebaseContext.setLastTimestamp(TimeStamp);

    FirebaseContext.setDataPacket({humidity,temperature});

    FirebaseContext.setIsDataLoaded(true);


      }catch(err){

        FirebaseContext.setIsDataLoaded(false);
        console.log("Error when reading realtime data from Firebase",err);

      }
    
      // Update your UI or application logic based on the latest data
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
  ;
  

    

} else{
    
        navigate("/");
       
      }
  
}




const FetchDataLogs = ()=>{

  let user = JSON.parse(localStorage.getItem("User_ID"));
  let DB_URL_PATH = JSON.parse(localStorage.getItem("Url_Path"));

  const COMPANY_NAME = DB_URL_PATH.split("/")[0];
  const DEVICE_NAME = DB_URL_PATH.split("/")[2];

    
  if (user) {

  
    const collectionRef = collection(firestore, COMPANY_NAME, "devices", DEVICE_NAME, "data", "logs");

    onSnapshot(collectionRef,(snapshot)=>{

      try{


        const documents = snapshot.docs.map((doc)=>({
          ...doc.data() // Spread operator to get all document data fields
        }));


        console.log("DATALOGS::::",documents.length);

  
           FirebaseContext.setDateLimits({
            minimumDate:formatedDate(documents[0].timestamp),
            maximumDate:formatedDate(documents[documents.length-1].timestamp),
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
