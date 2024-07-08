import React from 'react'
import { Text } from 'react-font';
// import NextProfile from './NextProfile';

function MyMiniCard({readings}) {

const MiniCard = ({title,reading,source})=> {
    return (
        <div className={`${title == "Humidity" ? 'mt-[25px]' :"mt-0" } w-[67vw] h-[23vw] bg-white  border-[#FF0000] shadow-2xl p-2 rounded-2xl flex justify-between items-center flex-col`}>

        <div className='w-full h-[30%] flex  justify-center items-center '>
            
            <img src={source} alt="icon"  className='w-[35%]  object-contain'/>
            <Text family='Jost' className={`pr-3 font-bold text-gray-600 text-center text-xl w-[37vw] flex justify-center items-center`}>{title}</Text>
        </div>     

        <div className='mt-2 flex justify-start items-center h-fit'><h5  className='font-bold text-primary text-[6vw] leading-tight'>{reading}{title == "Temperature" ? "℃" : "%"}</h5></div>
         </div>
    )
}

    return (
        <div className='z-[3] '>
          <div className="flex items-center justify-center h-full">
            <div className="shadow-2xl  p-7 rounded-2xl  border-2 border-gray-50 flex  flex-col gap-3 relative ">

            <MiniCard title={"Temperature"} source={"https://cdn3d.iconscout.com/3d/premium/thumb/thermometer-4869739-4051728.png?f=webp"} reading={readings.temperature ?? 36.89}/>              

            <MiniCard title={"Humidity"} source={"https://cdn3d.iconscout.com/3d/premium/thumb/humidity-8165662-6551904.png?f=webp"} reading={readings.humidity ?? 45.71}/>              

            </div>
          
          </div>
        </div>
     
    );
  }
  
  export default MyMiniCard;