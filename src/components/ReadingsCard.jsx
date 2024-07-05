import React, { useEffect, useState } from 'react'
import { Text } from 'react-font';
import { useFirebaseContext } from '../context/FirebaseApp';

function MyProgress({source,title,readings}) {
  

//   const FirebaseContext = useFirebaseContext();


  return (
        <div className='z-[3]'>
          <div className="flex items-center justify-center h-full LM425:mt-8 tablet:mt-12 laptop:mt-[3.2rem]">
            <div className="shadow-2xl p-6  rounded-2xl border-2 border-gray-50 bg-white">
              <div className="flex flex-col">
                <div>
                  <Text family='Jost' className="font-bold text-gray-600 text-center text-2xl">{title}</Text>
                </div>
                <div className="my-6">
                  <div className="flex flex-row space-x-4 items-center">
                    <div id="icon">
                      <span>
                                              
                         <img src={source} alt={`${title} Icon`}  className='hidden tablet:block tablet:h-[20vh] LM425:w-[20vh] object-contain main-logo'/>                      
                      </span>
                    </div>
                    <div id="temp">
                      <h4 className="text-4xl text-primary">{readings}{title == "Temperature" ? "℃" : "%"}</h4>
                      {/* <p className="text-xs text-gray-500">Feels like {title == "Temperature" ? `${readings+2}℃` : `${readings+4.5}%`}</p> */}
                    </div>
                  </div>
                </div>
                <div className="hidden w-full place-items-end text-right border-t-2 border-gray-100 mt-2">
                  <a href="#" className="text-indigo-600 text-xs font-medium">View more</a>
                </div>
              </div>
            </div>
          </div>
        </div>
     
    );
  }
  
  export default MyProgress;