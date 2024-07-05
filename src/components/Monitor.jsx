import React, { useEffect, useReducer, useState } from 'react'
import { Text } from 'react-font'
import ReadingsCard from './ReadingsCard'
import Tabs from './Tabs'
import GraphTabs from './GraphTabs'
import { useFirebaseContext } from '../context/FirebaseApp'
import MyMiniCard from './ReadingMini'
import LineChart from './LineChart'
import { getDatabase, onValue, ref } from 'firebase/database'
import LineDropDown from './LineDropDown'
import BarDropDown from './BarDropDown '
import GaugesDropDown from './GaugesDropDown'
import { BothBarChartsData, BothlineChartsData, HumidityBarChartsData, HumiditylineChartsData, TemperatureBarChartsData, TemperaturelineChartsData } from '../data/DUMMY_DATA'
// import Gauges from './Gauges'
import { Tab } from '@nextui-org/react'
import MyMeter from './Meter'
import RadioGroup from './RadioGroup'
import NextRadioGroup from './RadioGroup'
import MyGaugesMini from './GaugesMini'
import BarGraph from './BarGraph'
import MyChip from './Chip'
// import IconTabs from './IconTabs'

export default function Monitor() {

  const FirebaseContext = useFirebaseContext();

return (
    <>
    
    <div className='h-[80%] w-[100%] flex flex-col justify-center items-center z-[3]'>
     
     <Text family='Jost' className='main-text hidden LM425:block font-medium -mt-4 mb-9  text-[8vh] text-foreground z-[3] ' style={{}}>Data Logger</Text>    
    
    {/* textShadow:"white 1px 1px 0px, white 0px 0px 2.5em, white 0px 0px 0.2em" */}
    {/* h-10% */}
            <div className='h-[5%] w-[90%]  flex justify-center items-center  relative'>
  {/* {((FirebaseContext.isTabSelected == "readings") || (FirebaseContext.isTabSelected == "gauges")) &&                */}
                <Tabs/> 
            </div>

            {
              FirebaseContext.isTabSelected == "readings"  ? (
                <>  
              <div className='hidden w-full h-[90%] LM425:flex  justify-center items-center gap-[8vw] relative'>
    
      
                    <ReadingsCard source="https://cdn3d.iconscout.com/3d/premium/thumb/thermometer-4869739-4051728.png?f=webp" title={"Temperature"} readings={FirebaseContext.dataPacket?.temperature ?? 36.89}/>
                
                    <ReadingsCard source="https://cdn3d.iconscout.com/3d/premium/thumb/humidity-8165662-6551904.png?f=webp" title={"Humidity"} readings={FirebaseContext.dataPacket?.humidity ?? 45.71} />
                        
<div className='absolute -bottom-[40px]'><MyChip/></div>

                    {/* {((FirebaseContext.isTabSelected == "readings") || (FirebaseContext.isTabSelected == "gauges")) && (<div className='hidden LM425:block absolute bottom-14 top-2'><MyChip/></div>)} */}
              
              </div>  


{/* h-90 */}
<div className='flex w-full h-[85%] LM425:hidden justify-center items-center flex-col gap-6'>
    
<MyMiniCard source="https://cdn3d.iconscout.com/3d/premium/thumb/humidity-8165662-6551904.png?f=webp" title={"Humidity & Temperature"} readings={FirebaseContext?.dataPacket ?? {} } />
  
  {/*  absolute bottom-[0.5rem] */}
  <div className='LM425:hidden -pt-2'><MyChip/></div>
    
    </div> 
</>
                ) : 
                
                FirebaseContext.isTabSelected == "line-graph"  ? (
                  
                                                                     // h-75
                  <div className='flex flex-col w-[100%] laptop:w-[90%] h-[65%] laptop:h-[70%] bg-white justify-center items-center gap-[8vw] mt-14 laptop:mt-10 shadow-2xl p-2 rounded-2xl border-2 border-gray-50 relative '>
                    {/* overflow-y-hidden */}

              <Text family='Jost' className='flex justify-between absolute top-0 text-cyan-400 text-xl font-semibold'><LineDropDown/></Text>

              {
                FirebaseContext.slectedLineChart === "Humidity" ? (
                  
                  <LineChart chartsData={HumiditylineChartsData(FirebaseContext.dataRecords) ?? [...Array(48)]}/> 
                  
                  ) :  FirebaseContext.slectedLineChart === "Temperature" ?  (
                    <LineChart chartsData={TemperaturelineChartsData(FirebaseContext.dataRecords) ?? [...Array(48)]}/>  
                    ) : <LineChart chartsData={BothlineChartsData(FirebaseContext.dataRecords) ?? [...Array(48)]}/>
                    }
               
<div className='absolute -bottom-[40px]'><MyChip/></div>
                </div>          

                        
              ) :  FirebaseContext.isTabSelected == "bar-graph"  ? (
                                                                      // h-75
                <div className='flex flex-col w-[100%] laptop:w-[90%] h-[65%] laptop:h-[70%] bg-white justify-center items-center gap-[8vw] mt-14 laptop:mt-10   shadow-2xl p-2 rounded-2xl border-2 border-gray-50 relative '>
                  {/* overflow-y-hidden */}

            <Text family='Jost' className='flex justify-between absolute top-0 text-cyan-400 text-xl font-semibold'><BarDropDown/></Text>

            {
              FirebaseContext.slectedBarChart === "Humidity" ? (

                <BarGraph chartsData={HumidityBarChartsData(FirebaseContext.dataRecords) ?? [...Array(48)]}/>
 

              ) :  FirebaseContext.slectedBarChart === "Temperature" ?  (
                <BarGraph chartsData={TemperatureBarChartsData(FirebaseContext.dataRecords) ?? [...Array(48)]}/>  
              ) : <BarGraph chartsData={BothBarChartsData(FirebaseContext.dataRecords) ?? [...Array(48)]}/>
            }


<div className='absolute -bottom-[40px]'><MyChip/></div>
             
              </div>          

              ) :
              
                FirebaseContext.isTabSelected == "gauges"  ? (
                <>

                      <div className='hidden w-full h-[90%] LM425:flex flex-col justify-center items-center gap-[2vw] mt-5  pt-2'>
                    
                    <GaugesDropDown/>


                      <div className='flex -mt-2 w-full h-[90%] justify-center  items-center gap-[8vw] relative '>

                      {/* {((FirebaseContext.isTabSelected == "readings") || (FirebaseContext.isTabSelected == "gauges")) && (<div className='hidden LM425:block absolute bottom-14 top-2'><MyChip/></div>)} */}

 {/* <div className='flex w-full h-[90%] LM425:hidden  justify-center items-center gap-[8vw] mt-5'>
    
    <MyGaugesMini readings={FirebaseContext.dataPacket}/>
    
    </div> */}
{
  FirebaseContext.slectedGauge === "Both" ? (<>

    <MyMeter  title={"Temperature"} reading={FirebaseContext.dataPacket?.temperature ?? 36.89} fromColor="FF0000" toColor="ff6b6b"/>
                         
    <MyMeter  title={"Humidity"} reading={FirebaseContext.dataPacket?.humidity ?? 45.71} fromColor="03DEFE" toColor="72ecff"/>

    
  </>) : FirebaseContext.slectedGauge === "Humidity" ? (

    <MyMeter  title={"Humidity"} reading={FirebaseContext.dataPacket?.humidity ?? 45.71} fromColor={"03DEFE"} toColor={"72ecff"}/>

  )  : FirebaseContext.slectedGauge === "Temperature" ? (
                           
    <MyMeter  title={"Temperature"} reading={FirebaseContext.dataPacket?.temperature ?? 36.89} fromColor={"FF0000"} toColor={"ff6b6b"}/>
  ) : "" 
}

<div className='absolute -bottom-[28px]  tablet:-bottom-[27px] min-[850px]:-bottom-[28px] laptop:-bottom-[23px] desktop:-bottom-[19px]'><MyChip/></div>

                           
   </div>
                                
</div>  
        
        <div className='flex w-full h-[78%] LM425:hidden  justify-center items-center flex-col gap-6  mt-8'>
            
        <MyGaugesMini title={"Humidity & Temperature"}  readings={FirebaseContext.dataPacket ?? {}} />
            

        <div className='LM425:hidden -pt-2'><MyChip/></div>
            </div> 
        </>
              ): ""        
           
            }
        
    
    </div>
   
    </>
  )
}
