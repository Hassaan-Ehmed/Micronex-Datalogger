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

         <div className='w-full h-[100vh] z-[500]  text-white bg-white flex flex-col laptop:flex-row justify-center gap-3 laptop:gap-5 items-center' >
        
        <img src="/images/network-error.png" alt=""  className='w-[25rem] h-[50%] tablet:w-[22rem] tablet:h-[50%] laptop:w-[30rem] laptop:h-[70%]  '/>

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
