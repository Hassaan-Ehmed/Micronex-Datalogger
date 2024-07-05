  import React from "react";
  import {CircularProgress, Card, CardBody, CardFooter, Chip} from "@nextui-org/react";
  import GaugeComponent from "react-gauge-component";
import { Text } from "react-font";

  export default function MyMeter({title,reading,fromColor,toColor}) {


    return (

      <div className='z-[3] h-full LM425:h-[180px] LM425:w-[40%] min-[650px]:w-[35%]  tablet:h-[30vw] min-[840px]:h-[28vw] min-[950px]:h-[25vw] min-[840px]:w-[37%]  min-[950px]:w-[32%] laptop:w-[30%] desktop:w-[27%] desktop:h-[21vw] laptop:h-[23.5vw]'>
        {/* h-[60%]  ---- -laptop:h-[20vw] laptop:w-[32%] */}
      
    
      <div className="flex items-center justify-center h-full ">
        <div className="shadow-2xl  rounded-2xl border-2 border-gray-50 bg-white h-full min-[950px]:h-[90%] laptop:h-[85%] tablet:w-[90%] laptop:w-[85%] relative">
        
        <div className="absolute top-2  right-3 p-1 shadow-2xl   rounded-2xl border-2 border-gray-50 bg-primary  flex justify-center items-center">
    <Text family="Jost"  className="text-[13px] tablet:text-[16px]">{title}</Text>
    
    </div> 
   
        <GaugeComponent
                
        className="h-[100%]  rounded-2xl LM425:w-[42vw] min-[540px]:w-[38vw] min-[600px]:w-[33vw] min-[670px]:w-[29vw] tablet:w-[100%] bg-white"
//         style={{ background: `linear-gradient(to bottom right, #${fromColor}, #${toColor})`}}

        // style={{width:"20vw"}}
        type="radial"
      arc={{
      
        width: 0.2,
        padding: 0.05 ,//0.005,
        cornerRadius: 6,        
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
        valueLabel: { formatTextValue: value => value + `${title === "Temperature" ? '℃' : '%'}` , style:{fontSize: `${window.innerWidth > 600   ? '25rem' : '20rem'}`,fill:"#0f172a",fontWeight:"bolder",textShadow:"none"}},
        tickLabels: {

          
          // textShadow: "black 1px 1px 0px, black 0px 0px 2.5em, black 0px 0px 0.2em"
          defaultTickValueConfig:{

            formatTextValue: value => value + `${title === "Temperature" ? '℃' : '%'}`,
            style:{fontSize: '0.6rem', fill: "#0f172a",fontWeight:"bolder"},
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

          {/* <div className="flex flex-col">
      <Card className={`w-[200px] h-[200px] tablet:w-[240px] tablet:h-[220px] border-none `} style={{ background: `linear-gradient(to bottom right, #${fromColor}, #${toColor})` }}>
      <CardBody className="justify-center items-center pb-0">
        <CircularProgress
          classNames={window.innerWidth > 768 ? {
            svg: "w-36 h-36 drop-shadow-md",
            indicator: "stroke-white",
            track: "stroke-white/10",
            value: "text-3xl font-semibold text-white",
          } :
          {
            
            svg: "w-28 h-28 drop-shadow-md",
            indicator: "stroke-white",
            track: "stroke-white/10",
            value: "text-2xl font-semibold text-white",
          }
        
        }
          // formatOptions={{style:"unit"}}
          value={reading}
          strokeWidth={4}
          showValueLabel={true}
        />
      </CardBody>
      <CardFooter className="justify-center items-center pt-0">
        <Chip
      // className="hidden tablet:block"
          classNames={{ 
            base: "border-1 border-white/30",
            content: "text-white/90 text-small font-semibold",
          }}
          variant="bordered"
        >
          {title}
        </Chip>
      </CardFooter>
    </Card>
    <div className="hidden w-full place-items-end text-right border-t-2 border-gray-100 mt-2">
              <a href="#" className="text-indigo-600 text-xs font-medium">View more</a>
            </div>
          </div> */}
        </div>
      </div>
    </div>

    );
  }
