import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import React, { createContext, useContext, useRef, useState } from 'react';
import { getFormatedDateByTimestamp, getFormatedTimeByTimestamp } from '../utils/helper';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable'; // Import jsPDF autoTable plugin


    export const firebaseConfig = {
      apiKey: "AIzaSyDhKjL0gWRz5Vy4ibMDFJAT0b72AfF5EkE",
      authDomain: "micronex-datalogger-77671.firebaseapp.com",
      databaseURL: "https://micronex-datalogger-77671-default-rtdb.firebaseio.com",
      projectId: "micronex-datalogger-77671",
      storageBucket: "micronex-datalogger-77671.appspot.com",
      messagingSenderId: "35918317319",
      appId: "1:35918317319:web:aa2a2210ea32ec897fa7a2",
      databaseURL:"https://micronex-datalogger-77671-default-rtdb.firebaseio.com/"
    };


export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
export const DB = getDatabase(firebaseApp);
const FirebaseContext = createContext(null);
export const useFirebaseContext = ()=> useContext(FirebaseContext);


export const FirebaseProvider=(props)=>{

  const [isTabSelected,setIsTabSelected] = useState("readings");
  const [isGraphTabSelected,setIsGraphTabSelected] = useState("line-graph");
  const [isDownloadTabSelected,setIsDownloadTabSelected] = useState("by-date");
  
  const [data,setData] = useState({});

  const [dataPacket,setDataPacket] = useState({});
  const [dataRecords,setDataRecords] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isFullScreenModalOpen, setIsFullScreenModalOpen] = useState(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [minMaxIcon,setMinMaxIcon] = useState("max");
  const [isLoading,setIsLoading] = useState(false);
  const [dateDurationLoading,setDateDurationLoading] = useState(false);
  const [timeDurationLoading,setTimeDurationLoading] = useState(false);
  const [allDataLoading,setAllDataLoading] = useState(false);
  const [isUserActive,setIsUserActive] = useState(false);
  const [slectedLineChart,setSlectedLineChart] = useState("Humidity");
  const [slectedBarChart,setSlectedBarChart] = useState("Humidity");
  const [slectedGauge,setSlectedGauge] = useState("Both");
  const [isDataLoaded,setIsDataLoaded] = useState(false);
  const [isUserAdmin,setIsUserAdmin] = useState(false);
  const [dateLimits,setDateLimits] = useState({
    minimumDate : "",
    maximumDate : ""
  });
  const [timesArr,setTimesArr] = useState([]); 

  const lineChartRef = useRef(null);
  const barChartRef = useRef(null);
  
// Mini Callbacks

const openModal = (isFor) => {

  if(isFor === "LO"){
    
    setIsOpen(true);

  }else if (isFor === "FS"){

    setIsFullScreenModalOpen(true);
  }
  else if (isFor === "DL"){

    setIsDownloadModalOpen(true);
  }

};
const closeModal = (isFor) => {

  if(isFor === "LO"){
    
    setIsOpen(false);

  }else if (isFor === "FS"){

    setIsFullScreenModalOpen(false);
  }else if (isFor === "DL"){

    setIsDownloadModalOpen(false);
  }

};

// 🔥 Chart Zooming Functionalies!!

// const initalZoomLineChart=()=>{

//   if(lineChartRef && lineChartRef.current){

//  lineChartRef.current.zoom(0);
//  lineChartRef.current.zoom(1.8);
    
//   }
// }
const resetZoomChart=()=>{

  if(lineChartRef && lineChartRef.current){

    lineChartRef.current.resetZoom();
  }else{
    console.log("Oops Error occured while reseting zoom!")
  }
}

// 🔥 Maximize / Minimize Fucntions!!

const fullScreenMode=()=>{

try{
  if(document.documentElement.requestFullscreen){
    document.documentElement.requestFullscreen();
  }
  else if( document.documentElement.mozRequestFullScreen ){ // Firefox

    document.documentElement.mozRequestFullScreen();

  }else if (document.documentElement.webkitRequestFullscreen){ // Chrome

    document.documentElement.webkitRequestFullscreen();
  }else if ( document.documentElement.msRequestFullscreen ){ // IE/Edge

    document.documentElement.msRequestFullscreen();

  }


  document.addEventListener('fullscreenchange',()=>{
    
    if(document.fullscreenElement){

      console.log('Fullscreen mode activated.');
    }else{
      console.log('Fullscreen mode deactivated.');

    }
      })

      closeModal("FS");

 }catch(error){
      console.log("Error in FullScreen Mode function()",error);
}

}

const exitFullScreen=()=>{
  try{

    if(document.exitFullscreen){
    
      document.exitFullscreen();

    }else if(document.mozCancelFullScreen){

      document.mozCancelFullScreen()
    
    }else if(document.webkitExitFullscreen){

      document.webkitExitFullscreen();
    
    }else if(document.msExitFullscreen){

      document.msExitFullscreen();
    }
  } catch(error){
    console.log("Error while Exiting Full Screen ",error);
  }
}

const toggleMinMaxIcon = ()=>{
  
  if(document.fullscreenElement){
  
  setMinMaxIcon("min");
  
}else{
  
    setMinMaxIcon("max");
  
  }


}


//🔥 Download Data Logs file!!

// Formated Log
function formateTextDataLogs(data){

  let logs = '';
  
  logs  = '⫷ Humidity and Temperature Data Logs ⫸\n\n\n\nDate\t\t\tTime\t\tHumidity\t\tTemperature\n\n';

  for(const key in data){
    
    if(data.hasOwnProperty(key)){

      ///Grab each object/record/packet
      const record = data[key];

    // collect in logs variable using assignment op    
      logs += `${getFormatedDateByTimestamp(record?.timestamp)}\t\t${getFormatedTimeByTimestamp(record?.timestamp)}\t\t${record.humidity}%\t\t${record.temperature}°C\n`;
    }
  }

  return logs

}

// Data Formation for Excel File
function formateExcelDataLogs(data){

  let logs = '';
  
  logs  = 'Humidity, and, Temperature, Data, Logs, \n\n\n\nDate,Time,Humidity,Temperature\n\n';

  for(const key in data){
    
    if(data.hasOwnProperty(key)){

      ///Grab each object/record/packet
      const record = data[key];

    // collect in logs variable using assignment op    
      // logs += `${getFormatedDateByTimestamp(record?.timestamp)}\t\t${getFormatedTimeByTimestamp(record?.timestamp)}\t\t${record.humidity}%\t\t${record.temperature}°C\n`;
      logs += `${getFormatedDateByTimestamp(record?.timestamp)},${getFormatedTimeByTimestamp(record?.timestamp)},${record.humidity},${record.temperature}\n`;
    }
  }

  return logs

}

// Data Formation for Text File
// function formatDataLogsToPDF(data) {
//   // const { jsPDF } = window.jspdf;
//   const doc = new jsPDF();

//   doc.setFontSize(12);
//   doc.text('Humidity and Temperature Data Logs', 14, 22);
//   doc.setFontSize(10);
//   doc.text('Date', 14, 32);
//   doc.text('Time', 44, 32);
//   doc.text('Humidity', 74, 32);
//   doc.text('Temperature', 104, 32);

//   let y = 40;
//   data.forEach(record => {
//     doc.text(getFormattedDate(record.timestamp), 14, y);
//     doc.text(getFormattedTime(record.timestamp), 44, y);
//     doc.text(`${record.humidity}%`, 74, y);
//     doc.text(`${record.temperature}°C`, 104, y);
//     y += 10;
//   });

//   return doc;
// }

// Data Formation for PDF File


//File Download logic
function  downloadFile(content,fileName){

// create a Blob Object to store raw data , MIME type/propBag 

let blob ;

if(fileName.split(".")[1] == "txt"){
  
  blob = new Blob([content],{type:'text/plain'});
  
}
else if(fileName.split(".")[1] == "csv"){
  
  blob = new Blob([content],{type:'text/csv;charset=utf-8;'});
  
}else{

  blob = new Blob([content],{type:'text/plain'});
}


  // create temporary link `

    const link = document.createElement('a');
  
    //i assign href attr in anchor tag and the value of attr is path/url of a raw data/file
    //this path is created by below function 
    link.href = URL.createObjectURL(blob);

    // next i add download attr to anchor to tell him 
    // this is downloadable link not for navigate also we gave him a downloadable file's name 
    link.download = fileName;

// Programmatically trigger the click on the link      
// without user interactions this simulates the mouse click
  link.click();
  
  // clean up function to remove temporary href link
  // that we were created before cause of memory leaks
  // because we don't need those link after downloading file
  URL.revokeObjectURL(link.href);


  return true;
}

//PDF File Download Function

  const DownloadPDFFile = (data) => {
    const doc = new jsPDF();

    // Add title
    doc.setFontSize(18);
    doc.text('Humidity and Temperature Data Logs', 14, 20);

    // Define the columns and rows for the table
    const columns = [
      { header: 'Date', dataKey: 'date' },
      { header: 'Time', dataKey: 'time' },
      { header: 'Humidity', dataKey: 'humidity' },
      { header: 'Temperature', dataKey: 'temperature' },
    ];

    const rows = data?.map((record) => ({
      date: getFormatedDateByTimestamp(record?.timestamp),
      time: getFormatedTimeByTimestamp(record?.timestamp),
      humidity: `${record?.humidity}%`,
      temperature: `${record?.temperature}°C`,
    }));

    // Add the table to the document
    doc.autoTable({
      columns: columns,
      body: rows,
      startY: 30, // start the table below the title
    });

    // Save the PDF
    doc.save('humidity_temperature_data.pdf');

    return true;
  };

function executeDownloadProcess(file_format, data){

  if(!file_format) file_format = "Text format";

  
  let logs;

  if(file_format == "Text format"){
    
    logs = formateTextDataLogs(data);

  }else if(file_format == "Excel format"){
    
    logs = formateExcelDataLogs(data);
    
    }   



  if(file_format == "Text format"){
              
         const isFileDownloaded =  downloadFile(logs,'micronex_data_logs.txt');
            
         return isFileDownloaded 
        
        }else if(file_format == "Excel format"){

          const isFileDownloaded = downloadFile(logs,'micronex_data_logs.csv');

          return isFileDownloaded
 
          
        }
        else if(file_format == "PDF format"){

          const isFileDownloaded = DownloadPDFFile(data);

          return isFileDownloaded
 
          
        }
}

//Login logic in Form.jsx
//Logout Logic in Home.jsx


// console.log("..........................",data_packet);

return <FirebaseContext.Provider value={{setIsTabSelected,isTabSelected,data,setData,setIsOpen,isOpen,setIsLoading,isLoading,allDataLoading,setAllDataLoading,dateDurationLoading,setDateDurationLoading,timeDurationLoading,setTimeDurationLoading,closeModal,openModal,resetZoomChart,lineChartRef,barChartRef,setSlectedLineChart,slectedLineChart,setSlectedBarChart,slectedBarChart,setDataPacket,dataPacket,fullScreenMode,setIsFullScreenModalOpen,isFullScreenModalOpen,exitFullScreen,setMinMaxIcon,minMaxIcon,toggleMinMaxIcon,setDataRecords,dataRecords,setSlectedGauge,slectedGauge,setIsGraphTabSelected,isGraphTabSelected,setIsUserActive,isUserActive,setIsUserAdmin,isUserAdmin,setIsDownloadModalOpen,isDownloadModalOpen,setIsDownloadTabSelected,isDownloadTabSelected,formateTextDataLogs,formateExcelDataLogs,downloadFile,executeDownloadProcess,setIsDataLoaded,isDataLoaded,setDateLimits,dateLimits,setTimesArr,timesArr}}>
  {props.children}
</FirebaseContext.Provider>

}
