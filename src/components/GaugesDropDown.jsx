import React from "react";
import { HiOutlineSelector } from "react-icons/hi";
import {Dropdown, Link, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import { useFirebaseContext } from "../context/FirebaseApp";


export default function NextDropDown() {

    const  FirebaseContext = useFirebaseContext(); 

   const [selectedKeys, setSelectedKeys] = React.useState(new Set([FirebaseContext.slectedGauge]));

  const selectedValue = React.useMemo(

    () => Array.from(selectedKeys).join(", ").replaceAll("_", " ") , 

    [selectedKeys]
  );


  return (
    <Dropdown  className='shadow-2xl rounded-2xl border-2 border-gray-50 bg-secondary z-50'>
      <DropdownTrigger className="z-50">
        <Button 
          variant="shadow" 
          // className="capitalize"
          className="z-50 bg-primary LM425:flex  text-foreground shadow-sm shadow-foreground" 
        >
          {selectedValue}<HiOutlineSelector className='text-xl z-50'/>
        </Button>
      </DropdownTrigger>
      <DropdownMenu 
        aria-label="Single selection example"
        variant="faded"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
        className="z-50 bg-secondary"
      >
        <DropdownItem key="Humidity"  className="z-50" onClick={()=>{FirebaseContext.setSlectedGauge("Humidity");FirebaseContext.resetZoomChart()}}>Humidity</DropdownItem>
        <DropdownItem key="Temperature" className="z-50" onClick={()=>{FirebaseContext.setSlectedGauge("Temperature");FirebaseContext.resetZoomChart()}}>Temperature</DropdownItem>
        
        <DropdownItem key="Both" className="z-50" onClick={()=>{FirebaseContext.setSlectedGauge("Both");FirebaseContext.resetZoomChart()}}>Both</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
