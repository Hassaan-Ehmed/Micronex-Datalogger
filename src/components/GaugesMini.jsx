import { Card, CardBody, CircularProgress } from '@nextui-org/react';
import React from 'react'
import { Text } from 'react-font';
import GaugeComponent from 'react-gauge-component';
// import NextProfile from './NextProfile';

function MyGaugesMini({readings}) {


const MiniGaugeCard = ({title,reading,fromColor,toColor})=> {
    return (
      // h-27
        <div className={`${title == "Humidity" ? 'mt-[25px]' :"mt-0" } w-[70vw] h-[30vw]  bg-border-none  shadow-2xl p-2 rounded-2xl flex justify-center items-center gap-1 overflow-hidden relative bg-white`} >
{/* style={{ background: `linear-gradient(to bottom right, #${fromColor}, #${toColor})`}} */}
        <div className='w-full h-[20%] flex  justify-center items-center'>
            
            {/* <img src={source} alt="icon"  className='w-[35%]  object-contain'/> */}
            <Text family='Jost' className={`left-0 absolute font-bold text-black text-center text-xl  flex justify-center items-center ml-2`}>{title}</Text>
        </div>     



        {/* <div className="shadow-2xl  rounded-2xl border-2 border-gray-50 bg-white h-full  "> */}
        
        <GaugeComponent
                
        className="h-[100%] flex justify-center  items-center  w-[60%] absolute right-0"

        type="radial"
      arc={{
      
        width: 0.2,
        padding: 0.05 ,//0.005,
        cornerRadius: 3,        
        // gradient: true,
        subArcs: [

          {
            limit: 10,
            color: "#00FF00",
            showTick: true,
            // tooltip: {
            //   style:{zIndex:"999999"},
            //   text: 'Too low temperature!'
            // },
            onClick: () => console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"),
            onMouseMove: () => console.log("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB"),
            onMouseLeave: () => console.log("CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC"),
          },
          {
            limit: 20,
            color: '#39FF00',
            showTick: true,
            // tooltip: {
            //   text: 'Low temperature!'
            // }
          },
          {
            limit: 30,
            color: '#71FF00',
            showTick: true,
            // tooltip: {
            //   text: 'OK temperature!'
            // }
          },
          {
            limit: 40,
             color: '#AAFF00',
             showTick: true,
            // tooltip: {
            //   text: 'High temperature!'
            // }
          },
          {
            limit: 50,
            color: '#E3FF00',
            showTick: true,
            // tooltip: {
            //   text: 'Too high temperature!'
            // }
          },
          {
            limit: 60,
            color: '#FFE300',
            showTick: true,
          },
          {
            limit: 70,
            color: '#FFAA00',
            showTick: true,
          },
          {
            limit: 80,
            color: '#FF7100',
            showTick: true,
          },
          {
            limit: 90,
            color: '#FF3900',
            showTick: true,
          },
          {
            limit: 100,
            color: '#FF0000',
            showTick: true,
          },
          

        ]

    
      }}
      
      pointer={{
        type:"needle",
        color: 'text-primary', //4f4f4f
        length: 1,//0.80,
        width: 20,
        elastic: true,
        animate:true,
        baseColor:"black",
      }}
      labels={{

        // ,textShadow:"black 1px 1px 0px, black 0px 0px 2.5em, black 0px 0px 0.2em"
        valueLabel: { formatTextValue: value => value + `${title === "Temperature" ? '℃' : '%'}` , style:{fontSize: '34px',fill:"black",fontWeight:"bolder",textShadow:"none"}},
        tickLabels: {

          
          // textShadow: "black 1px 1px 0px, black 0px 0px 2.5em, black 0px 0px 0.2em"
          defaultTickValueConfig:{

            formatTextValue: value => value ,
            style:{fontSize: '8px', fill: "black",fontWeight:"bolder"},
          },
          defaultTickLineConfig:{
            distanceFromArc:5,
            width:2,
            color:"white",
            length:9,

          },
          type: 'inner',
          valueConfig: { formatTextValue: value => value + 'ºC',  },
          // valueConfig: { formatTextValue: value => value + '%', fontSize: 1 },
          // ticks: [
          //   { value: 13 }, 
          //   { value: 22.5 },
          //   { value: 32 }
          // ],
        }
      }}
      


      value={reading}
      // style={{color:"black"}}
      minValue={0}
      maxValue={100}
    />

    
        {/* </div> */}
    {/* <CircularProgress
        classNames={{
          svg: "w-20 h-20 drop-shadow-md",
          indicator: "stroke-white",
          track: "stroke-white/10",
          value: "text-xl font-semibold text-white",
        }}
        value={reading}
        strokeWidth={4}
        showValueLabel={true}
      /> */}
      





        {/* <div className='mt-2 flex justify-start items-center h-fit'><h5  className='font-bold text-[#FF0000] text-[6vw] leading-tight'>{reading}{title == "Temperature" ? "℃" : "%"}</h5></div>
         */}
         </div> 
    )
}




    return (
        <div className='z-[3] '>
          <div className="flex items-center justify-center h-[90%]">
            <div className="shadow-2xl  w-[100%] p-4 rounded-2xl  border-2 border-gray-50 flex  flex-col gap-3  ">

            <MiniGaugeCard title={"Temperature"} reading={readings?.temperature ?? 36.89}  fromColor={"FF0000"} toColor={"ff6b6b"} />              

            <MiniGaugeCard title={"Humidity"} reading={readings?.humidity ?? 45.71} fromColor={"03DEFE"} toColor={"72ecff"}/>              


            </div>
          </div>
        </div>
     
    );
  }
  
  export default MyGaugesMini;