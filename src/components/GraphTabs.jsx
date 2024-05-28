import React from "react";
import {Tabs, Tab} from "@nextui-org/react";
import '../App.css'
import { useFirebaseContext } from "../context/FirebaseApp";
export default function App() {

const FirebaseContext = useFirebaseContext();

// React.useEffect(()=>{


//   if(FirebaseContext.isGraphTabSelected === ""){
  
//   }
    
  
//   },[FirebaseContext.isGraphTabSelected])


  return (
    <div className="flex flex-wrap gap-4">
      
        <Tabs
         aria-label="Options"         
         selectedKey={FirebaseContext.isGraphTabSelected}
         onSelectionChange={FirebaseContext.setIsGraphTabSelected}
        radius="lg" color="primary"  >
          <Tab key="readings" title="Home" >
          </Tab>
          <Tab key="line-graph" title="Line Graph">
           </Tab>
            <Tab key="bar-graph" title="Bar Graph">
            </Tab>
        </Tabs>
    </div>
  );
}
