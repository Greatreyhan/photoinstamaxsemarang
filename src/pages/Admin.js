import React, {useState, useEffect} from 'react'
import { Dashboard, NavAdmin, Pengguna, Persona, Pesanan, Produk } from '../components'

const Admin = () => {
    const [page,setPage] = useState("Dashboard")
  return (
    <div className='flex w-full bg-slate-100 min-h-screen'>
        <NavAdmin current={page} setShow={setPage}/>
        <div className='w-2/12'>
        </div>
        <div className='flex-1'>
            <Persona />
            {page == "Dashboard" ? 
            <Dashboard />
            :
            page == "Pesanan" ?
            <Pesanan/>
            :
            page == "Pengguna" ?
            <Pengguna />
            :
            page == "Produk" ?
            <Produk />
            : null}
        </div>
    </div>
  )
}

export default Admin