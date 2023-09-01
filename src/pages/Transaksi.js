import React from 'react'
import {AiOutlineFieldTime} from "react-icons/ai"
import {FaTruck} from "react-icons/fa"
import {MdDone} from "react-icons/md"
import TransactionCard from '../components/TransactionCard'
const Transaksi = () => {
  return (
    <div className='flex flex-col w-full'>
      {/* Menunggu Pembayaran */}
      <div>
        <h2 className='text-md items-center text-amber-50 mt-8 px-5 py-1 border-b-2 border-white border-opacity-30 flex'><AiOutlineFieldTime /><span className='ml-2'>Menunggu Pembayaran</span></h2>
        <TransactionCard />
      </div>

      {/* Diproses */}
      <div>
      <h2 className='text-md items-center flex text-amber-50 mt-8 px-5 py-1 border-b-2 border-white border-opacity-30'><FaTruck /><span className='ml-2'>Sedang Diproses</span></h2>
      </div>

      {/* Selesai */}
      <div>
      <h2 className='text-md items-center flex text-amber-50 mt-8 px-5 py-1 border-b-2 border-white border-opacity-30'><MdDone /><span className='ml-2'>Selesai Diproses</span></h2>
      </div>
    </div>
  )
}

export default Transaksi