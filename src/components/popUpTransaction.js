import React from 'react'
import Barcode from 'react-barcode';
import { Cart } from '../assets'
import { BNI,BCA } from '../assets';
const PoUpTransaction = ({setPopUp, price, code}) => {
    return (
        <div>
            <div className="p-6 bg-white rounded-lg shadow-md w-96">
                <div className="relative w-24 mx-auto mb-3 -mt-16">
                    <img className="-mt-6" src={Cart} alt="cookie" />
                </div>
                <span className="block w-full mb-3 leading-normal text-gray-800 text-md">
                    <p className='text-xl text-center'>Bayar Belanjaanmu Dulu Sekarang !</p>
                    <p className='mt-8 font-normal opacity-80 text-sm flex items-center'><img className='w-12' src={BNI} /><span className='ml-2 text-lg'>1002321341243</span></p>
                    <p className='font-normal opacity-80 text-sm flex items-center'><img className='w-12' src={BCA} />  <span className='ml-2 text-lg'>1231029409994</span></p>
                </span>
                <p className='text-center text-2xl font-semibold text-amber-800'>
                {price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
                </p>
                <div className='flex justify-center flex-col mt-4 items-center'>
                <Barcode value={code} width={1.2} height={40} />
                </div>
                <div className="flex items-center justify-between mt-4">
                    <a onClick={()=>setPopUp(false)} className="mr-1 px-5 text-sm text-gray-600 hover:text-gray-800" href="#">
                        Bayar Nanti
                    </a>
                    <div className="w-1/2">
                        <a href={"https://wa.me/6281225554727?text="+price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })+"|"+code} target="_blank" type="button" className="py-2 px-4  bg-amber-600 hover:bg-amber-700 focus:ring-amber-500 focus:ring-offset-amber-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                            Konfirmasi
                        </a>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default PoUpTransaction