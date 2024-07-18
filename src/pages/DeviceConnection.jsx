import React, { useEffect, useState } from "react";
import {Tabs, Tab, Input, Button, Card, CardBody, } from "@nextui-org/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ref,onValue, getDatabase } from "firebase/database";
import { firebaseApp, firebaseAuth, useFirebaseContext , firestore} from "../context/FirebaseApp";
import { doc, getDoc } from "firebase/firestore";
import {getAuth, signInWithEmailAndPassword,createUserWithEmailAndPassword , signOut} from 'firebase/auth'
import { IoMdArrowRoundBack } from "react-icons/io";
import Text from 'react-font'
import { Bounce, toast ,Flip, Slide} from "react-toastify";
import '../App.css'
import { CgMaximize, CgMinimizeAlt } from "react-icons/cg";

export default function DeviceConnection() {
  
const navigate = useNavigate();


const FirebaseContext = useFirebaseContext();

const [selected, setSelected] = React.useState("login");

const [state,setState] = React.useReducer((state,newState)=>({...state,...newState}),{

  companyName:"",
  deviceName:"",
  isCompanyValid:false,
  isDeviceValid:false,
  isCompanyAllowed : false,
  isDeviceAllowed : false,
  companyErorrMsg:"",
  deviceErorrMsg:"",
})


const validateCompanyAndDevice=()=>{

  try {

 
  if(state?.companyName === "" && state?.isCompanyAllowed){
    
    setState({companyErorrMsg:"Please enter your company name"});
    setState({isCompanyValid:true});
    
    
  }else if (state?.companyName !== "" && state?.isCompanyAllowed){
    
   
    setState({isCompanyValid:false});
    setState({companyErorrMsg:""});
  }
  
  if(state?.deviceName === "" && state?.isDeviceAllowed){
    
    
    setState({deviceErorrMsg:"Please enter your device name"});
    setState({isDeviceAllowed:true});
    
  }else if (state?.deviceName !== "" && state?.isDeviceValid){
    
    setState({deviceErorrMsg:"Please enter your device name"});
    setState({isDeviceAllowed:false});
  }


} catch (error) {
  console.log("Error while validate Company Name & Device Name",error);
}
}


React.useEffect(()=>{

  validateCompanyAndDevice();

},[state?.companyName,state?.deviceName]);



  React.useEffect(()=>{

    FirebaseContext.toggleMinMaxIcon()

  },[])

  document.addEventListener("fullscreenchange",()=>{

    FirebaseContext.toggleMinMaxIcon()

  })

  const connectDevice = async (ev)=>{

try{

ev.preventDefault();


if(state.companyName === "" && state.deviceName !== "" ){

toast.error("Please enter company name !",{
  position: "top-center",
 autoClose: 1500,
 hideProgressBar: false,
 closeOnClick: true,
 pauseOnHover: true,
 draggable: true,
 progress: undefined,
 theme: "light",
 transition: Bounce,
 });
 return 

} else if(state.companyName !== "" && state.deviceName === "" ){

toast.error("Please enter device name !",{
  position: "top-center",
 autoClose: 1500,
 hideProgressBar: false,
 closeOnClick: true,
 pauseOnHover: true,
 draggable: true,
 progress: undefined,
 theme: "light",
 transition: Bounce,
 });

 return 

} else if(state.companyName === "" && state.deviceName === "" ){

toast.error("Please enter both company name & device name !",{
  position: "top-center",
 autoClose: 1500,
 hideProgressBar: false,
 closeOnClick: true,
 pauseOnHover: true,
 draggable: true,
 progress: undefined,
 theme: "light",
 transition: Bounce,
 });


 return 
}


if(state?.companyName && state?.companyName){

  const  docRef = doc(firestore,state.companyName,'devices',state.deviceName,'data'); 
  const docSnap = await getDoc(docRef);

  if(docSnap.exists()) {

    
    
setState({companyName:""});
setState({deviceName:""});
setState({isCompanyValid:false});
setState({isDeviceValid:false});
setState({isCompanyAllowed : false});
setState({isDeviceAllowed : false});
setState({companyErorrMsg:""});
setState({deviceErorrMsg:""});



toast.success(`Device: ${state.deviceName} is connected successfuly !`,{
position: "top-center",
autoClose: 1200,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "light",
transition: Slide,
});


localStorage.setItem("User_ID",JSON.stringify(FirebaseContext.userObj));
localStorage.setItem("Url_Path",JSON.stringify(`${state.companyName}/devices/${state.deviceName}/data`));


setTimeout(()=> navigate("/app") ,1500);

}

else{

toast.error(`This Device : ${state.deviceName} is not exsist !`,{
  position: "top-center",
 autoClose: 1500,
 hideProgressBar: false,
 closeOnClick: true,
 pauseOnHover: true,
 draggable: true,
 progress: undefined,
 theme: "light",
 transition: Bounce,
 });

}

}

}catch(error){
console.log("Error while Connecting Device",error)
}

}



function backToLogin(){

  FirebaseContext.setUserObj("");
  FirebaseContext.setIsConnectDeviceModalOpen(false)


}


  return (


    <div style={{position:"relative"}}>
    
    <img src="https://ouch-cdn2.icons8.com/uLcicCHfc_IjMpBTXDz9PWFg7qaqGhhctFE6fUunPMA/rs:fit:368:318/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9wbmcvODYw/LzQxMTQwN2NkLTc5/NjYtNGJlNi1hNTli/LWMxZDliYmY1ODUz/YS5wbmc.png" alt="Wifi Icon" className="big-logo left-4 top-4  h-auto w-[20%] object-contain absolute z-[1] " />

<img src="https://cdn3d.iconscout.com/3d/premium/thumb/link-8634497-6856464.png?f=webp" alt="Link Icon" className="big-logo right-4 top-4 tablet:bottom-[1.5rem] tablet:top-[unset]  h-auto w-[20%] object-contain absolute z-[1]" />
   
    <img src="/images/login-bg1.jpg" alt="background image"  style={{position:"absolute",top:0,height:"100%",width:"100%",objectFit:"cover"}}/> 
   
    <div className="flex flex-col w-full min-h-[100vh]  justify-center items-center">
      <Card className="my-form max-w-full  w-[400px] h-[420px] bg-gray-200 p-3 flex justify-center items-center" style={{boxShadow:"3px 9px 20px -14px black",margin:"0 40px"}}>
        <CardBody className="overflow-hidden">
          {/* w-[22vh] */}
          <div className='mb-4 flex justify-between items-center w-[100%] '><div className="flex justify-between items-center  w-[20%] text-primary"><IoMdArrowRoundBack className="text-[4vh] text-primary  cursor-pointer" onClick={backToLogin}/><Text family="Jost"  className="text-[6vh] font-semibold text-primary">Back</Text></div><div>
            
          {FirebaseContext.minMaxIcon === "max"  ? <CgMaximize className="text-2xl cursor-pointer text-primary" onClick={()=>FirebaseContext.fullScreenMode()}/> : <CgMinimizeAlt className="text-2xl cursor-pointer text-primary" onClick={()=>FirebaseContext.exitFullScreen()}/> } 

            </div></div>
          <Tabs
           className="mb-10 "
            fullWidth
            size="lg"
            aria-label="Tabs form"
            selectedKey={selected}
            onSelectionChange={setSelected}
 >
            <Tab key="login" title="Device Connection"  style={{color:"#FF0000",fontWeight:"600",cursor:"default"}}>
              <form className="flex flex-col gap-6 " id="login-form"  >
                <Input 
                 isInvalid={state?.isCompanyValid}
                 errorMessage={state?.companyErorrMsg} 
                onChange={(e)=>{
                  setState({companyName:e?.target?.value})
                  setState({isCompanyAllowed:true});
                           }
                        } value={state?.companyName} isRequired label="Company Name" placeholder="Enter company name" type="text" htmlFor="input-email" />
                <Input
                isInvalid={state?.isDeviceValid}
                errorMessage={state?.deviceErorrMsg} 
               onChange={(e) =>{
                   
                setState({deviceName:e.target.value});
                setState({isDeviceAllowed:true});
                
                }}
                  value={state?.deviceName}
                  isRequired
                  label="Device Name"
                  placeholder="Enter device name"
                  type="text"
                  htmlFor="input-password"
                />
                
                <div className="flex gap-2 justify-end">
                  <Button className="bg-primary LM425:flex  text-white shadow-lg shadow-primary" fullWidth  type="submit" onClick={connectDevice}>
                    Connect
                  </Button> 
                </div>
              </form>
              <span id="error-message" style={{color:"red",display:"none"}}></span>
            </Tab>

          </Tabs>
        </CardBody>
      </Card>
    </div>

    </div>
  );
}
