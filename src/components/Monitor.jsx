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
// import IconTabs from './IconTabs'

export default function Monitor() {

  const FirebaseContext = useFirebaseContext();

return (
    <>
    
    <div className='h-[80%] w-[100%] flex flex-col justify-center items-center z-[3]'>
     
     <Text family='Jost' className='main-text hidden LM425:block font-medium -mt-4 mb-4  text-[8vh] text-[#FF0000] z-[3]'>Data Logger</Text>    
    
            <div className='h-[10%] w-[90%]  flex justify-center items-center'>
                <Tabs/> 
            </div>

            {
                 FirebaseContext.isTabSelected == "readings"  ? (
        <>
              <div className='hidden w-full h-[90%] LM425:flex  justify-center items-center gap-[8vw] mt-5'>
    
                    <ReadingsCard source="https://cdn3d.iconscout.com/3d/premium/thumb/thermometer-4869739-4051728.png?f=webp" title={"Temperature"} readings={FirebaseContext.dataPacket?.temperature ?? 0}/>
                
                    <ReadingsCard source="https://cdn3d.iconscout.com/3d/premium/thumb/humidity-8165662-6551904.png?f=webp" title={"Humidity"} readings={FirebaseContext.dataPacket?.humidity ?? 0} />
                        
              </div>  

<div className='flex w-full h-[90%] LM425:hidden  justify-center items-center gap-[8vw] mt-5'>
    
<MyMiniCard source="https://cdn3d.iconscout.com/3d/premium/thumb/humidity-8165662-6551904.png?f=webp" title={"Humidity & Temperature"} readings={FirebaseContext?.dataPacket ?? {} } />
    
    </div> 
</>
                ) : 
                
                FirebaseContext.isTabSelected == "line-graph"  ? (
                  
                  <div className='flex flex-col w-[90%] h-[70%] bg-white justify-center items-center gap-[8vw] mt-5 shadow-2xl p-2 rounded-2xl border-2 border-gray-50 relative overflow-y-hidden'>

              <Text family='Jost' className='flex justify-between absolute top-0 text-cyan-400 text-xl font-semibold'><LineDropDown/></Text>

              {
                FirebaseContext.slectedLineChart === "Humidity" ? (

                  <LineChart chartsData={HumiditylineChartsData(FirebaseContext.dataRecords) ?? [...Array(48)]}/> 

                ) :  FirebaseContext.slectedLineChart === "Temperature" ?  (
                  <LineChart chartsData={TemperaturelineChartsData(FirebaseContext.dataRecords) ?? [...Array(48)]}/>  
                ) : <LineChart chartsData={BothlineChartsData(FirebaseContext.dataRecords) ?? [...Array(48)]}/>
              }
               
                </div>          

                        
              ) :  FirebaseContext.isTabSelected == "bar-graph"  ? (
                  
                <div className='flex flex-col w-[90%] h-[70%] bg-white justify-center items-center gap-[8vw] mt-5 shadow-2xl p-2 rounded-2xl border-2 border-gray-50 relative overflow-y-hidden'>

            <Text family='Jost' className='flex justify-between absolute top-0 text-cyan-400 text-xl font-semibold'><BarDropDown/></Text>

            {
              FirebaseContext.slectedBarChart === "Humidity" ? (

                <BarGraph chartsData={HumidityBarChartsData(FirebaseContext.dataRecords) ?? [...Array(48)]}/>
 

              ) :  FirebaseContext.slectedBarChart === "Temperature" ?  (
                <BarGraph chartsData={TemperatureBarChartsData(FirebaseContext.dataRecords) ?? [...Array(48)]}/>  
              ) : <BarGraph chartsData={BothBarChartsData(FirebaseContext.dataRecords) ?? [...Array(48)]}/>
            }
             
              </div>          

              ) :
              
                FirebaseContext.isTabSelected == "gauges"  ? (
                <>

                      <div className='hidden w-full h-[90%] LM425:flex flex-col justify-center items-center gap-[2vw] mt-5  pt-2'>
                    
                    <GaugesDropDown/>

                      <div className='flex  w-full h-[90%] justify-center  items-center gap-[8vw] '>


 {/* <div className='flex w-full h-[90%] LM425:hidden  justify-center items-center gap-[8vw] mt-5'>
    
    <MyGaugesMini readings={FirebaseContext.dataPacket}/>
    
    </div> */}
{
  FirebaseContext.slectedGauge === "Both" ? (<>

    <MyMeter  title={"Temperature"} reading={FirebaseContext.dataPacket?.temperature ?? 0} fromColor="FF0000" toColor="ff6b6b"/>
                         
    <MyMeter  title={"Humidity"} reading={FirebaseContext.dataPacket?.humidity ?? 0} fromColor="03DEFE" toColor="72ecff"/>

    
  </>) : FirebaseContext.slectedGauge === "Humidity" ? (

    <MyMeter  title={"Humidity"} reading={FirebaseContext.dataPacket?.humidity ?? 0} fromColor={"03DEFE"} toColor={"72ecff"}/>

  )  : FirebaseContext.slectedGauge === "Temperature" ? (
                           
    <MyMeter  title={"Temperature"} reading={FirebaseContext.dataPacket?.temperature ?? 0} fromColor={"FF0000"} toColor={"ff6b6b"}/>
  ) : "" 
}
                           

   </div>
                                
</div>  
        
        <div className='flex w-full h-[90%] LM425:hidden  justify-center items-center gap-[8vw] mt-5'>
            
        <MyGaugesMini title={"Humidity & Temperature"}  readings={FirebaseContext.dataPacket ?? {}} />
            
            </div> 
        </>
              ): ""        
           
            }
        
    
    </div>
   
    </>
  )
}
