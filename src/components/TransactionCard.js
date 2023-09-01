import React from 'react'
import { FilmWrap } from '../assets'
import {BsFillBagPlusFill} from "react-icons/bs"

const TransactionCard = () => {
  return (
    <div className='mx-5 flex flex-col bg-amber-800 px-8 py-4 rounded-lg mt-5 border-2 border-white border-opacity-20'>
        <div className='flex text-sm py-2 text-amber-50'>
            <p className='mr-3 font-bold flex items-center'><BsFillBagPlusFill /><span className='ml-1'>Produk</span></p>
            <p className='mx-3'>1 Sep 2023</p>
            <span className='bg-green-500 rounded-full px-6 text-green-800 mx-3'>Dikirim</span>
            <p className='font-mono'>INV/20230901/MPL/3433746371</p>
        </div>
        <div className='flex mt-3 items-center'>
            <img className='w-32 h-32 object-cover object-center rounded-lg' src={FilmWrap} />
            <div className='w-4/12 mx-5 text-amber-50'>
                <p className='font-semibold text-lg'>Polaroid Photo</p>
                <p className='text-sm'>5 Buah</p>
            </div>
            <div className='w-4/12 text-amber-50 pl-2 border-l-2 border-white border-opacity-20'>
                <p className='text-sm'>Total Belanja</p>
                <p className='text-lg font-bold'>Rp 200.000</p>
            </div>
        </div>
        <div className='flex justify-end '>
            <button className='mx-8 px-5 text-white font-semibold hover:font-bold'>Lihat Invoice</button>
            <button className="px-8 py-1.5 hover:shadow-none shadow-[5px_5px_0px_0px_rgba(0,0,0,0.5)] bg-amber-100 text-lg font-semibold text-amber-950">Lacak Barang</button>
        </div>
    </div>
  )
}

export default TransactionCard