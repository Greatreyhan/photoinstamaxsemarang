import React, { useState, useEffect } from 'react'
import { useFirebase } from "../FirebaseContext";
import { ProfilePict } from '../assets';
import {BiUser, BiTransferAlt, BiCart, BiLogOutCircle} from "react-icons/bi"
import Setting from './Setting';
import Transaksi from './Transaksi';
import Keranjang from './Keranjang';
import { Navigate } from 'react-router-dom';
import { onValue, ref, set } from 'firebase/database'
import { FIREBASE_DB } from '../config/firebaseinit'

const Profile = () => {
    const [page, setPage] = useState("setting")
    const { signOut, user } = useFirebase();
    const [pictPerson, setPictPerson] = useState("")
    useEffect(() => {
        onValue(ref(FIREBASE_DB, "user/" + user.uid), (snapshot) => {
          const data = snapshot.val();
          const key = Object.keys(data)
          if(data){
          setPictPerson(data.pict)
          }
        });
      }, [])

    const handleLogout = async (e) => {
        e.preventDefault();
        <Navigate to="/login" />
        await signOut();
    };

  return (
    <div className='flex w-full mx-auto pt-14'>
        {/* Nav Menu */}
        {user ?
        <div className='w-3/12 m-5 shadow-md shadow-slate-500'>
            {/* Profile with picture */}
            <div className='flex justify-center flex-col items-center bg-amber-900 px-8 py-8'>
                <img className='rounded-full w-36 h-36 object-cover object-center' src={pictPerson} />
                <p className='text-amber-50 font-semibold capitalize mt-2'>Hello, {user.email.match(/([^@]*)@/)[1]}!</p>
            </div>
            <div className='flex justify-center flex-col items-center bg-amber-950 py-8'>
                <div onClick={()=>setPage("setting")} className='font-normal cursor-pointer w-full text-amber-50 hover:font-semibold justify-start pl-5 flex items-center text-lg py-2'><BiUser className='w-10' /><span className='ml-1'>Profile</span></div>
                <div onClick={()=>setPage("transaksi")} className='font-normal cursor-pointer w-full text-amber-50 hover:font-semibold justify-start pl-5 flex items-center text-lg py-2'><BiTransferAlt className='w-10' /><span className='ml-1'>Transaksi</span></div>
                <div onClick={()=>setPage("keranjang")} className='font-normal cursor-pointer w-full text-amber-50 hover:font-semibold justify-start pl-5 flex items-center text-lg py-2'><BiCart className='w-10' /><span className='ml-1'>Keranjang</span></div>
                <a onClick={handleLogout} className='font-normal cursor-pointer w-full text-amber-50 border-t-2 pt-3 border-white border-opacity-10 mt-20 hover:font-semibold justify-start pl-5 flex items-center text-lg py-2'><BiLogOutCircle className='w-10' /><span className='ml-1'>Log Out</span></a>
            </div>
        </div>
        : null}
        {/* Show Content */}
        <div className='w-9/12 m-5 bg-amber-900 shadow-md shadow-slate-500'>
            {page == "setting" ? <Setting />
            : 
             page == "transaksi" ? <Transaksi /> 
            :
            <Keranjang />
            }
        </div>
    </div>
  )
}

export default Profile