import { Card, CardBody, CircularProgress } from '@nextui-org/react';
import React from 'react'
import { Text } from 'react-font';
// import NextProfile from './NextProfile';

function MyGaugesMini({readings}) {


const MiniGaugeCard = ({title,reading,fromColor,toColor})=> {
    return (
        <div className={`${title == "Humidity" ? 'mt-[25px]' :"mt-0" } w-[67vw] h-[27vw] bg-border-none  shadow-2xl p-2 rounded-2xl flex justify-between items-center `} style={{ background: `linear-gradient(to bottom right, #${fromColor}, #${toColor})`}}>

        <div className='w-full h-[30%] flex  justify-center items-center '>
            
            {/* <img src={source} alt="icon"  className='w-[35%]  object-contain'/> */}
            <Text family='Jost' className={`pr-3 font-bold text-white text-center text-xl w-[37vw] flex justify-center items-center`}>{title}</Text>
        </div>     


    <CircularProgress
        classNames={{
          svg: "w-20 h-20 drop-shadow-md",
          indicator: "stroke-white",
          track: "stroke-white/10",
          value: "text-xl font-semibold text-white",
        }}
        value={reading}
        strokeWidth={4}
        showValueLabel={true}
      />


       
        {/* <div className='mt-2 flex justify-start items-center h-fit'><h5  className='font-bold text-[#FF0000] text-[6vw] leading-tight'>{reading}{title == "Temperature" ? "℃" : "%"}</h5></div>
         */}
         </div> 
    )
}




    return (
        <div className='z-[3]'>
          <div className="flex items-center justify-center h-[90%]">
            <div className="shadow-2xl shadow-[#FF0000]  p-4 rounded-2xl  border-2 border-gray-50 flex  flex-col gap-3  ">

            <MiniGaugeCard title={"Temperature"} reading={readings?.humidity ?? 0}  fromColor={"FF0000"} toColor={"ff6b6b"} />              

            <MiniGaugeCard title={"Humidity"} reading={readings?.temperature ?? 0} fromColor={"03DEFE"} toColor={"72ecff"}/>              


            </div>
          </div>
        </div>
     
    );
  }
  
  export default MyGaugesMini;