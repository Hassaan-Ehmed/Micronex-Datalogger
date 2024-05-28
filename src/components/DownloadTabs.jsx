import React from "react";
import {Tabs, Tab} from "@nextui-org/react";
import '../App.css'
import { useFirebaseContext } from "../context/FirebaseApp";

import { MdOutlineAccessTimeFilled } from "react-icons/md";


import { FaRegCalendarAlt } from "react-icons/fa";

import { FaDatabase } from "react-icons/fa";

export default function App() {
  const colors = ["default"];

const FirebaseContext = useFirebaseContext();



// React.useEffect(()=>{
// },[FirebaseContext.isDownloadTabSelected]);



  return (
    <div className="flex flex-wrap gap-4">



        <Tabs
         aria-label="Options"         
         selectedKey={FirebaseContext?.isDownloadTabSelected}
         onSelectionChange={FirebaseContext?.setIsDownloadTabSelected}
        radius="lg" color="primary"
          >


        <Tab
         key="all-data"
          title={<div className="flex items-center space-x-2">
                  <FaDatabase/>
                    <span>All Data</span>
                  </div>}
          ></Tab> 


           <Tab 
           key="by-time"
            title={<div
                    className="flex items-center space-x-2">
                  <MdOutlineAccessTimeFilled className="text-xl"/>
                    <span>By Time</span>
                    </div>
                  }>
           </Tab>

          <Tab 
            key="by-date"
             title={<div
              className="flex items-center space-x-2"
              >               
              <FaRegCalendarAlt/>
              <span>By Date</span>
                    </div>
                   }                      
            >
          </Tab>
           
           

        </Tabs>
    </div>
  );
}
