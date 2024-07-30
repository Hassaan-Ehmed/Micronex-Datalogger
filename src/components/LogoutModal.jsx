import { Button } from '@nextui-org/react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFirebaseContext } from '../context/FirebaseApp';
import { getAuth, signOut } from 'firebase/auth';

const MyModal = () => {

    const FirebaseContext = useFirebaseContext();

    const navigate = useNavigate();

    const logoutUser=(ev)=>{

        
        try{
      
        ev.preventDefault();
              
        const auth =  getAuth();
        signOut(auth).then(()=>{
        
            
            FirebaseContext.setIsLoading(true);
            
            setTimeout(()=>{
                
                navigate("/")
                
            localStorage.removeItem("User_ID");
            localStorage.removeItem("Url_Path");
            localStorage.removeItem("theme");
            localStorage.removeItem("Realtime_Storage");

              FirebaseContext.setIsLoading(false);
              FirebaseContext.closeModal("LO");


            },1500);
            
        
        });
    
      }catch(err){
        console.log("Error when User Logout (auth)",err);
      }
      
      }
          

      const pleaseCloseTheModal=()=>{

        FirebaseContext.closeModal("LO");
    
    }
    
      return (
        <div>
            { FirebaseContext.isOpen && (
                <div className="main-modal fixed w-full h-full inset-0 z-[200] overflow-hidden flex justify-center items-center animated fadeIn faster"
                    style={{ background: 'rgba(0,0,0,.7)' }}>
                    <div className=" modal-container w-11/12  max-w-md mx-auto z-50 overflow-y-auto shadow-2xl p-2 rounded-2xl border-2 border-gray-50 bg-white">
                        <div className="modal-content py-4 text-left px-6">
                            <div className="flex justify-between items-center pb-3">
                                <p className="text-2xl font-bold text-primary">Logout</p>
                                <div className="modal-close cursor-pointer z-50" onClick={pleaseCloseTheModal}>
                                    <svg className="fill-current text-black hover:font-bold h-16 transition-transform duration-300 ease-in-out transform hover:scale-125" xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                                        viewBox="0 0 18 18">
                                        <path
                                            d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z">
                                        </path>
                                    </svg>
                                </div>
                            </div>
                            <div className="my-5">
                                <p className='text-primary'>If you want to Log Out your Account ?</p>
                            </div>
                            <div className="flex justify-end pt-2 gap-4">
                             <Button  variant="light" className="LM425:flex text-primary"  onClick={pleaseCloseTheModal}>
                                Cancel
                             </Button>
                                {/* <button className="focus:outline-none px-4 bg-teal-500 p-3 ml-3 rounded-lg text-white hover:bg-teal-400">
                                    Confirm
                                </button> */}

                                <Button id='logout-btn' variant="shadow" className="bg-primary LM425:flex  text-white shadow-lg shadow-primary" 
                                onClick={logoutUser}
                                isLoading={FirebaseContext.isLoading}
                                spinner={
                                   <svg
                                     className="animate-spin h-5 w-5 text-current"
                                     fill="none"
                                     viewBox="0 0 24 24"
                                     xmlns="http://www.w3.org/2000/svg"
                                   >
                                     <circle
                                       className="opacity-25"
                                       cx="12"
                                       cy="12"
                                       r="10"
                                       stroke="currentColor"
                                       strokeWidth="4"
                                     />
                                     <path
                                       className="opacity-75"
                                       d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                       fill="currentColor"
                                     />
                                   </svg>
                                 }
                                >
                               Confirm
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyModal;
