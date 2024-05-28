import { Button, Spinner } from '@nextui-org/react';
import React, { useEffect } from 'react'
import { Text } from 'react-font';
import { LuRefreshCcw } from "react-icons/lu";
import { MdErrorOutline } from "react-icons/md";
import { FaCircleCheck } from "react-icons/fa6";




export default function NetworkErrorScreen() {


const [isRefresh,setIsRefresh] = React.useState(false);
const [isOnline,setIsOnline] = React.useState(false);



React.useEffect(()=>{

  if(window.navigator.onLine){
    return 
  }else{
    getRefresh();
  }


},[]);

function getRefresh(){


  if(!window.navigator.onLine){

    setTimeout(()=>{

      if(window.navigator.onLine){
        
        setIsRefresh((r)=> false );
        
        setIsOnline(true);
        
        // close the modal or other online stuff doing
      }else{
        
        setIsOnline(false)
        setIsRefresh((r)=> false );
      }
      
    },5000);
    
    
    setIsOnline(false)
    setIsRefresh((r)=> true);

  }
  

}

return (
    

  <>
  
  {isOnline == false && (
         <div className='w-full h-[105%] absolute z-[500] flex justify-center items-center text-white' style={{ background: 'rgba(0,0,0,.7)' }}>
        
    

         <div className='z-[3] '>
           <div className="flex items-center justify-center h-full ">
             <div className="shadow-2xl p-6 rounded-2xl border-2 border-gray-50 bg-white">
               <div className="flex flex-col">
                 <div className='flex justify-center items-center gap-2'>
                   <Text family='Jost' className="font-bold text-gray-600 text-center text-2xl">Check your internet and try again</Text>{isRefresh === false  ?  <MdErrorOutline className='text-[#FF0000] text-2xl'/> : <Spinner  color="primary"  size='sm'  labelColor='secondary'  /> }
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
         </div>
 
         {/* <Spinner label="Loading..." color="primary"  size='lg'  labelColor='secondary'  /> */}
     </div>
      )}
  
 
  </>
  )
}
