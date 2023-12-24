import React from 'react'
import Barcode from 'react-barcode';
import { Cart } from '../assets'
import { BNI, BCA, Qris } from '../assets';
import { Link, Navigate } from 'react-router-dom';
const PopUpCustom = ({ setPopUp, produk, total, code, packaging, bubble}) => {

    return (
        <div className="p-6 bg-white shadow-md w-screen h-screen flex flex-col md:flex-row px-0 md:px-16">
            <div className='flex-1 mx-6 md:mx-0 border-none md:border-r-2'>
                <h1 className='text-center text-xl font-semibold text-amber-900 my-8'>Pilih Metode Pembayaran</h1>
                <div className='flex flex-wrap'>
                    <div>
                        <p className='text-xs mb-2'>Melalui Q-RIS</p>
                        <img className='w-64 h-64 md:text-left text-center' src={Qris} />
                    </div>
                    <div className='ml-4'>
                        <p className='text-xs mb-2'>Melalui Bank</p>
                        <p className='font-normal opacity-80 text-sm flex items-center'><img className='w-12' src={BNI} /><span className='ml-2 text-lg'>1002321341243</span></p>
                        <p className='font-normal opacity-80 text-sm flex items-center'><img className='w-12' src={BCA} />  <span className='ml-2 text-lg'>1231029409994</span></p>
                    </div>
                </div>
            </div>
            <div className='flex-1'>
                <h1 className='text-center text-xl font-semibold text-amber-900 my-8 md:block hidden'>Rincian Pembayaran</h1>
                <div className='bg-slate-50 flex flex-col mt-8 md:mt-2 mx-auto md:w-10/12 w-11/12 px-5 py-5'>
                    <p className='text-amber-950 mt-1 flex justify-between'><span>Harga Produk</span> <span>{produk.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })},-</span></p>
                    <p className='text-amber-950 mt-1 flex justify-between'><span>Harga Packaging</span> <span>{packaging.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })},-</span></p>
                    <p className='text-amber-950 mt-1 flex justify-between'><span>Bubble Wrap</span> <span>{bubble.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })},-</span></p>
                    <hr className='mt-3 opacity-80' />
                    <p className='text-amber-950 mt-1 flex justify-between'><span>Total</span> <span>{total.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })},-</span></p>
                </div>
                <div className='flex justify-center flex-col md:mt-12 mt-4 items-center'>
                <Barcode value={code} width={1.2} height={40} />
                </div>
                <div className="flex items-center justify-between mt-12">
                    <Link onClick={()=>setPopUp(false)} className="py-2 px-4 text-amber-900 w-full transition ease-in duration-200 text-center text-base font-semibold " to="/products">
                        Bayar Nanti
                    </Link>
                        <a href={"https://wa.me/6281225554727?text="+total.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })+"|"+code} target="_blank" type="button" className="py-2 px-4  bg-amber-600 hover:bg-amber-700 focus:ring-amber-500 focus:ring-offset-amber-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2">
                            Konfirmasi
                        </a>
                </div>
            </div>
            {/* <div className="p-6 bg-white shadow-md w-screen h-screen">
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
                    <Link onClick={()=>setPopUp(false)} className="mr-1 px-5 text-sm text-gray-600 hover:text-gray-800" to="/products">
                        Bayar Nanti
                    </Link>
                    <div className="w-1/2">
                        <a href={"https://wa.me/6281225554727?text="+price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })+"|"+code} target="_blank" type="button" className="py-2 px-4  bg-amber-600 hover:bg-amber-700 focus:ring-amber-500 focus:ring-offset-amber-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                            Konfirmasi
                        </a>
                    </div>
                </div>
            </div> */}

        </div>
    )
}

export default PopUpCustom