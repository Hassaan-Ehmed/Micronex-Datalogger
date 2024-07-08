import React, { useEffect, useReducer, useRef, useState } from "react";
import {Tabs, Tab, Input, Button, Card, CardBody, } from "@nextui-org/react";
import { useLocation, useNavigate } from "react-router-dom";
import { ref,onValue, getDatabase } from "firebase/database";
import { firebaseApp, firebaseAuth, useFirebaseContext } from "../context/FirebaseApp";
import {signInWithEmailAndPassword} from 'firebase/auth'
import { Bounce, toast ,Flip, Slide} from "react-toastify";
import '../App.css'
import MyFullScreenModal from "./FullScreenModal";
import { CgMaximize, CgMinimizeAlt } from "react-icons/cg";


export default function LoginForm() {
  
const FirebaseContext = useFirebaseContext();
const navigate = useNavigate();

// const URL = useLocation();

// console.log(URL.pathname);

// Full Screen Mode 
// React.useEffect(()=>{FirebaseContext.fullScreenMode()},[]);

  const [selected, setSelected] = React.useState("login");
  
  const [state,setState] = React.useReducer((state,newState)=>({...state,...newState}),{

    email:"",
    password:"",
    isEmailValid:false,
    isPasswordValid:false,
    isEmailAllowed : false,
    isPasswordAllowed : false,
    emailErorrMsg:"",
    passwordErorrMsg:"",
  })


  const validateEmailAndPassword=()=>{

    try {

   
    if(state?.email === "" && state?.isEmailAllowed){
      
      setState({emailErorrMsg:"Please enter your email"});
      setState({isEmailValid:true});
      
      
    }else if (state?.email !== "" && state?.isEmailAllowed){
      
     
      setState({isEmailValid:false});
      setState({emailErorrMsg:""});
    }
    
    if(state?.password === "" && state?.isPasswordAllowed){
      
      
      setState({passwordErorrMsg:"Please enter your passsword"});
      setState({isPasswordValid:true});
      
    }else if (state?.password !== "" && state?.isPasswordAllowed){
      
      setState({passwordErorrMsg:"Please enter your passsword"});
      setState({isPasswordValid:false});
    }




  } catch (error) {
    console.log("Error while validate Email & Pass",error);
  }
  }


  React.useEffect(()=>{

    validateEmailAndPassword();

  },[state?.email,state?.password]);



  React.useEffect(()=>{

    FirebaseContext.toggleMinMaxIcon()
  
  },[])
  
  document.addEventListener("fullscreenchange",()=>{
  
    FirebaseContext.toggleMinMaxIcon()
  
  })
  
 const loginUser=(ev)=>{

  try{

  ev.preventDefault();


if(state.email === "" && state.password !== "" ){

  toast.error("Please enter email address!",{
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
} else if(state.email !== "" && state.password === "" ){

  toast.error("Please enter password !",{
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

  } else if(state.email === "" && state.password === "" ){

  toast.error("Please fill proper form !",{
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


console.log("Hey.........");
  if(state?.email && state?.email){


signInWithEmailAndPassword(firebaseAuth,state?.email,state?.password).then((cred)=>{
  
  localStorage.setItem("User_ID",JSON.stringify(cred.user));

console.log("userCredientials",cred.user);

setState({email:""});
setState({password:""});
setState({isEmailValid:false});
setState({isPasswordValid:false});
setState({isEmailAllowed : false});
setState({isPasswordAllowed : false});
setState({emailErorrMsg:""});
setState({passwordErorrMsg:""});

toast.success("Login successfully !",{
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

setTimeout(()=> navigate("/app") ,1500)
  
}).catch((error => {

    const errorMsg = error.message;

    console.log("Error Msg",errorMsg)

if(errorMsg == "Firebase: Error (auth/invalid-credential)."){


  toast.error("Invalid credential !",{
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
if(errorMsg == "Firebase: Error (auth/network-request-failed)."){

  toast.error("Check your network connection",{
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

  }))

}

}catch(error){
  console.log("Error while Login",error)
}

 }



  return (
    <div style={{position:"relative",backgroundColor:"white"}}>

      <MyFullScreenModal/>
    
<img src="https://cdn3d.iconscout.com/3d/premium/thumb/security-setting-11767831-9591003.png" alt="Hum Icon" className="big-logo left-4 top-4 tablet:top-[unset] h-auto w-[20%] object-contain absolute z-[1] " />

<img src="https://cdn3d.iconscout.com/3d/premium/thumb/humidity-sensor-5108622-4285827.png?f=webp" alt="Temp Icon" className="big-logo right-4 top-4 tablet:bottom-[1.5rem] tablet:top-[unset]  h-auto w-[20%] object-contain absolute z-[1]" />
   
    <img src="/images/login-bg1.jpg" alt="background image"  style={{position:"absolute",top:0,height:"100%",width:"100%",objectFit:"cover"}}/> 
   
    <div className="flex flex-col w-full min-h-[100vh]  justify-center items-center">
      <Card className="my-form my-form-galassy max-w-full  w-[400px] h-[420px] bg-gray-200 p-3 flex justify-center items-center" style={{boxShadow:"3px 9px 20px -14px black",margin:"0 40px"}}>
        <CardBody className="overflow-hidden">

        <div className='mb-4 flex justify-end items-center w-[100%]'>
            
            {FirebaseContext.minMaxIcon === "max"  ? <CgMaximize className="text-2xl cursor-pointer text-white" onClick={()=>FirebaseContext.fullScreenMode()}/> : <CgMinimizeAlt className="text-2xl cursor-pointer text-white" onClick={()=>FirebaseContext.exitFullScreen()}/> } 
  
              </div>
          <Tabs
           className="mb-10 "
            fullWidth
            size="lg"
            aria-label="Tabs form"
            selectedKey={selected}
            onSelectionChange={setSelected}
 >
            <Tab key="login" title="Login"  style={{color:"#FF0000",fontWeight:"600",cursor:"default"}}>
              <form className="flex flex-col gap-6 " id="login-form"  >
            
                <Input
                isInvalid={state?.isEmailValid}
                errorMessage={state?.emailErorrMsg} 
                 onChange={(e)=>{
                  setState({email:e?.target?.value})
                  setState({isEmailAllowed:true});
                           }
                        }
                value={state?.email}
                isRequired 
                label="Email"
                placeholder="Enter your email"
                type="email"
                  htmlFor="input-email"
                 />
               
                <Input
                  isInvalid={state?.isPasswordValid}
                  errorMessage={state?.passwordErorrMsg} 
                onChange={(e) =>{
                   
                  setState({password:e.target.value});
                  setState({isPasswordAllowed:true});
                  
                  }}
                  value={state?.password}
                  isRequired
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  htmlFor="input-password"
                />
                
                <div className="flex gap-2 justify-end">
                  <Button className="bg-slate-500 LM425:flex  text-white  shadow-black shadow-md" fullWidth  type="submit" onClick={loginUser} 
                  // style={{boxShadow:"0px 0px 0px 0px black"}}
                  >
                    Login
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
