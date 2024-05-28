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


const formatedDate=(epochTime)=>{

    // Create a new Date object from the epoch time in milliseconds
let date = new Date(epochTime * 1000); // convert seconds to mileseconds

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-indexed
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;

}

// helper functions are export here!
export { Encrypt,Decrypt, ConvertEpochTimeStamp , formatedDate};






