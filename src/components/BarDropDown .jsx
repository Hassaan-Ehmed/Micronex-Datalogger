import React from "react";
import { HiOutlineSelector } from "react-icons/hi";
import {Dropdown, Link, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import { useFirebaseContext } from "../context/FirebaseApp";


export default function NextDropDown() {

    const  FirebaseContext = useFirebaseContext(); 

    const [selectedKeys, setSelectedKeys] = React.useState(new Set([FirebaseContext.slectedBarChart]));

  const selectedValue = React.useMemo(

    () => Array.from(selectedKeys).join(", ").replaceAll("_", " ") , 

    [selectedKeys]
  );


  return (
    <Dropdown  className='shadow-2xl rounded-2xl border-2 border-gray-50 bg-secondary z-50 mb-5'>
      <DropdownTrigger className="z-50">
        <Button 
          variant="shadow" 
          // className="capitalize"
          className="z-50 bg-primary LM425:flex  text-foreground shadow-lg shadow-primary" 
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
        <DropdownItem key="Humidity"  className="z-50 dropdown" onClick={()=>{FirebaseContext.setSlectedBarChart("Humidity")}}>Humidity</DropdownItem>
        <DropdownItem key="Temperature" className="z-50 dropdown" onClick={()=>{FirebaseContext.setSlectedBarChart("Temperature")}}>Temperature</DropdownItem>

        <DropdownItem key="Both" className="z-50 dropdown" onClick={()=>{FirebaseContext.setSlectedBarChart("Both")}}>Both</DropdownItem>

{/* 
        <DropdownItem key="Humidity"  className="z-50" onClick={()=>{FirebaseContext.setSlectedGauge("Humidity")}}>Humidity</DropdownItem>
        <DropdownItem key="Temperature" className="z-50" onClick={()=>{FirebaseContext.setSlectedGauge("Temperature")}}>Temperature</DropdownItem>

        <DropdownItem key="Both" className="z-50" onClick={()=>{FirebaseContext.setSlectedGauge("Both")}}>Both</DropdownItem> */}
      </DropdownMenu>
    </Dropdown>
  );
}
