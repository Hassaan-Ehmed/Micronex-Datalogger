import { Spinner } from '@nextui-org/react';
import React, { useEffect } from 'react'
import { useFirebaseContext } from '../context/FirebaseApp';

export default function LoadingScreen() {
  
 
  
      return (
        <div className='w-full h-[105%] absolute z-[500] flex justify-center items-center text-white' style={{ background: 'rgba(0,0,0,.7)' }}>
            <Spinner label="Loading..." color="primary"  size='lg'  labelColor='secondary'  />
        </div>
      )
    
  
}
