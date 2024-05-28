import React, { useEffect, useState } from "react";
import {Tabs, Tab, Input, Button, Card, CardBody, DateRangePicker, Checkbox, } from "@nextui-org/react";
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
import {DatePicker} from "@nextui-org/react";
import {getLocalTimeZone, today,parseDate} from "@internationalized/date";
import { formatedDate } from "../utils/helper";
import { Chip, cn } from "@nextui-org/react";

export default function App() {
  
  const [selected, setSelected] = React.useState("sign-up");
  const [options,setOptions] = React.useReducer((state,newState)=>({...state,...newState}),{
    selected : "sign-up",
    isCheckboxSelected:false,
    isButtonDisabled:true
  })
  
  const user = {
    name: "Download all data",
    role: "Data Logs",
    status: "Available"
  }

  const navigate = useNavigate();

  const [value, setValue] = React.useState({
    start: parseDate(formatedDate(1714377797)),
    end: parseDate(formatedDate(1714638847)),
  });

  const FirebaseContext = useFirebaseContext();  


React.useEffect(()=>{

    if(options?.isCheckboxSelected){

      setOptions({isButtonDisabled:false});
    }else if(!options?.isCheckboxSelected){
      
      setOptions({isButtonDisabled:true});
    }
  
  },[options?.isCheckboxSelected,options?.selectedOption]);


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

      console.log("Start Date\n\n")
      console.log("start day",value.start.day);
      console.log("start month",value.start.month);
      console.log("start year",value.start.year);
      console.log("-----------\n\n");

      console.log("End Date\n\n")
      console.log("end day",value.end.day);
      console.log("end month",value.start.month);
      console.log("end year",value.end.year);
      console.log("-----------\n\n");
      
      
      // console.log("Date",(formatedDate(1714377797)));
      console.log("Date",(formatedDate(1714638847)));

  
    },[value])
  
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
    <div className="flex flex-col w-full">
      <Card className="max-w-full w-[340px] h-[310px]">
        <CardBody className="overflow-hidden">
          <Tabs
            fullWidth
            size="md"
            aria-label="Tabs form"
            selectedKey={selected}
            onSelectionChange={setSelected}
          >

            <Tab key="sign-up" title="Select Date range"  className="cursor-default">
              <form className="flex flex-col gap-4 h-[300px]">
            
            <DateRangePicker
            key={'inside'}
            label="Date Duration"
            // labelPlacement={"placement"}
            // description={"hello"}
            style={{paddingTop:"30px",paddingBottom:"20px"}}
            className="max-w-xs"
          value={value}
          onChange={setValue}
                />

      <Checkbox       
      aria-label={user.name}
      classNames={{
        base: cn(
          "inline-flex max-w-md bg-content1 alig-self",
          "hover:bg-content2 items-center justify-start",
          "cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
          "data-[selected=true]:border-primary",
        ),
        label: "w-full",
      }}

      isSelected={options?.isCheckboxSelected}
      onChange={(e)=>setOptions({isCheckboxSelected:e.target.checked})}
    >

<div className="w-full flex justify-between gap-2">
   
   <div className="flex flex-col items-end gap-1">
     <span className="text-tiny text-default-500">{user.role}</span>
     <Chip color="success" size="sm" variant="flat">
       {user.status}
     </Chip>
   </div>
 </div>
</Checkbox>
 
      
                <Button isDisabled={options?.isButtonDisabled} id='logout-btn' variant="shadow" className="bg-[#FF0000] LM425:flex theme-primary-color text-white" style={{boxShadow:"rgb(255, 0, 0) 0px 7px 15px -7px"}}

                           isLoading={FirebaseContext.isLoading}
                           spinner={
                              <svg
                                className="animate-spin h-5 w-5 text-current"
                                fill="none"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                />
                                <path
                                  className="opacity-75"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                  fill="currentColor"
                                />
                              </svg>
                            }
                           >
                          Download
                           </Button>
              
         

                {/* <Input isRequired label="Name" placeholder="Enter your name" type="password" />
                <Input isRequired label="Email" placeholder="Enter your email" type="email" />
                <Input
                  isRequired
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                />
                <p className="text-center text-small">
                  Already have an account?{" "}
                  <Link size="sm" onPress={() => setSelected("login")}>
                    Login
                  </Link>
                </p>
                <div className="flex gap-2 justify-end">
                  <Button fullWidth color="primary">
                    Sign up
                  </Button>
                </div> */}
              </form>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
}
