import React, { useEffect, useState } from "react";
import {Tabs, Tab, Input, Button, Card, CardBody, } from "@nextui-org/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ref,onValue, getDatabase } from "firebase/database";
import { firebaseApp, firebaseAuth, useFirebaseContext } from "../context/FirebaseApp";
import {getAuth, signInWithEmailAndPassword,createUserWithEmailAndPassword} from 'firebase/auth'
import { IoMdArrowRoundBack } from "react-icons/io";
import Text from 'react-font'
import { Bounce, toast ,Flip, Slide} from "react-toastify";
import '../App.css'
import MyFullScreenModal from "./FullScreenModal";
import { CgMaximize, CgMinimizeAlt } from "react-icons/cg";

export default function SignupForm() {
  
const navigate = useNavigate();



const FirebaseContext = useFirebaseContext();

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

  const createUser=(ev)=>{

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


if(state?.email && state?.email){

createUserWithEmailAndPassword(firebaseAuth,state?.email,state?.password).then((cred)=>{


setState({email:""});
setState({password:""});
setState({isEmailValid:false});
setState({isPasswordValid:false});
setState({isEmailAllowed : false});
setState({isPasswordAllowed : false});
setState({emailErorrMsg:""});
setState({passwordErorrMsg:""});

toast.success("User created successfully !",{
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

if(errorMsg == "Firebase: Error (auth/email-already-in-use)."){


toast.error("This user already exsist!",{
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
console.log("Error while Creating user Account",error)
}

}




  return (


    <div style={{position:"relative"}}>
    
    {/* <MyFullScreenModal/> */}

    <img src="https://cdn3d.iconscout.com/3d/premium/thumb/humidity-10624965-8599068.png?f=webp" alt="Hum Icon" className="big-logo left-4 top-4 tablet:top-[unset] h-auto w-[20%] object-contain absolute z-[1]" />

<img src="https://cdn3d.iconscout.com/3d/premium/thumb/temperature-6912337-5665190.png" alt="Temp Icon" className="big-logo right-4 top-4 tablet:bottom-[1.5rem] tablet:top-[unset]  h-auto w-[20%] object-contain absolute z-[1]" />
   
    <img src="/images/bg6.jpg" alt="background image"  style={{position:"absolute",top:0,height:"100%",width:"100%",objectFit:"cover"}}/> 
    <div className="flex flex-col w-full min-h-[100vh]  justify-center items-center">
      <Card className="my-form max-w-full  w-[400px] h-[420px] bg-gray-200 p-3 flex justify-center items-center" style={{boxShadow:"3px 9px 20px -14px black",margin:"0 40px"}}>
        <CardBody className="overflow-hidden">
          {/* w-[22vh] */}
          <div className='mb-4 flex justify-between items-center w-[100%]'><div className="flex justify-between items-center  w-[40%]"><Link to={'/app'}><IoMdArrowRoundBack className="text-[4vh] text-[#FF0000] cursor-pointer"/></Link><Text family="Jost"  className="text-[6vh] font-semibold">Back to home</Text></div><div>
            
          {FirebaseContext.minMaxIcon === "max"  ? <CgMaximize className="text-2xl cursor-pointer" onClick={()=>FirebaseContext.fullScreenMode()}/> : <CgMinimizeAlt className="text-2xl cursor-pointer" onClick={()=>FirebaseContext.exitFullScreen()}/> } 

            </div></div>
          <Tabs
           className="mb-10 "
            fullWidth
            size="lg"
            aria-label="Tabs form"
            selectedKey={selected}
            onSelectionChange={setSelected}
 >
            <Tab key="login" title="Signup"  style={{color:"#FF0000",fontWeight:"600",cursor:"default"}}>
              <form className="flex flex-col gap-6 " id="login-form"  >
                <Input 
                 isInvalid={state?.isEmailValid}
                 errorMessage={state?.emailErorrMsg} 
                onChange={(e)=>{
                  setState({email:e?.target?.value})
                  setState({isEmailAllowed:true});
                           }
                        } value={state?.email} isRequired label="Email" placeholder="Enter your email" type="email" htmlFor="input-email" />
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
                  <Button style={{backgroundColor:"#FF0000",color:"white",boxShadow:"0px 0px 0px 0px white"}}  fullWidth  type="submit" onClick={createUser}>
                    Create User
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
