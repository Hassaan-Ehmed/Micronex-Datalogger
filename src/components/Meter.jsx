import React from "react";
import {CircularProgress, Card, CardBody, CardFooter, Chip} from "@nextui-org/react";

export default function MyMeter({title,reading,fromColor,toColor}) {


  console.log("reading::::",reading);
  return (

    <div className='z-[3]'>
    <div className="flex items-center justify-center h-[90%]">
      {/* <div className="shadow-2xl  rounded-2xl border-2 border-gray-50 bg-white p-2"> */}
        <div className="flex flex-col">
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
        </div>
      {/* </div> */}
    </div>
  </div>




    
  );
}
