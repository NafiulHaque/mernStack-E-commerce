import { Spinner } from '@material-tailwind/react';
import React from 'react'
// import Spinner from 'react-bootstrap/Spinner';

const Loader = () => {
  return (
   <div className='flex w-full h-full justify-center items-center'>
     <Spinner className="h-16 w-16 text-gray-900/50" />
   </div>
    
  )
}

export default Loader