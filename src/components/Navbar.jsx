import React, { useState } from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Input, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar, Button, Tooltip} from "@nextui-org/react";
// import {AcmeLogo} from "./components/SVGS/AcmeLogo.jsx";
import { TbLogout2 } from "react-icons/tb";
import { CgMenu,CgMenuRight } from "react-icons/cg";
import { MdOutlineClose  } from "react-icons/md";
import {Text} from 'react-font'
import {Link, useNavigate} from 'react-router-dom'
import { getAuth, signOut } from "firebase/auth";
import { useFirebaseContext } from "../context/FirebaseApp";
import '../App.css'
import { CgMaximize } from "react-icons/cg";
import { CgMinimizeAlt } from "react-icons/cg";
import { PiDownloadSimpleBold } from "react-icons/pi";


export default function MyNavbar() {

  const FirebaseContext = useFirebaseContext();
  

  const navigate = useNavigate();

    const [isBurgerOpen,setIsBurgerOpen] = useState(false);
   
const user_packet  = JSON.parse(localStorage.getItem("User_ID"));

const pleaseOpenTheModal = () => {

    FirebaseContext.openModal("LO");
  

}

React.useEffect(()=>{

  FirebaseContext.toggleMinMaxIcon();


  if(user_packet.email.split("admin").length > 1){
    
    FirebaseContext.setIsUserAdmin(true);
  
  }else{
  
    FirebaseContext.setIsUserAdmin(false);

  }

},[])

document.addEventListener("fullscreenchange",()=>{

  FirebaseContext.toggleMinMaxIcon()

})

  return (

    <div className="w-full h-auto flex justify-center mt-[15px] items-center" style={{backgroundColor:"transparent"}}>

    <Navbar  isBordered className="navglass h-[60px] w-[93%]" >


{/* // header ?? */}
      <NavbarContent justify="start" className="1rem w-[50vw] justify-between "> 


      
      <NavbarContent as="div" className="items-center LM425:hidden" justify="end">

        <Dropdown placement="bottom-start" className="bg-[#FF0000] text-white ml-[3vh] z-[9999999] relative top-[-0.30em]" >
          <DropdownTrigger>
                {isBurgerOpen  ?  <MdOutlineClose className="
                text-[#FF0000] cursor-pointertransition-all 0.3s" fontSize={25} onClick={()=>setIsBurgerOpen(false)}/> : <CgMenu className="
                text-[#FF0000] cursor-pointer" fontSize={26} onClick={()=>setIsBurgerOpen(true)}/>
                }
 
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat"  className="z-[10]">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">{user_packet?.email}</p>
            </DropdownItem>
            {FirebaseContext.isUserAdmin && ( <DropdownItem key="add-user" color="default"><Link to={'/add-user'}>Add User</Link></DropdownItem> ) }
            <DropdownItem key="logout" color="default"  onClick={pleaseOpenTheModal}>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
        
        <NavbarBrand className="mr-4">       
       <TbLogout2 fontSize={25}  className="hidden LM425:block cursor-pointer text-[#FF0000] hover:text-white" onClick={pleaseOpenTheModal}/>

          <Text family="Jost" className="hidden ml-[3vh] LM425:block font-bold">{user_packet?.email}</Text>
        </NavbarBrand>


        <NavbarContent className="gap-3">
      
          <NavbarItem isActive className="block LM425:hidden">
            <Text family="Jost"   href="#" aria-current="page" className="text-[#000000] text-center font-semibold text-xl leading-tight font">
              Datalogger 
            </Text>
          </NavbarItem>
        
        </NavbarContent>
      

      
      </NavbarContent>

  

        <NavbarContent justify="end" className="gap-5">



        <NavbarItem>
  
         { FirebaseContext.isUserAdmin &&
        (   <Button as={Link}  variant="shadow" className="bg-[#FF0000] hidden LM425:flex theme-primary-color text-white" style={{boxShadow:"rgb(255, 0, 0) 0px 7px 15px -7px"}}>
             <Link to="/add-user">Add User</Link>
          </Button>
        )}

        </NavbarItem>



        <NavbarItem>



        { FirebaseContext.isUserAdmin  ? ( 
          
           <Tooltip placement="center" showArrow={true} content="Download Data Logs" closeDelay={1}>



<Button as={Link}  variant="shadow" className="bg-[#FF0000] hidden tablet:flex theme-primary-color text-white" style={{boxShadow:"rgb(255, 0, 0) 0px 7px 15px -7px"}} onClick={()=>FirebaseContext.openModal("DL")}>

  <PiDownloadSimpleBold className="text-xl"/>

  </Button>

</Tooltip> 
)  :(

  <Button as={Link}  variant="shadow" className="bg-[#FF0000] hidden tablet:flex theme-primary-color text-white" style={{boxShadow:"rgb(255, 0, 0) 0px 7px 15px -7px"}} onClick={()=>FirebaseContext.openModal("DL")}>

Download Data Logs <PiDownloadSimpleBold className="text-xl"/>

    </Button>
)}

        </NavbarItem>
      


        
          {FirebaseContext.minMaxIcon === "max"  ? <CgMaximize className="text-2xl cursor-pointer" onClick={()=>FirebaseContext.fullScreenMode()}/> : <CgMinimizeAlt className="text-2xl cursor-pointer" onClick={()=>FirebaseContext.exitFullScreen()}/> } </NavbarContent>

          
      
    </Navbar>
     </div>
  );
}
