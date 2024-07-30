import React from 'react'

import { Chip } from '@nextui-org/react'
import { getFormatedDateByTimestamp, getFormatedTimeByTimestamp } from '../utils/helper'
import { useFirebaseContext } from '../context/FirebaseApp'

const MyChip = () => {
  
    const FirebaseContext  = useFirebaseContext();
   
   const date =  getFormatedDateByTimestamp(FirebaseContext?.lastTimestamp);

//07-01-24
// const  formated_date = date?.split("-")[2].slice(0,2).join("-") + "-" + date?.split("-")[2].split("").slice(2).join("")  
//    console.log("OYEEEEE",formated_date);
   
const time =  getFormatedTimeByTimestamp(FirebaseContext?.lastTimestamp);

   let ts = `${date} / ${time}`; 


   
   return (
    <Chip
    variant="shadow"
    classNames={{
      base: `bg-gradient-to-br from-white to-pink-200 border-small border-white/50 shadow-pink-200/30`,
      content: "drop-shadow shadow-black text-primary font-bold",
    }}
    
  >
    
    {/* 070124_1230 */}
 {/* 07-01-24/12:30 */}

Last updated : {ts} 

  </Chip>
  )
}

export default MyChip
