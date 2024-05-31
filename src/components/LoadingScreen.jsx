import { Spinner } from '@nextui-org/react';
import React, { useEffect } from 'react'
import { useFirebaseContext } from '../context/FirebaseApp';

export default function LoadingScreen() {

      return (
        <div className='w-full h-[105%] absolute z-[500] flex justify-center items-center text-white' style={{ backgroundColor:"white"}}>
            <Spinner label="Loading..." color="primary"  size='lg'  labelColor='foreground'  />
        </div>
      )
    
      
}
