import React,{useEffect, useState} from 'react'
import {IoMdClose} from "react-icons/io"
import {BsFillCartFill} from "react-icons/bs"
import CartItem from './CartItem'
import { useFirebase } from "../FirebaseContext";
import { FIREBASE_DB } from '../config/firebaseinit';
import { set, ref, onValue, update } from "firebase/database"
const Cart = ({isOpen}) => {
  const [dataCart, setDataCart] = useState([])
  const { user } = useFirebase();
  useEffect(() => {
    onValue(ref(FIREBASE_DB, "user/" + user.uid + "/cart"), (snapshot) => {
        const data = snapshot.val();
        if(data){
          setDataCart(data)
        }
    });
}, []);
  return (
    <div className='w-full flex justify-center items-center h-screen bg-black bg-opacity-40'>
        <div className='md:w-5/12 w-full h-96 pb-4 bg-amber-200 shadow-lg'>
            <div className='flex items-center bg-amber-950 justify-between'>
                <p className='bold text-amber-50 px-5 py-2 text-lg flex items-center'><BsFillCartFill className='mr-2' /><span>Keranjang</span></p>
                <IoMdClose onClick={()=>isOpen(false)} className='text-white w-12 px-2 h-12 bg-red-500 cursor-pointer' />
            </div>
            {/* Cart Item */}
            <div className='h-80 overflow-y-auto'>
              {dataCart[0] ? dataCart.map(list=>{
                return (<CartItem list={list} />)
              }):null}
            </div>
        </div>
    </div>
  )
}

export default Cart