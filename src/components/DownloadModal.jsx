import { Button } from '@nextui-org/react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFirebaseContext } from '../context/FirebaseApp';
import { getAuth, signOut } from 'firebase/auth';
import DownloadTabs from './DownloadTabs'
import ByAllDataForm from './ByAllData';
import ByDateForm from './ByDateForm';
import ByTimeForm from './ByTimeData';

const DownloadModal = () => {

    const FirebaseContext = useFirebaseContext();

      const pleaseCloseTheModal=()=>{

        FirebaseContext.closeModal("DL");
    
    }
    
      return (
        <div>
            { FirebaseContext.isDownloadModalOpen && (
                <div className="main-modal fixed w-full h-full inset-0 z-[200] overflow-hidden flex justify-center items-center animated fadeIn faster"
                    style={{ background: 'rgba(0,0,0,.7)' }}>
                    <div className=" modal-container w-11/12  max-w-md mx-auto   z-50 overflow-y-auto shadow-2xl p-2 rounded-2xl border-2 border-gray-50 bg-white">
                        <div className="modal-content py-4 text-left px-6">
                            <div className="flex justify-between items-center pb-3">
                                <p className="text-2xl font-bold">Download</p>
                                <div className="modal-close cursor-pointer z-50" onClick={pleaseCloseTheModal}>
                                    <svg className="fill-current text-black" xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                                        viewBox="0 0 18 18">
                                        <path
                                            d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z">
                                        </path>
                                    </svg>
                                </div>
                            </div>
                            <div className="my-5 flex justify-center items-center">
                              
                            <DownloadTabs/>

                            </div>  

<div className='w-full h-auto grid place-content-center pb-6 pt-4 '>


{FirebaseContext.isDownloadTabSelected  == "all-data"  ? (<ByAllDataForm/>) : FirebaseContext.isDownloadTabSelected  == "by-date"  ? (<ByDateForm/>) : FirebaseContext.isDownloadTabSelected  == "by-time"  ? (<ByTimeForm/>) : "" }

</div>


                            {/* <div className="flex justify-end pt-2 gap-4">
                             <Button  variant="light" className="LM425:flex text-[#FF0000]"  onClick={pleaseCloseTheModal}>
                                Cancel
                             </Button> */}
                           


                            {/* </div> */}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DownloadModal;
