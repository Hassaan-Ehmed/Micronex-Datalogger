import { Button, Card, CardBody, DatePicker, Select, SelectItem, Tab, Tabs, TimeInput } from "@nextui-org/react";
import React from "react";
import '../App.css';
import { useFirebaseContext } from "../context/FirebaseApp";

import {parseAbsoluteToLocal, Time,parseDate, parseTime} from "@internationalized/date";

import { Checkbox, Chip, cn } from "@nextui-org/react";
import { getDatabase, ref , get, child, Database, query, orderByChild, equalTo, startAt } from "firebase/database";
import { ConvertEpochTimeStamp, formatedDate, timeFormatedArray } from "../utils/helper";
import { HiOutlineSelector } from "react-icons/hi";
import { Bounce, toast } from "react-toastify";



export default function App() {

  const FirebaseContext = useFirebaseContext();

  const [value, setValue] = React.useState(parseDate(FirebaseContext?.dateLimits.minimumDate));
  const [startValue, setStartValue] = React.useState([]);
  const [endValue, setEndValue] = React.useState(new Time(11,30));

  const fileFormats = ["Text format","Excel format","PDF format"]

  const user = {
    name: "Download all data",
    role: "Data Logs",
    status: "Available"
  }

  let arrayPacket = [];

  const DB_REF = ref(getDatabase());
  
  const [options,setOptions] = React.useReducer((state,newState)=>({...state,...newState}),{
    selected : "sign-up",
    selectedOption:"Text format",
    isCheckboxSelected:false,
    isButtonDisabled:true,
    startTimeSelection:"",
    endTimeSelection:"",
    startTimeIsInValid:false,
    endTimeIsInValid:false,
  })


  // const [time, setTime] = React.useReducer((state,newState)=>({...state,...newState}),{
  //   startTime: new Time(12,15),
  //   endTime: new Time(5,30),
  // });
  

  // let [date, setDate] = React.useState(parseDate("2024-04-04"));

  React.useEffect(()=>{

    if(options?.isCheckboxSelected){

      setOptions({isButtonDisabled:false});
    }else if(!options?.isCheckboxSelected){
      
      setOptions({isButtonDisabled:true});
    }
  
  },[options?.isCheckboxSelected,options?.selectedOption]);



  React.useEffect(()=>{

    const fetchingForTimeStamps  = async()=>{
     
      try{
        
        const snapshot = await get(query(ref(getDatabase(),"dataLogs/"),orderByChild("datepoint"),equalTo(value?.toString())))
    
          if(snapshot.exists()){
    
            const data = snapshot.val();
    
            FirebaseContext.setTimesArr(timeFormatedArray(Object.keys(data)));
  
            const timesArr = timeFormatedArray(Object.keys(data));
  
            setOptions({startTimeSelection:timesArr[0],endTimeSelection:timesArr[timesArr.length-1]});
  
            // console.log("Data in ByTimeForm ....: ",  Object.values(data));
          }else{

          
            //Show Error If Timestamp Data is not available in Firebase
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
       
        }catch(error){
    

           //Show Error While Downloading (date range for intial tim limit drop down ) From Firebase
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
  
  
      fetchingForTimeStamps();
  
  
  },[value]);


  React.useEffect(()=>{


      let startTimee =   options.startTimeSelection.split(":").join("");
      let endTimee =   options.startTimeSelection.split(":").join("");
    if(startTimee > endTimee){

      setOptions({startTimeIsInValid:true})
    }

  },[options?.startTimeIsInValid,options?.endTimeIsInValid]);

    const DownloadDataUponDtime = async ()=>{

   
  try{
    
    const snapshot = await get(query(ref(getDatabase(),"dataLogs/"),orderByChild("datepoint"),equalTo(value?.toString())))


      if(snapshot.exists()){

        const data = snapshot.val();
        
        // if(dataPacket.timestamp.split("_")[1] == options?.startTimeSelection.split(":").join("")){
        //    }
        
        let startTime = options?.startTimeSelection.split(":").join("");
        let endTime = options?.endTimeSelection.split(":").join("");
        let filteredTimeRange;
        
        if(startTime < endTime){
          
          
          startTime = options?.startTimeSelection.split(":").join("");
        endTime = options?.endTimeSelection.split(":").join("");

        }else if(startTime > endTime){
          
           startTime = options?.endTimeSelection.split(":").join("");
            endTime = options?.startTimeSelection.split(":").join("");
          }
          else if(startTime == endTime){
          
            startTime = options?.startTimeSelection.split(":").join("");
             endTime = options?.startTimeSelection.split(":").join("");
           }
          

if(startTime !== endTime){
  
       filteredTimeRange  = Object.values(data).filter((dataPacket)=>{

        const time = dataPacket.timestamp.split("_")[1];

// When comparing strings that represent numerical values in the format "HHMM", the comparison operators >= and <= work as intended because the strings are directly comparable in lexicographical order. Here's why this works:

// Lexicographical Order: Lexicographical order for strings works similarly to numerical order when the strings have the same length and are composed of digits. For example, "0400" is less than "1200" because '0' < '1' in the first position where they differ.


  return  time >= startTime && time <= endTime; // Compare times lexicographically


        });
}  
        else{
  
       filteredTimeRange =  Object.values(data).filter((dataPacket)=>{

            const time  = dataPacket.timestamp.split("_")[1];

            // i use start time but i also use  endTime cause startTime isequl to endTime
            // so i just want to check and catch 
            return time == startTime;
          });

}
        
        console.log("filteredTimeRange Array", filteredTimeRange);
        console.log("Data in ByTimeForm ....: ",  Object.values(data));
        setTimeout(()=>{
          
  
        // Download File Main Function!! 
        const isFileDownloaded =  FirebaseContext?.executeDownloadProcess(options?.selectedOption,filteredTimeRange);
        
        if(isFileDownloaded){
          
          // if file downloaded so it can reset all the states
          
          setOptions(
            {selectedOption:"Text format",
            isCheckboxSelected:false,
            isButtonDisabled:true}
          )
          
          FirebaseContext.setTimeDurationLoading(false);
        console.log(">>>>>>>>>>...",options?.isCheckboxSelected)  
        }

        },2000)

        FirebaseContext.setTimeDurationLoading(true);

      }else{
        
         //Show Error If Data is not available in Firebase
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
   
    }catch(error){

      //Show Error While Downloading ( Data by Time ) From Firebase
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
    <div className="flex flex-col w-full ">
      <Card className="max-w-full w-[340px] h-[380px]">
        <CardBody className="overflow-hidden ">
          <Tabs
            fullWidth
            size="md"
            aria-label="Tabs form"
            selectedKey={options?.selected}
            onSelectionChange={setOptions}
            
          >

            <Tab key="sign-up" title="Select Time period"  className="cursor-default">
              <form className="flex flex-col gap-4 h-[310px]">

              <DatePicker
              color="default"
            key={'inside'}
            label="Select Date"
            // labelPlacement={"placement"}
            // description={"hello"}
            style={{paddingTop:"30px",paddingBottom:"20px",color:"black",backgroundColor:"hsl(0deg 0% 77.01%)"}}
            className="max-w-md text-foreground hover:text-foreground selection:bg-gray-400"
            value={value} 
            onChange={setValue}
            minValue={parseDate(FirebaseContext?.dateLimits.minimumDate)}
            maxValue={parseDate(FirebaseContext?.dateLimits.maximumDate)}
            defaultValue={parseDate(FirebaseContext?.dateLimits.minimumDate)}
                />


<div className="w-full flex justify-between gap-2">

{/* Start Time */}
      <Select

errorMessage={options?.startTimeIsInValid  ? "" : "Greater than end time"}

isInvalid={options?.startTimeIsInValid  ? true : false}
disableSelectorIconRotation
selectorIcon={<HiOutlineSelector style={{color:
  "black"
}} />}
label="Select Start time"
      placeholder="Text Format"
      defaultSelectedKeys={["Text format"]}
      className="w-[50%]"
      selectedKeys={[options?.startTimeSelection]}
      onChange={(e)=>setOptions({startTimeSelection:e.target.value})}
      
    >
      {FirebaseContext.timesArr.map((format)=>{

      return(
      <SelectItem key={format} value={format} className="text-primary">
      {format}
    </SelectItem>)
   

        })}
        
    </Select>  
    
    {/* End Time */}
    <Select
    errorMessage={options?.endTimeIsInValid  ? "" : "Less than start time"}
    isInvalid={options?.endTimeIsInValid  ? true : false}
    disableSelectorIconRotation
    selectorIcon={<HiOutlineSelector style={{color:
      "black"
    }}  />}
      label="Select End time"
      placeholder="Text Format"
      defaultSelectedKeys={["Text format"]}
      className="w-[50%]"
      selectedKeys={[options?.endTimeSelection]}
      onChange={(e)=>setOptions({endTimeSelection:e.target.value})}
      
      
    >
      {FirebaseContext.timesArr.map((format)=>{

      return(
      <SelectItem key={format} value={format} className="text-primary">
      {format}
    </SelectItem>)
   

        })}
        
    </Select>





{/* <TimeInput isRequired  hourCycle={24} hideTimeZone={true} label="Start Time"  value={startValue} onChange={setStartValue} className="w-[50%]" /> */}
{/* 
<TimeInput isRequired  hourCycle={24} hideTimeZone={true} label="End Time"  value={endValue} onChange={setEndValue}  className="w-[50%]" /> */}

</div>


{/* File Format */}
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
      <SelectItem key={format} value={format} className="text-primary">
      {format}
    </SelectItem>)
   

        })}
        
    </Select>
            
             
    <Checkbox isSelected={options?.isCheckboxSelected}  value={options?.isCheckboxSelected} onChange={(e)=>setOptions({isCheckboxSelected:e.target.checked})} color="secondary"  className={`${options?.isCheckboxSelected ? "opacity-[1]" : "opacity-80"} ml-1 `}>
    &nbsp;&nbsp;&nbsp;Yes, I want to download datalogs
      </Checkbox>
      
           
              <Button onClick={DownloadDataUponDtime} isDisabled={options?.isButtonDisabled}  id='logout-btn' variant="shadow" className="bg-primary LM425:flex  text-foreground shadow-lg shadow-primary" 
                           isLoading={FirebaseContext.timeDurationLoading}
                           spinner={
                              <svg
                                className="animate-spin h-5 w-5 text-primary mb-2"
                                fill="white"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="white"
                                  strokeWidth="4"
                                />
                                <path
                                  className="opacity-75"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                  fill="white"
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
