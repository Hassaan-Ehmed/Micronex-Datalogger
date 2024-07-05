import React, { useState } from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Input, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar, Button, Tooltip} from "@nextui-org/react";
// import {AcmeLogo} from "./components/SVGS/AcmeLogo.jsx";
import { TbLogout2 } from "react-icons/tb";
import { CgMenu,CgMenuRight } from "react-icons/cg";
import { HiMenuAlt2 } from "react-icons/hi"
import { MdOutlineClose  } from "react-icons/md"; 
import {Text} from 'react-font';
import {Link, useNavigate} from 'react-router-dom';
import { getAuth, signOut } from "firebase/auth";
import { useFirebaseContext } from "../context/FirebaseApp";
import '../App.css';
import { CgMaximize } from "react-icons/cg";
import { CgMinimizeAlt } from "react-icons/cg";
import { PiDownloadSimpleBold } from "react-icons/pi";
import { MdOutlineColorLens } from "react-icons/md";
import { RiUserAddLine } from "react-icons/ri";





export default function MyNavbar() {

  const FirebaseContext = useFirebaseContext();
  

  const navigate = useNavigate();

    const [isBurgerOpen,setIsBurgerOpen] = useState(false);
   
const user_packet  = JSON.parse(localStorage.getItem("User_ID"));

const pleaseOpenTheModal = (forThe) => {

    FirebaseContext.openModal(forThe);
  

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
// style={{backgroundColor:"transparent"}}
    <div className="w-full h-auto flex justify-center mt-[15px] items-center" >

    <Navbar  isBordered className="navglass h-[60px] w-[93%]" >


{/* // header ?? */}
      <NavbarContent justify="center" className="1rem w-[50vw] justify-between"> 


      
      <NavbarContent as="div" className="items-center LM425:hidden " justify="end">

        <Dropdown backdrop="blur" placement="bottom-start" className="bg-white  text-[#FF0000] ml-[3vh] z-[9999999] relative top-[-0.30em]" >
          <DropdownTrigger>
                
                {/* {isBurgerOpen ?  <MdOutlineClose className="
                text-[#FF0000] cursor-pointertransition-all 0.3s z-[9999999]" fontSize={25} onClick={()=>setIsBurgerOpen(false)}/> : */}
                 <HiMenuAlt2 className="z-[9999999] text-foreground cursor-pointer" fontSize={26} onClick={()=>setIsBurgerOpen(true)}/>
                
 
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat"  className="z-[10]  bg-white">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold text-black">Signed in as</p>
              <p className="font-semibold text-[#FF0000]">{user_packet?.email}</p>
            </DropdownItem> 
            {FirebaseContext.isUserAdmin && ( <DropdownItem key="add-user" color="default" className="text-black"><Link className="flex justify-start items-center gap-3 " to={'/add-user'}><RiUserAddLine className="text-xl text-[#FF0000] cursor-pointer" /> Add User</Link> </DropdownItem> ) }
            <DropdownItem key="logout" color="default"  onClick={()=>pleaseOpenTheModal('LO')} className="text-black">
            <Link className="flex justify-start items-center gap-3 ">   <TbLogout2 className="text-2xl text-[#FF0000] cursor-pointer" onClick={()=>FirebaseContext.openModal("LO")}/> Log Out </Link> 
            </DropdownItem>
            <DropdownItem key="logout" color="default"  onClick={()=>pleaseOpenTheModal('CT')} className="text-black ">
            <Link className="flex justify-start items-center gap-3 ">   <MdOutlineColorLens className="text-2xl text-[#FF0000] cursor-pointer" onClick={()=>FirebaseContext.openModal("CT")}/> Theme </Link> 
            </DropdownItem>
            <DropdownItem key="logout" color="default"  onClick={()=>pleaseOpenTheModal('DL')} className="text-black ">
            <Link className="flex justify-start items-center gap-3 ">   <PiDownloadSimpleBold className="text-2xl text-[#FF0000] cursor-pointer" onClick={()=>FirebaseContext.openModal("DL")}/> Download </Link> 
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
        
        <NavbarBrand className="mr-4">    
        {/* <Tooltip placement="right" showArrow={true} content="Logout" closeDelay={1}>    */}
       <TbLogout2 fontSize={25}  className="hidden LM425:block cursor-pointer text-foreground hover:text-primary" onClick={()=>pleaseOpenTheModal("LO")}/>
      {/* </Tooltip>  */}
          <Text family="Jost" className="hidden ml-[3vh] LM425:block font-bold  tracking-tight">{user_packet?.email}</Text>
        </NavbarBrand>


        <NavbarContent className="gap-3">
      
          <NavbarItem isActive className="block LM425:hidden">
            <Text family="Jost"   href="#" aria-current="page" className="text-foreground text-center font-semibold text-xl leading-tight font">
              Datalogger 
            </Text>
          </NavbarItem>
        
        </NavbarContent>
      

      
      </NavbarContent>
  

        <NavbarContent justify="end" className="gap-5">

        <NavbarItem>
  
         { FirebaseContext.isUserAdmin &&
        (   <Button as={Link}  variant="shadow" className="bg-primary hidden LM425:flex  text-foreground shadow-lg shadow-primary" >
             <Link to="/add-user">Add User</Link>
          </Button>
        )}

        </NavbarItem>

        <NavbarItem>

        { FirebaseContext.isUserAdmin  ? ( 
          <>
<PiDownloadSimpleBold className="text-2xl hidden LM425:block tablet:hidden text-foreground cursor-pointer" onClick={()=>FirebaseContext.openModal("DL")}/>

           <Tooltip placement="center" showArrow={true} color='foreground' className='text-primary' content="Download Data Logs" closeDelay={1}>

{/* theme-primary-color */}
<Button as={Link}  variant="shadow" className=" hidden bg-primary shadow-lg shadow-primary tablet:flex  text-foreground"  onClick={()=>FirebaseContext.openModal("DL")}>

{/* rgb(255, 0, 0) */}
<PiDownloadSimpleBold className="text-xl"/>

</Button>

</Tooltip> 
</>
)  :(
<>

<PiDownloadSimpleBold className="text-2xl block tablet:hidden text-[#FF0000] cursor-pointer" onClick={()=>FirebaseContext.openModal("DL")}/>


<Button as={Link}  variant="shadow" className="bg-primary shadow-lg shadow-primary hidden tablet:flex laptop:hidden  text-foreground" style={{boxShadow:"rgb(255, 0, 0) 0px 7px 15px -7px"}} onClick={()=>FirebaseContext.openModal("DL")}>

<PiDownloadSimpleBold className="text-xl"/>


    </Button>

{/* style={{boxShadow:"rgb(255, 0, 0) 0px 7px 15px -7px"}} */}
  <Button as={Link}  variant="shadow" className="bg-primary hidden laptop:flex  text-foreground shadow-lg shadow-primary"  onClick={()=>FirebaseContext.openModal("DL")}>

Download Data Logs <PiDownloadSimpleBold className="text-xl"/>

    </Button>
</>
)}

        </NavbarItem>
      
{/* Theme */}
      <NavbarItem>
      
<MdOutlineColorLens className="text-2xl hidden LM425:block tablet:hidden text-foreground cursor-pointer" onClick={()=>FirebaseContext.openModal("CT")}/>
           <Tooltip placement="center" color='foreground' className='text-primary' showArrow={true} content="Change Theme" closeDelay={1}>

{/* theme-primary-color */}
<Button as={Link}  variant="shadow" className=" hidden bg-primary tablet:flex  text-white shadow-lg shadow-primary "  onClick={()=>FirebaseContext.openModal("CT")}>

{/* rgb(255, 0, 0) */}
<MdOutlineColorLens className="text-xl"/>

</Button>

</Tooltip> 

      </NavbarItem>


        
          {FirebaseContext.minMaxIcon === "max"  ? <CgMaximize className="text-2xl cursor-pointer" onClick={()=>FirebaseContext.fullScreenMode()}/> : <CgMinimizeAlt className="text-2xl cursor-pointer" onClick={()=>FirebaseContext.exitFullScreen()}/> } </NavbarContent>

          
      
    </Navbar>
     </div>
  );
}
