import { Spinner } from '@nextui-org/react';
import React, { useEffect } from 'react'
import { useFirebaseContext } from '../context/FirebaseApp';

export default function LoadingScreen() {

      return (
        <div className='w-full h-[100vh] absolute z-[500] flex justify-center items-center text-primary' style={{ backgroundColor:"white"}}>
            <Spinner label={<b>Loading...</b>} color="primary"  size='lg'  labelColor='primary'  />
        </div>
      )
    
      
}
