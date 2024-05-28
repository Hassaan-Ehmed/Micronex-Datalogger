import React from "react";
import {Tabs, Tab} from "@nextui-org/react";
import '../App.css'
import { useFirebaseContext } from "../context/FirebaseApp";
import { ImHome } from "react-icons/im";
// bar
import { HiChartBar } from "react-icons/hi";

//line
import { FaChartLine } from "react-icons/fa";

import { FaTachometerAlt } from "react-icons/fa";


import { FaChartArea } from "react-icons/fa";



//graph
import { PiGraphFill } from "react-icons/pi";




export default function App() {
  const colors = ["default"];

const FirebaseContext = useFirebaseContext();



React.useEffect(()=>{


},[FirebaseContext.isTabSelected]);



  return (
    <div className="flex flex-wrap gap-4">
      
        <Tabs
         aria-label="Options"         
         selectedKey={FirebaseContext.isTabSelected}
         onSelectionChange={FirebaseContext.setIsTabSelected}
        radius="lg" color="primary"  >
          <Tab key="readings" title={
                              <div className="flex items-center space-x-2">
                              <ImHome/>
                              <span>Home</span>
                               </div>
                               } 
                               
            >
          </Tab>
           
           
           <Tab key="line-graph" title={(FirebaseContext.isTabSelected == "line-graph" || FirebaseContext.isTabSelected == "bar-graph") ? (
              <div className="flex items-center space-x-2">
              <FaChartLine/>
              <span>Line</span>
               </div>
           ): (
            <div className="flex items-center space-x-2">
            <FaChartArea/>
            <span>Graph</span>
             </div>
         )}>
           </Tab>

           {(FirebaseContext.isTabSelected == "line-graph" || FirebaseContext.isTabSelected == "bar-graph") && <Tab key="bar-graph" title={

              <div className="flex items-center space-x-2">
            <HiChartBar/>
                <span>Bar</span>
                </div>
           }></Tab> } 
           
           
           {(FirebaseContext.isTabSelected == "readings" || FirebaseContext.isTabSelected == "gauges") ?  <Tab key="gauges" title={

                          <div className="flex items-center space-x-2">
                          <FaTachometerAlt/>
                          <span>Gauges</span>
                          </div>
           }></Tab> : ""}  
        </Tabs>
    </div>
  );
}
