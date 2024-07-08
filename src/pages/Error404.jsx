import { Button } from '@nextui-org/react'
import React from 'react'
import { Text } from 'react-font';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { Link , useNavigate} from 'react-router-dom';

const ErrorPage = () =>{

const navigate = useNavigate();
const TOKEN  = localStorage.getItem("User_ID");

const goBackUrl=()=>{

 navigate(-1);


}

return (
        <div className='h-[100%] w-[100%]' style={{backgroundColor:"  "}}>

{TOKEN == null ? (

<Button className='absolute top-5 left-5 bg-white  text-primary z-10' style={{boxShadow:"rgb(255, 255, 255) 0px 7px 15px -7px",display:"ruby"}}>
<Link to={'/'}><IoMdArrowRoundBack className="text-[4vh] text-primary cursor-pointer"/> <Text family='Jost'>Back</Text></Link>
</Button>

) : (

<Button className='absolute top-5 left-5 bg-white  text-primary z-10' style={{boxShadow:"rgb(255, 255, 255) 0px 7px 15px -7px",display:"ruby",}} onClick={goBackUrl}>

<IoMdArrowRoundBack className="text-[4vh] text-primary cursor-pointer"/> <Text family='Jost'>Back</Text>
</Button>

)}
  
          <img src='/images/error.png' style={{width:"100%",height:"100%",objectFit:"contain",position:"absolute"}}/>
        </div>
    )
}
    
    


export default ErrorPage
