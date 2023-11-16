import React from 'react'
import { Logo } from '../assets'
const Persona = () => {
  return (
    <div className='flex justify-between items-center px-8 py-2'>
        <p className='text-lg font-bold px-6 py-2 bg-white rounded-full shadow-lg'>Dashboard</p>
        <div className='flex bg-white rounded-full shadow-lg px-6 py-2'>
            <img src={Logo} className='rounded-full w-10 h-10' />
            <div className='ml-2'>
            <p className='font-semibold text-sm'>Muhammad Erza</p>
            <p className='text-xs -mt-0.5'>Admin</p>
            </div>
        </div>
    </div>
  )
}

export default Persona