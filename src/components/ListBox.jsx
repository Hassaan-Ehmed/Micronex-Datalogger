import React from "react";
import {Listbox, ListboxItem} from "@nextui-org/react";
// import {ListboxWrapper} from "./ListboxWrapper";

export default function NextListBox() {
  const [selectedKeys, setSelectedKeys] = React.useState(new Set(["default"]));

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", "),
    [selectedKeys]
  );

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
          <ListboxItem key="default" className="text-[#0f172a] ">Default</ListboxItem>
          <ListboxItem key="red" className="text-[#0f172a]">Red</ListboxItem>
          <ListboxItem key="green" className="text-[#0f172a]">Green</ListboxItem>
          <ListboxItem key="purple" className="text-[#0f172a]">Purple</ListboxItem>
          <ListboxItem key="almond" className="text-[#0f172a]">Almond</ListboxItem>
          <ListboxItem key="light-grey" className="text-[#0f172a]">Light Grey</ListboxItem>
        </Listbox>
      </div>
      <p className="text-small text-default-500">Selected value: {selectedValue}</p>
    </div>
  );
}
