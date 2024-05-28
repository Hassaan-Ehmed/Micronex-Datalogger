import React from "react";
import { HiOutlineSelector } from "react-icons/hi";
import {Dropdown, Link, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import { useFirebaseContext } from "../context/FirebaseApp";


export default function NextDropDown() {

    const  FirebaseContext = useFirebaseContext(); 

   const [selectedKeys, setSelectedKeys] = React.useState(new Set([FirebaseContext.slectedLineChart]));

  const selectedValue = React.useMemo(

    () => Array.from(selectedKeys).join(", ").replaceAll("_", " ") , 

    [selectedKeys]
  );


  return (
    <Dropdown  className='shadow-2xl rounded-2xl border-2 border-gray-50 bg-white z-50 mt-2'>
      <DropdownTrigger className="z-50">
        <Button 
          variant="shadow" 
          className="z-50 bg-[#FF0000] LM425:flex theme-primary-color  text-white" style={{boxShadow:"rgb(255, 0, 0) 0px 7px 15px -7px"}}
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
        className="z-50"
      >
        <DropdownItem key="Humidity"  className="z-50" onClick={()=>{FirebaseContext.setSlectedLineChart("Humidity");FirebaseContext.resetZoomChart()}}>Humidity</DropdownItem>
        <DropdownItem key="Temperature" className="z-50" onClick={()=>{FirebaseContext.setSlectedLineChart("Temperature");FirebaseContext.resetZoomChart()}}>Temperature</DropdownItem>
        
        <DropdownItem key="Both" className="z-50" onClick={()=>{FirebaseContext.setSlectedLineChart("Both");FirebaseContext.resetZoomChart()}}>Both</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
