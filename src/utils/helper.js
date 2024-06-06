import CryptoJS from "crypto-js";
import moment from "moment/moment";
import { toast } from "react-toastify";
const SECRET_KEY  = "`Bhp5lMb5$eggiqK`@I+";


const Encrypt  = word => {

    return CryptoJS.AES.encrypt(word,SECRET_KEY).toString();

}

const Decrypt = word => {
    return CryptoJS.AES.decrypt(word,SECRET_KEY).toString(CryptoJS.enc.Utf8);
}

const ConvertEpochTimeStamp=(Epoch_Time)=>{

    const epochTime = +Epoch_Time;

    // Create a new Date object from the epoch time in milliseconds
let date = new Date(epochTime * 1000); // convert seconds to mileseconds



// Format the date using various methods 
const year = date.getFullYear();
const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-indexed
const day = String(date.getDate()).padStart(2, '0');
const hours = String(date.getHours()).padStart(2, '0');
const minutes = String(date.getMinutes()).padStart(2, '0');
const seconds = String(date.getSeconds()).padStart(2, '0');

// const readableDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

const readableTime = `${hours}:${minutes}:${seconds}`;

return readableTime;

}


const formatedDate=(timestamp)=>{
    
    // timestamp -> "010624_HHMM"

    // date elements [0,1,0,6,24];
    let dateArr = timestamp.split("_")[0].split(""); 
    let day = dateArr.slice(0,2).join("");
    let month = dateArr.slice(2,4).join("");
    let year = dateArr.slice(4).join("");


    // console.log(typeof year,month,day);
    return `20${year}-${month}-${day}`;

}

const dateToEpochTime=(date)=>{

    // Array Destructuring on date string "2024-05-19"
const [year,month,day] = date.split("-");

// create new instance of Date Obj where i pass year month day (month is indexed based)
// so normalize that i subtract 1 to ensure it's indexed based now

const dateObj = new Date(year, month - 1, day);

// date obj with my date i get miliseconds
const epochTimeMS = dateObj.getTime();

// to convert mileseconds to seconds 

const epochTime = Math.floor(epochTimeMS / 1000)

// console.log("Helloooooooo",epochTime)
return `${epochTime}`;

}

const timeFormatedArray = (timesArray)=>{

    let formatedTimesArrayPacket = [];
    
    // 070124_0000 = timesArray each index contain
    timesArray.map((packet)=>{

        let TA = packet.split("_")[1].split(""); // ["0","0","0","0"]

        TA.splice(2,0,":"); // add colon into 3rd element (["0","0",":","0","0"])

    
        formatedTimesArrayPacket.push(TA.join("")) // after with the help of join method i join string and push into seperaate array

    });


    return formatedTimesArrayPacket;
}


function getFormatedDateByTimestamp( timestamp ){

    let dateArr = timestamp.toString().split("_")[0].split("") // ['0','7','0','1','2','4'];
    const day = dateArr.slice(0,2).join(""); //07
    const month =  dateArr.slice(2,4).join(""); //01
    const year = `${20}${dateArr.slice(4).join("")}`; //20+24 = 2024
    
    const readyString =  `${day}-${month}-${year}`; // 07-01-2024
    
    return readyString;
    
    }
    
    
    
function getFormatedTimeByTimestamp( timestamp ){
    
    let timeArr = timestamp.toString().split("_")[1].split("") // ['0','0','0','0'];
    const hour = timeArr.slice(0,2).join(""); //"HH"
    const min =  timeArr.slice(2).join(""); //"MM"
    
    const readyString =  `${hour}:${min}`; // HH:MM
    
    return readyString;
    
    }
    
// helper functions are export here!
export { Encrypt,Decrypt, ConvertEpochTimeStamp , formatedDate,dateToEpochTime,timeFormatedArray,getFormatedDateByTimestamp,getFormatedTimeByTimestamp};






