import React,{useEffect} from 'react'
import Barcode from 'react-barcode';
import { Cart } from '../assets'
import { Dana, Mandiri, Shopeepay, Qris } from '../assets';
import { Link, Navigate } from 'react-router-dom';
const PoUpTransaction = ({setPopUp, produk="", total=0, code="", packaging=0, bubble=0, ongkir=0}) => {
    useEffect(()=>{
        console.log(total)
    })
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
                        <p className='font-normal opacity-80 text-sm flex items-center'><img className='md:w-24 w-16 my-3' src={Mandiri} /><span className='ml-2 text-xl md:text-2xl font-semibold'>1350017132737 <span className='text-sm font-normal'>(MUHAMMAD ERZA S)</span></span></p>
                        <p className='font-normal opacity-80 text-sm flex items-center'><img className='md:w-24 w-16 my-3' src={Dana} /><span className='ml-2 text-xl md:text-2xl font-semibold'>081225554727  <span className='text-sm font-normal'>(Karmini)</span></span></p>
                        <p className='font-normal opacity-80 text-sm flex items-center'><img className='md:w-24 w-16 my-3' src={Shopeepay} /><span className='ml-2 text-xl md:text-2xl font-semibold'>081225554727 <span className='text-sm font-normal'>(MUHAMMAD ERZA S)</span></span></p>
                    </div>
                </div>
            </div>
            <div className='flex-1 bg-slate-50 px-4'>
                <h1 className='text-center text-xl font-semibold text-amber-900 my-8 md:block hidden '>Rincian Pembayaran</h1>
                <div className='flex flex-col mt-8 md:mt-2 mx-auto md:w-10/12 w-11/12 px-5 md:py-5 py-2'>
                    <p className='text-amber-950 mt-1 flex justify-between font-semibold'><span>Total</span> <span>{total}</span></p>
                </div>
                <div className='flex justify-center flex-col md:mt-12 mt-4 items-center'>
                <Barcode className="bg-slate-50" value={code} width={2} height={40} />
                </div>
                <div className="flex items-center justify-between md:mt-12 pt-4">
                    <Link onClick={()=>{setPopUp(false)}} className="py-2 px-4 text-amber-900 w-full transition ease-in duration-200 text-center text-base font-semibold " to="/products">
                        Bayar Nanti
                    </Link>
                        <a href={"https://wa.me/62895618388388?text="+(total.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }))+"|"+code} target="_blank" type="button" className="py-2 px-4  bg-amber-600 hover:bg-amber-700 focus:ring-amber-500 focus:ring-offset-amber-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2">
                            Konfirmasi
                        </a>
                </div>
            </div>

        </div>
    )
}

export default PoUpTransaction