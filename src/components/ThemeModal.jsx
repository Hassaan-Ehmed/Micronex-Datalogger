import { Button } from "@nextui-org/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFirebaseContext ,firestore} from "../context/FirebaseApp";
import { getAuth, signOut } from "firebase/auth";
import ListBox from "./ListBox";
import NextListBox from "./ListBox";
import {doc, updateDoc} from 'firebase/firestore'
import { Bounce, toast } from "react-toastify";



const ThemeModal = () => {
  const FirebaseContext = useFirebaseContext();


  const navigate = useNavigate();

  const logoutUser = (ev) => {
    try {
      ev.preventDefault();

      const auth = getAuth();
      signOut(auth).then(() => {
        FirebaseContext.setIsLoading(true);

        setTimeout(() => {
          navigate("/");

          localStorage.removeItem("User_ID");
          FirebaseContext.setIsLoading(false);
          FirebaseContext.closeModal("CT");
        }, 1500);
      });
    } catch (err) {
      console.log("Error when User Logout (auth)", err);
    }
  };

  const pleaseCloseTheModal = () => {
    FirebaseContext.closeModal("CT");
  };

  const SettingThemeInLS = async ()=>{

    FirebaseContext.setIsThemeLoading(true)
    let urlPath = JSON.parse(localStorage.getItem("Url_Path")); // Get url path from Local Storage
    const companyName = urlPath.split("/")[0]; // "birdschemotech" (Company Name)
    
    let userPacket =   JSON.parse(localStorage.getItem("User_ID")); // Get user object from Local Storage
    const userUID = userPacket?.uid ?? "";
    

    const docRef = doc(firestore,'companies_credentials',companyName,'users',userUID);
    

    await updateDoc(docRef,{
      
      theme : FirebaseContext?.themeName ?? 'default-dark'
    
    }).then(()=>{
      
      FirebaseContext.setIsThemeLoading(false);
    }).catch((error)=>{
      
      
toast.error(`Updating theme failed: ${error.message} !`,{
  position: "top-center",
 autoClose: 1500,
 hideProgressBar: false,
 closeOnClick: true,
 pauseOnHover: true,
 draggable: true,
 progress: undefined,
 theme: "light",
 transition: Bounce,
 });
      
    }) 

      localStorage.setItem('theme',JSON.stringify(FirebaseContext?.themeName ?? 'default-dark'));
    
      // console.log("Hmmmm.....",typeof FirebaseContext?.themeName)
  document.getElementById('html-tag').setAttribute("data-theme",`${FirebaseContext.themeName}`);
  document.getElementById('main-tag').classList.remove("className",`${FirebaseContext.themeName}`);
  document.getElementById('main-tag').classList.add("className",`${FirebaseContext.themeName}`);
  // pleaseCloseTheModal()
  window.location.reload()

  // setTimeout(()=>{    
  // },1500)

    
    // FirebaseContext.themeName()
  }

  return (
    <div>
      {FirebaseContext.isThemeModalOpen && (
        <div
          className="main-modal fixed w-full h-full inset-0 z-[200] overflow-hidden flex justify-center items-center animated fadeIn faster"
          style={{ background: "rgba(0,0,0,.7)" }}
        >
          <div className=" modal-container w-full  tablet:w-11/12  h-full tablet:h-auto max-w-sm  mx-auto   z-50 overflow-y-auto shadow-2xl p-2 rounded-r-none LM425:rounded-2xl border-2 border-gray-50 bg-white ">
            <div className="modal-content py-4 text-left px-6">
              <div className="flex justify-between items-center pb-3">
                <p className="text-2xl font-bold text-primary">Change Theme</p>
                <div
                  className="modal-close cursor-pointer z-50"
                  onClick={pleaseCloseTheModal}
                >
                  <svg
                    className="fill-current text-black hover:font-bold transition-transform duration-300 ease-in-out transform hover:scale-125"
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                  >
                    <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
                  </svg>
                </div>
              </div>
              <div className="my-5">
                <NextListBox />

                {/* <p>If you want to Log Out your Account ?</p> */}
              </div>
              <div className="flex justify-end pt-2 gap-4">
                <Button
                  variant="light"
                  className="LM425:flex text-primary"
                  onClick={pleaseCloseTheModal}
                >
                  Discard
                </Button>
                {/* <button className="focus:outline-none px-4 bg-teal-500 p-3 ml-3 rounded-lg text-white hover:bg-teal-400">
                                    Confirm
                                </button> */}

                <Button
                onClick={SettingThemeInLS}
                  id="logout-btn"
                  variant="shadow"
                  className="bg-primary LM425:flex  text-white shadow-lg shadow-primary"
                  // onClick={logoutUser}
                  isLoading={FirebaseContext.isThemeLoading}
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
                  Apply
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeModal;
