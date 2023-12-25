import React from 'react'
import Barcode from 'react-barcode';
import { Cart } from '../assets'
import { BNI, BCA, Qris } from '../assets';
import { Link, Navigate } from 'react-router-dom';
const Confirmation = ({setPopUp, setIsConfirmed, produk, total, code, packaging, bubble, ongkir=0}) => {
    return (
        <div className="bg-white overflow-y-auto shadow-md w-full h-screen flex flex-col justify-between md:flex-row">
            <div className='flex-1 mx-6 md:mx-0 border-none md:border-r-2 px-8'>
                <h1 className='text-center text-xl font-semibold text-amber-900 my-8'>Pilih Metode Pembayaran</h1>
                <div className='flex flex-col flex-wrap'>
                    <div className='flex justify-center flex-col'>
                        <p className='text-xs inline-block mx-auto bg-amber-500 py-2 px-8 text-white font-semibold rounded-t-lg'>Melalui QRIS</p>
                        <div className='w-full flex justify-center'>
                        <img className='w-64 h-64 md:text-left text-center border-8 rounded-md border-amber-500' src={Qris} />
                        </div>
                    </div>
                    <div className='mt-4'>
                        <p className='text-xs mb-2'>Melalui Bank</p>
                        <p className='font-normal opacity-80 text-sm flex items-center'><img className='md:w-24 w-16 my-3' src={BNI} /><span className='ml-2 text-xl md:text-2xl font-semibold'>1002321341243</span></p>
                        <p className='font-normal opacity-80 text-sm flex items-center'><img className='md:w-24 w-16 my-3' src={BCA} /><span className='ml-2 text-xl md:text-2xl font-semibold'>1231029409994</span></p>
                    </div>
                </div>
            </div>
            <div className='flex-1 bg-slate-50 px-4'>
                <h1 className='text-center text-xl font-semibold text-amber-900 my-8 md:block hidden '>Rincian Pembayaran</h1>
                <div className='flex flex-col mt-8 md:mt-2 mx-auto md:w-10/12 w-11/12 px-5 md:py-5 py-2'>
                    <p className='text-amber-950 mt-1 flex justify-between'><span>Harga Produk</span> <span>{produk},-</span></p>
                    <p className='text-amber-950 mt-1 flex justify-between'><span>Harga Packaging</span> <span>{packaging},-</span></p>
                    <p className='text-amber-950 mt-1 flex justify-between'><span>Bubble Wrap</span> <span>{bubble},-</span></p>
                    <p className='text-amber-950 mt-1 flex justify-between'><span>Ongkos Kirim</span> <span>{ongkir},-</span></p>
                    <hr className='mt-3 opacity-80' />
                    <p className='text-amber-950 mt-1 flex justify-between font-semibold'><span>Total</span> <span>{total},-</span></p>
                </div>
                <div className='flex justify-center flex-col md:mt-12 mt-4 items-center'>
                <Barcode className="bg-slate-50" value={code} width={2} height={40} />
                </div>
                <div className="flex items-center justify-between md:mt-12 pt-4">
                    <Link onClick={()=>{setPopUp(false);setIsConfirmed(false)}} className="py-2 px-4 text-amber-900 w-full transition ease-in duration-200 text-center text-base font-semibold " to="/products">
                        Bayar Nanti
                    </Link>
                        <a href={"https://wa.me/6281225554727?text="+total.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })+"|"+code} target="_blank" type="button" className="py-2 px-4  bg-amber-600 hover:bg-amber-700 focus:ring-amber-500 focus:ring-offset-amber-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2">
                            Konfirmasi
                        </a>
                </div>
            </div>

        </div>
    )
}

export default Confirmation