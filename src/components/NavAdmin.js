import React from 'react'
import { Logo } from '../assets'
import { Link } from 'react-router-dom'
import { MdDashboard, MdSupervisedUserCircle, MdAddShoppingCart   } from "react-icons/md";
import { BiMoneyWithdraw } from "react-icons/bi";

const NavAdmin = ({page,setShow}) => {
    return (
        <div>
            <div className='w-2/12 bg-white shadow-lg fixed h-screen'>
                <img src={Logo} className='w-16 mx-auto' />
                <nav className='flex flex-col mt-8'>
                    <a onClick={()=>setShow('Dashboard')} className={`py-2.5 px-8 my-1 hover:text-black text-slate-500 hover:bg-amber-100 bg-white hover:border-l-4 hover:border-amber-600 flex items-center cursor-pointer`} ><MdDashboard className='text-xl mr-2' /> Dashboard</a>
                    <a onClick={()=>setShow('Pesanan')} className={`py-2.5 px-8 my-1 hover:text-black text-slate-500 hover:bg-amber-100 bg-white hover:border-l-4 hover:border-amber-600 flex items-center cursor-pointer`} ><BiMoneyWithdraw className='text-xl mr-2' /> Pesanan</a>
                    <a onClick={()=>setShow('Custom')} className={`py-2.5 px-8 my-1 hover:text-black text-slate-500 hover:bg-amber-100 bg-white hover:border-l-4 hover:border-amber-600 flex items-center cursor-pointer`} ><BiMoneyWithdraw className='text-xl mr-2' /> Custom</a>
                    <a onClick={()=>setShow("Pengguna")} className={`py-2.5 px-8 my-1 hover:text-black text-slate-500 hover:bg-amber-100 bg-white hover:border-l-4 hover:border-amber-600 flex items-center cursor-pointer`} ><MdSupervisedUserCircle className='text-xl mr-2' /> Pengguna</a>
                    <a onClick={()=>setShow('Produk')} className={`py-2.5 px-8 my-1 hover:text-black text-slate-500 hover:bg-amber-100 bg-white hover:border-l-4 hover:border-amber-600 flex items-center cursor-pointer`} ><MdAddShoppingCart className='text-xl mr-2' /> Produk</a>
                </nav>
            </div>
        </div>
    )
}

export default NavAdmin 