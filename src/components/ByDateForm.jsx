import React, { useEffect, useState } from "react";
import {Tabs, Tab, Input, Button, Card, CardBody, DateRangePicker, Checkbox, Select, SelectItem, } from "@nextui-org/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ref,onValue, getDatabase, query, orderByChild, child, get, startAt, endAt } from "firebase/database";
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
import { dateToEpochTime, formatedDate } from "../utils/helper";
import { Chip, cn } from "@nextui-org/react";

export default function App() {
  
  const FirebaseContext = useFirebaseContext();
  const DB_REF = ref(getDatabase());

  const fileFormats = ["Text format","Excel format","PDF format"];

  const user = {
    name: "Download all data",
    role: "Data Logs",
    status: "Available"
  }

  
  const [selected, setSelected] = React.useState("sign-up");
   
  const [value, setValue] = React.useState(
    {
        start: parseDate(FirebaseContext?.dateLimits?.minimumDate) ,
        end: parseDate(FirebaseContext?.dateLimits?.maximumDate) ,
    } 
);
    

  const [options,setOptions] = React.useReducer((state,newState)=>({...state,...newState}),{
    selected : "sign-up",
    selectedOption:"Text format",
    isCheckboxSelected:false,
    isButtonDisabled:true,
  
  })
  
  React.useEffect(()=>{

    // console.log("Start Date\n\n")
    // console.log("start day",value.start.day);
    // console.log("start month",value.start.month);
    // console.log("start year",value.start.year);
    // console.log("-----------\n\n");

    // console.log("End Date\n\n")
    // console.log("end day",value.end.day);
    // console.log("end month",value.start.month);
    // console.log("end year",value.end.year);
    // console.log("-----------\n\n");
    
    // fetchTimeStamp();  
    // console.table("Hmm...",parseDate(formatedDate(1714377797)))   
    console.log("StartDateConv..",value.start)   
    // console.log("StartDateConv.XZY",dateToEpochTime(value.start.toString() || ""))   
    console.log("EndDateConv..",value.end.toString())   

    
  },[])
  

  
React.useEffect(()=>{

    if(options?.isCheckboxSelected){

      setOptions({isButtonDisabled:false});
    }else if(!options?.isCheckboxSelected){
      
      setOptions({isButtonDisabled:true});
    }
  
  },[options?.isCheckboxSelected,options?.selectedOption]);

  
    document.addEventListener("fullscreenchange",()=>{
  
      FirebaseContext.toggleMinMaxIcon()
  
    })

    // async function fetchTimeStamp (){

    //   try{
        
    //     const snapshot = await get(child(DB_REF,'dataLogs/'));
    
    //     if(snapshot.exists()){
       
    //       const timeStamps = Object.keys(snapshot.val() || {});
    
    //       if(timeStamps){

          
    //         console.log("timestamps in Download modal !!",timeStamps);

    //         console.log("dateStart",formatedDate(timeStamps[0]))
    //         console.log("dateEnd",formatedDate(timeStamps[timeStamps.length-1]));



    //         setValue(
    //           {
    //             start: parseDate(formatedDate(timeStamps[0])),
    //             end: parseDate(formatedDate(timeStamps[timeStamps.length-1])),
    //           } 

    //         )

    //         // console.log("StartDate",formatedDate(timeStamps[0]))
    //        // console.log("XZXZXZ",value.start.toString())
    //       // console.log("StartDateX",dateToEpochTime())
    //      // console.log("EndDate",timeStamps[timeStamps.length-1])

           
            
    //       }else{
          
    //         setValue({
    //           start: parseDate(formatedDate("2024-01-01")),
    //           end: parseDate(formatedDate("2024-04-06")),
    //       } )
          
    //       }
    //   }else{
    //     console.log("TIMESTAMP DATA NOT FOUND")
    //   }
    
    
    //   }catch(error){
    //     console.log(error,"Error while fetching timestamp...")
    //   }
    // }

    const DownloadDateRangeData = async ()=>{
  
      try{
        
        const snapshot = await get(query(
                          ref(getDatabase(),'dataLogs/'),
                          orderByChild('datepoint'),
                            startAt(`${value?.start}`),
                          endAt(`${value?.end}`),
                        ));
    
                      if(snapshot.exists()){
                        
                        console.log("Data: ",snapshot.val());
                
                        const data = snapshot.val();
                
                        console.log("dataLogs Date Range DATA::",data);
                        setTimeout(()=>{
                            

                          // console.log("options?.selectedOption",typeof options?.selectedOption)
                        // Download File Main Function!! 
                        const isFileDownloaded =  FirebaseContext?.executeDownloadProcess(options?.selectedOption,Object.values(data));

                        if(isFileDownloaded){
                          
                          // if file downloaded so it can reset all the states
                          
                          setOptions(
                            {selectedOption:"Text format",
                            isCheckboxSelected:false,
                            isButtonDisabled:true}
                          )
                          
                          FirebaseContext.setDateDurationLoading(false);
                          }
                
                        },2000)
                
                        FirebaseContext.setDateDurationLoading(true);
                
                      }else{

                        //Show Error If Data is not available in  From Firebase
                        toast.error(`No Data Available !`,{
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

          }
       
        }catch(error) {

            //Show Error While Downloading ( Data by Range ) From Firebase
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
            
          }
     
        
        
      }
    

    return (
    <div className="flex flex-col w-full mb-[2.45rem] ">
      <Card className="max-w-full w-[340px] h-[310px] ">
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
            minValue={parseDate(FirebaseContext?.dateLimits?.minimumDate)}
            maxValue={parseDate(FirebaseContext?.dateLimits?.maximumDate)}
            
            // minValue={options?.minDateRange}
            // maxValue={options?.maxDateRange}
            key={'inside'}
            label="Date Duration"
       
            style={{paddingTop:"30px",paddingBottom:"20px"}}
            className="max-w-xs"
          value={value}
          onChange={setValue}
                />
     

        <Select
      label="Select File format"
      placeholder="Text Format"
      defaultSelectedKeys={["Text format"]}
      className="max-w-xs"
      selectedKeys={[options?.selectedOption]}
      onChange={(e)=>setOptions({selectedOption:e.target.value})}
      
    >
      {fileFormats.map((format)=>{

      return(
      <SelectItem key={format} value={format}>
      {format}
    </SelectItem>)
   

        })}
        
    </Select>

          {/* isSelected={options?.isCheckboxSelected} */}
 
    <Checkbox isSelected={options?.isCheckboxSelected} value={options?.isCheckboxSelected} onChange={(e)=>setOptions({isCheckboxSelected:e.target.checked})} className={`${options?.isCheckboxSelected ? "opacity-[1]" : "opacity-80"} ml-1`}>
    &nbsp;&nbsp;&nbsp;Yes,I want to download datalogs
      </Checkbox>
      
                <Button onClick={DownloadDateRangeData} isDisabled={options?.isButtonDisabled} id='logout-btn' variant="shadow" className="bg-[#FF0000] LM425:flex theme-primary-color text-white" style={{boxShadow:"rgb(255, 0, 0) 0px 7px 15px -7px"}}

                           isLoading={FirebaseContext.dateDurationLoading}
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
              
              </form>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
}
