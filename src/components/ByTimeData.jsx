import { Button, Card, CardBody, DatePicker, Select, SelectItem, Tab, Tabs, TimeInput } from "@nextui-org/react";
import React from "react";
import '../App.css';
import { useFirebaseContext } from "../context/FirebaseApp";

import {parseAbsoluteToLocal, Time,parseDate} from "@internationalized/date";

import { Checkbox, Chip, cn } from "@nextui-org/react";
import { getDatabase, ref , get, child } from "firebase/database";
import { ConvertEpochTimeStamp, formatedDate } from "../utils/helper";


export default function App() {


  
  const fileFormats = ["Text format","Excel format","PDF format"]

  const user = {
    name: "Download all data",
    role: "Data Logs",
    status: "Available"
  }

  const FirebaseContext = useFirebaseContext();

  const DB_REF = ref(getDatabase());
  
  const [options,setOptions] = React.useReducer((state,newState)=>({...state,...newState}),{
    selected : "sign-up",
    selectedOption:"Text format",
    isCheckboxSelected:false,
    isButtonDisabled:true
  })


  // const [time, setTime] = React.useReducer((state,newState)=>({...state,...newState}),{
  //   startTime: new Time(12,15),
  //   endTime: new Time(5,30),
  // });
  
 
  let [startValue, setStartValue] = React.useState(parseAbsoluteToLocal("2024-04-08T18:45:22Z"));
  let [endValue, setEndValue] = React.useState(parseAbsoluteToLocal("2024-04-08T18:45:22Z"));
  let [date, setDate] = React.useState(parseDate("2024-04-04"));

  React.useEffect(()=>{

    if(options?.isCheckboxSelected){

      setOptions({isButtonDisabled:false});
    }else if(!options?.isCheckboxSelected){
      
      setOptions({isButtonDisabled:true});
    }
  
  },[options?.isCheckboxSelected,options?.selectedOption]);


  const DownloadAllData = async ()=>{
  
  try{
    
    const snapshot  = await get(child(DB_REF,'data/'));

      if(snapshot.exists()){
        
        console.log("Data: ",snapshot.val());

        const data = snapshot.val();


        setTimeout(()=>{
          
  
        // Download File Main Function!! 
        const isFileDownloaded =  FirebaseContext?.executeDownloadProcess(options?.selectedOption,data);
        
        if(isFileDownloaded){
          
          // if file downloaded so it can reset all the states
          
          setOptions(
            {selectedOption:"Text format",
            isCheckboxSelected:false,
            isButtonDisabled:true}
          )
          
          FirebaseContext.setIsLoading(false);
          }

        },2000)

        FirebaseContext.setIsLoading(true);

      }else{
        console.log("No Data Available"); 
      }
   
    }catch(error){

      console.log(error,"Error While Downloading (All Data)");

    }
    
  }

React.useEffect(()=>{

  // console.log("value start",value.start);
  // console.log("value end",value.end);
  // console.log(new Time(2,18).toString());


  // Epoch Time 11:35://03
  console.log("endvalue",endValue.toString().split("").slice(11,16).join(""));
  console.log("startvalue",startValue.toString().split("").slice(11,16).join(""));
  console.log("date",date.toDate());



},[endValue,startValue,date])
    return (
    <div className="flex flex-col w-full">
      <Card className="max-w-full w-[340px] h-[310px]">
        <CardBody className="overflow-hidden">
          <Tabs
            fullWidth
            size="md"
            aria-label="Tabs form"
            selectedKey={options?.selected}
            onSelectionChange={setOptions}
          >

            <Tab key="sign-up" title="Select Time period"  className="cursor-default">
              <form className="flex flex-col gap-4 h-[300px]">


              <div className="w-full flex justify-between gap-2">

              <TimeInput hideTimeZone={true} label="Start Time" defaultValue={new Time(12,15)} value={startValue} onChange={setStartValue} className="w-[50%]" />

              <TimeInput hideTimeZone={true} label="End Time" defaultValue={new Time(5,30)} value={endValue} onChange={setEndValue}  className="w-[50%]" />
            
              </div>

              
    
            <DatePicker
            key={'inside'}
            label="Select Date"
            // labelPlacement={"placement"}
            // description={"hello"}
            style={{paddingTop:"30px",paddingBottom:"20px"}}
            className="max-w-md"
          value={date}
          onChange={setDate}
                />
      <Checkbox       
      aria-label={user.name}
      classNames={{
        base: cn(
          "inline-flex max-w-md bg-content1 alig-self",
          "hover:bg-content2 items-center justify-start",
          "cursor-pointer rounded-lg gap-2 p-2 border-2 border-transparent",
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
      
           
              <Button onClick={DownloadAllData} isDisabled={options?.isButtonDisabled}  id='logout-btn' variant="shadow" className="bg-[#FF0000] LM425:flex theme-primary-color text-white" style={{boxShadow:"rgb(255, 0, 0) 0px 7px 15px -7px"}}
                           
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
            
              </form>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
}
