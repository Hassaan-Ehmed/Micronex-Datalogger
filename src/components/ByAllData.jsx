import { Button, Card, CardBody, Select, SelectItem, Tab, Tabs } from "@nextui-org/react";
import React from "react";
import '../App.css';
import { firestore, useFirebaseContext } from "../context/FirebaseApp";
import { Checkbox, Chip, cn } from "@nextui-org/react";
import { getDatabase, ref , get, child } from "firebase/database";
import { Bounce , toast } from "react-toastify";
import { collection, getDocs, query } from "firebase/firestore";



export default function App() {
  
  const fileFormats = ["Text format","Excel format","PDF format"];

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

  
  React.useEffect(()=>{

    if(options?.isCheckboxSelected){

      setOptions({isButtonDisabled:false});
    }else if(!options?.isCheckboxSelected){
      
      setOptions({isButtonDisabled:true});
    }
  
  },[options?.isCheckboxSelected,options?.selectedOption]);


  const DownloadAllData = async ()=>{
  

 

  try{
    
    let DB_URL_PATH = JSON.parse(localStorage.getItem("Url_Path"));
    DB_URL_PATH = DB_URL_PATH+"/realtime"
    const  COPMANY_NAME  =  DB_URL_PATH.split("/")[0]
    const  DEVICE_NAME  =  DB_URL_PATH.split("/")[2]

    const collectionRef = collection(firestore, COPMANY_NAME, "devices", DEVICE_NAME, "data", "logs");


    const q = query(collectionRef);
      
    const data = await getDocs(q);

    if(!data.empty){
      
      const dataPackets = data.docs.map((doc)=>({
        ...doc.data()
      })) ?? {};


      setTimeout(()=>{
            
        // Download File Main Function!! 
        const isFileDownloaded =  FirebaseContext?.executeDownloadProcess(options?.selectedOption,dataPackets);
        
        if(isFileDownloaded){
          
          // if file downloaded so it can reset all the states
          
          setOptions(
            {selectedOption:"Text format",
            isCheckboxSelected:false,
            isButtonDisabled:true}
          )
          
          FirebaseContext.setAllDataLoading(false);
          }

        },2000)

        FirebaseContext.setAllDataLoading(true);



    } else{

        
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
   
    }catch(error){
      
      //Show Error While Downloading (All Data) From Firebase
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
    <div className="flex flex-col w-full mb-[3.45rem]">
      <Card className="max-w-full w-[340px] h-[285px]">
        <CardBody className="overflow-hidden">
          <Tabs
            fullWidth
            size="md"
            aria-label="Tabs form"
            selectedKey={options?.selected}
            onSelectionChange={setOptions}
          >

            <Tab key="sign-up" title="Select options"  className="cursor-default">
              <form className="flex flex-col  gap-4 h-[300px]">

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

<Checkbox       
color="secondary"
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
          <span className="text-tiny text-primary ">{user.role}</span>
          <Chip color="success" size="sm" variant="flat">
            {user.status}
          </Chip>
        </div>
      </div>
    </Checkbox>
      
           
              <Button onClick={DownloadAllData} isDisabled={options?.isButtonDisabled}  id='logout-btn' variant="shadow" className="bg-primary LM425:flex  text-foreground shadow-lg shadow-primary" 
                           
                           isLoading={FirebaseContext.allDataLoading}
                           spinner={
                              <svg
                                className="animate-spin h-5 w-5 text-primary"
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
