import { ConvertEpochTimeStamp } from "../utils/helper";

export function HumiditylineChartsData(Data_Records){
try{

    if(Array.isArray(Data_Records)){

        return( {

            labels:Data_Records?.map( (packet) =>{

               let timeArr =  packet?.timestamp.split("_")[1].split("");

               timeArr.splice(2,0,":");
               
               let TIME = timeArr.join("");

               return `${TIME}`
            //    let integerHour = +TIME.split(":")[0];

            //    if(integerHour > 12){  

                // return `${+integerHour-12}:${TIME.split(":").splice(1).join(":")} PM`
               
            // } else {
                // return `${TIME}`
            //    }


        }

                                )

            ,
            
            datasets:[
                
                {
                    fill:true,
                    label:"Humidity",
                    data:Data_Records.map( packet => packet?.humidity ),
                    borderColor:"#03DEFE",
                    // backgroundColor:"black"
                    tension:0.5,
                }
            ]
            
            })
    }else{

        return 
    }

}catch(error){
    console.log("Error in HumiditylineChartsData function()")
}


}
export function TemperaturelineChartsData(Data_Records){
try{

    if(Array.isArray(Data_Records)){

        return( {

            labels:Data_Records?.map( (packet) =>{

                let timeArr =  packet?.timestamp.split("_")[1].split("");

                timeArr.splice(2,0,":");
                
                let TIME = timeArr.join("");
 
                return `${TIME}`
            }

                                )

            ,
            
            datasets:[
                
                {
                    fill:true,
                    label:"Temperature",
                    data:Data_Records.map( packet => packet?.temperature ),
                    borderColor:"#FF0000",
                    // backgroundColor:"black"
                    tension:0.5,
                }
            ]
            
            })
    }else{

        return 
    }

}catch(error){
    console.log("Error in TemperaturelineChartsData function()")
}


}
export function BothlineChartsData(Data_Records){
try{

    if(Array.isArray(Data_Records)){

        return( {

            labels:Data_Records?.map( (packet) =>{

                let timeArr =  packet?.timestamp.split("_")[1].split("");

                timeArr.splice(2,0,":");
                
                let TIME = timeArr.join("");
 
                return `${TIME}`
            }

                                )

            ,
            
            datasets:[
                
             
                {
                    fill:true,
                    label:"Temperature",
                    data:Data_Records.map( packet => packet?.temperature ),
                    borderColor:"#FF0000",
                    // backgroundColor:"black",
                    // tension:0.5
                    
                },
        
                {
                    fill:true,
                    label:"Humidity",
                    data:Data_Records.map( packet => packet?.humidity ),
                    borderColor:"#03DEFE",
                    // backgroundColor:"black"
                    // tension:0.5,
                }
                


            ]
            
            })
    }else{

        return 
    }

}catch(error){
    console.log("Error in BothlineChartsData function()")
}


}
export function HumidityBarChartsData(Data_Records){
    try{
    
        if(Array.isArray(Data_Records)){
    
            return( {
    
                labels:Data_Records?.map( (packet) =>{
    
                    let timeArr =  packet?.timestamp.split("_")[1].split("");

                    timeArr.splice(2,0,":");
                    
                    let TIME = timeArr.join("");
     
                    return `${TIME}`
                }
    
                                    )
    
                ,
                
                datasets:[
                    
                    {
                        label:"Humidity",
                        data:Data_Records.map( packet => packet?.humidity ),
                        borderColor:"#03DEFE",
                        borderWidth:1,
                        borderRadius:2,
                        backgroundColor:"#03DEFE"
                        // fill:true,
                        // tension:0.5,
                    }
                ]
                
                })
        }else{
    
            return 
        }
    
    }catch(error){
        console.log("Error in HumidityBarChartsData function()")
    }
    
    
 }
export function TemperatureBarChartsData(Data_Records){
    try{
    
        if(Array.isArray(Data_Records)){
    
            return( {
    
                labels:Data_Records?.map( (packet) =>{

                    let timeArr =  packet?.timestamp.split("_")[1].split("");

                    timeArr.splice(2,0,":");
                    
                    let TIME = timeArr.join("");
     
                    return `${TIME}`
                }
    
                                    )
    
                ,
                
                datasets:[
                    
                    {
                        label:"Temperature",
                        data:Data_Records.map( packet => packet?.temperature ),
                        borderColor:"#FF0000",
                        borderWidth:1,
                        borderRadius:2,
                        backgroundColor:"#FF0000"
                        // fill:true,
                        // tension:0.5,
                    }
                ]
                
                })
        }else{
    
            return 
        }
    
    }catch(error){
        console.log("Error in TemperatureBarChartsData function()")
    }
    
    
 }
export function BothBarChartsData(Data_Records){
    try{
    
        if(Array.isArray(Data_Records)){
    
            return( {
    
                labels:Data_Records?.map( (packet) =>{
    
            let timeArr =  packet?.timestamp.split("_")[1].split("");

               timeArr.splice(2,0,":");
               
               let TIME = timeArr.join("");

               return `${TIME}`
                }
    
                                    )
    
                ,
                
                datasets:[
                    
                    {
                        label:"Temperature",
                        data:Data_Records.map( packet => packet?.temperature ),
                        borderColor:"#FF0000",
                        borderWidth:1,
                        borderRadius:2,
                        backgroundColor:"#FF0000"
                        // fill:true,
                        // tension:0.5,
                    },
                    
                    {
                        label:"Humidity",
                        data:Data_Records.map( packet => packet?.humidity ),
                        borderColor:"#03DEFE",
                        borderWidth:1,
                        borderRadius:2,
                        backgroundColor:"#03DEFE"
                        // fill:true,
                        // tension:0.5,
                    }
                ]
                
                })
        }else{
    
            return 
        }
    
    }catch(error){
        console.log("Error in BothBarChartsData function()")
    }
    
    
 }

