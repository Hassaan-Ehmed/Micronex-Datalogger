import { Button, Spinner } from '@nextui-org/react';
import React, { useEffect } from 'react'
import { Text } from 'react-font';
import { LuRefreshCcw } from "react-icons/lu";
import { MdErrorOutline } from "react-icons/md";
import { FaCircleCheck } from "react-icons/fa6";




export default function NetworkErrorScreen() {


// const [isRefresh,setIsRefresh] = React.useState(false);
const [isOnline,setIsOnline] = React.useState(false);
const [isLoadingValue,setIsLoadingValue] = React.useState(false);




// React.useEffect(()=>{

//   if(window.navigator.onLine){
//     return 
//   }else{
//     getRefresh();
//   }


// },[]);

function getRefresh(){

  setIsLoadingValue(true)
  
  
  setTimeout(()=>{
    
    setIsLoadingValue(false)
      
    },8000);
    


}



return (


  <>
  
  {/* {isOnline == false && ( */}

 
    <>

         <div className='w-full h-[100vh] z-[500]  text-white bg-white flex flex-col laptop:flex-row justify-center gap-3 laptop:gap-9 items-center' >
        
        {/* <img src="/images/network-error.png" alt="Network Error :("  className='w-[25rem] h-[50%] tablet:w-[22rem] tablet:h-[50%] laptop:w-[30rem] laptop:h-[70%]  '/> */}



<svg 
className='w-[150px] LM425:w-[200px] laptop:w-[230px] h-[150px] LM425:h-[200px] laptop:h-[230px]'
fill="#ff0000" 
  viewBox="0 0 36 36" 
  version="1.1" 
  preserveAspectRatio="xMidYMid meet" 
  xmlns="http://www.w3.org/2000/svg" 
  xmlnsXlink="http://www.w3.org/1999/xlink" 
  stroke="#ff0000" 
  strokeWidth="0.00036"
>
  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
  <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
  <g id="SVGRepo_iconCarrier">
    <title>no-wifi-line</title>
    <path className="clr-i-outline clr-i-outline-path-1" d="M18,24.42a4,4,0,1,0,4,4A4,4,0,0,0,18,24.42Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,18,30.42Z"></path>
    <path className="clr-i-outline clr-i-outline-path-2" d="M26.21,21.85a1,1,0,0,0-.23-1.4,13.56,13.56,0,0,0-5-2.23l3.87,3.87A1,1,0,0,0,26.21,21.85Z"></path>
    <path className="clr-i-outline clr-i-outline-path-3" d="M18.05,10.72a20.88,20.88,0,0,0-4.16.43l1.74,1.74a19,19,0,0,1,2.42-.17A18.76,18.76,0,0,1,28.64,16a1,1,0,0,0,1.12-1.65A20.75,20.75,0,0,0,18.05,10.72Z"></path>
    <path className="clr-i-outline clr-i-outline-path-4" d="M33.55,8.2A28.11,28.11,0,0,0,8.11,5.36L9.69,6.93A26,26,0,0,1,32.45,9.87a1,1,0,0,0,1.1-1.67Z"></path>
    <path className="clr-i-outline clr-i-outline-path-5" d="M1.84,4.75,4.27,7.18c-.62.34-1.23.7-1.83,1.1A1,1,0,1,0,3.56,9.94C4.26,9.47,5,9,5.74,8.65l3.87,3.87A20.59,20.59,0,0,0,6.23,14.4,1,1,0,0,0,7.36,16a18.82,18.82,0,0,1,3.77-2l4.16,4.16A13.51,13.51,0,0,0,10,20.55a1,1,0,0,0,1.18,1.61A11.52,11.52,0,0,1,17,20l10.8,10.8,1.41-1.41-26-26Z"></path>
    <rect x="0" y="0" width="36" height="36" fillOpacity="0"></rect>
  </g>
</svg>

        <div className='h-[17vh] tablet:h-[25vh] laptop:h-[30vh] flex flex-col justify-around items-center '>

         
         <Text family='Jost' className="font-bold text-black text-center text-2xl tablet:text-3xl leading-7">Check your Internet Connection</Text>

         <Button 
         
         isLoading = {isLoadingValue}
         spinner={

          isLoadingValue && 
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
         
         
         size={window.innerWidth < 768  ? 'md': "lg"} variant="shadow" className="bg-[#FF0000] LM425:flex theme-primary-color text-white  " style={{boxShadow:"rgb(255, 0, 0) 0px 7px 15px -7px"}}  onClick={getRefresh}>
           {isLoadingValue ? "Checking...."  : "Try Again"} 
{/*  <LuRefreshCcw/> */}
          </Button>  
        </div>


{/* <div className=''>

</div> */}

         {/* <div className='z-[3]'>
           <div className="flex items-center justify-center h-full ">
             <div className="shadow-2xl p-6 rounded-2xl border-2 border-gray-50 bg-white">
               <div className="flex flex-col">
                 <div className='flex justify-center items-center gap-2'>
                   {isRefresh === false  ?  <MdErrorOutline className='text-[#FF0000] text-2xl'/> : <Spinner  color="primary"  size='sm'  labelColor='secondary'  /> }
                 </div>
                 <div className="my-6">
                   <div className="flex flex-row space-x-4 items-center justify-center">
                     <div id="icon">
                       <span>
                           <Button variant="shadow" className="bg-[#FF0000] LM425:flex theme-primary-color text-white" style={{boxShadow:"rgb(255, 0, 0) 0px 7px 15px -7px"}} onClick={getRefresh}>
                           Refresh <LuRefreshCcw/>
                           </Button>                    
                       </span>
                     </div>
                   </div>
                 </div>
 
               </div>
             </div>
           </div>
         </div> */}

         {/* <Spinner label="Loading..." color="primary"  size='lg'  labelColor='secondary'  /> */}
     </div>
      </>
      {/* )} */}
  
 
  </>
  )
}
