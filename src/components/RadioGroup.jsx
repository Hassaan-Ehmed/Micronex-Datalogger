import React from "react";
import {RadioGroup, Radio} from "@nextui-org/react";

export default function NextRadioGroup() {
  const [selected, setSelected] = React.useState("both");

  return (
    <div className="relative top-5 w-[60vh] shadow-2xl  rounded-2xl border-2 border-gray-50 bg-white">
      <RadioGroup
      orientation="horizontal"
      className="flex justify-center items-center gap-4"
        value={selected}
        onValueChange={setSelected}
      >
        <Radio  value="humidity" className="ml-2">Humidity</Radio>
        <Radio className="ml-2" value="temperature">Temperature</Radio>
        <Radio className="ml-2" value="both">Both</Radio>
      </RadioGroup>
    </div>
  );
}
