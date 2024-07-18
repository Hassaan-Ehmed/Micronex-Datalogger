import React from "react";
import {Listbox, ListboxItem} from "@nextui-org/react";
import { useFirebaseContext } from "../context/FirebaseApp";
// import {ListboxWrapper} from "./ListboxWrapper";

export default function NextListBox() {
  
  const FirebaseContext =   useFirebaseContext();
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([FirebaseContext.themeName]));

  const selectedValue = React.useMemo( () => {
      
      Array.from(selectedKeys).join(", ")

      FirebaseContext.setThemeName(String(selectedKeys.currentKey));

    },[selectedKeys]);
  

  /*
  
🔥Theme
        : Dark Themes

Default Navy ( bg-dark  / text-light )
Youtube Red  ( bg-dark  / text-light )
Spotify Green ( bg-dark  / text-light )
Spark Purple  ( bg-dark  / text-light )

        : Light Themes
Almond ( bg-light / text-dark )
Light Grey ( bg-light / text-dark )


  */


  return (
    <div className="flex flex-col justify-center items-center gap-2">
<div className="w-[100%] LM425:w-[80%] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-50">
        <Listbox 
          aria-label="Single selection example"
          variant="flat"
          disallowEmptySelection
          selectionMode="single"
          selectedKeys={selectedKeys}
          onSelectionChange={setSelectedKeys}
        >
          <ListboxItem key="default-dark" className="text-[#0f172a]">Default</ListboxItem>
          <ListboxItem key="red-dark" className="text-[#FF0000]">Red</ListboxItem>
          <ListboxItem key="green-dark" className="text-[#08816E]">Green</ListboxItem>
          <ListboxItem key="purple-dark" className="text-[#8308FF]">Purple</ListboxItem>
          <ListboxItem key="blue-dark" className="text-[#FFEBCD]">Blue</ListboxItem>
        </Listbox>
      </div>

      </div>
  );
}
