import React from 'react'
import Barcode from 'react-barcode';
import { Cart } from '../assets'
const Alert = ({ setPopBuy, setIsConfirmed, price, code }) => {
    const handleConfirm = () =>{
        setIsConfirmed(false)
        setPopBuy(false)
    }
    return (
        <div>
            <div className="p-6 bg-white rounded-lg shadow-md w-96">
                <div className="relative w-24 mx-auto mb-3 -mt-16">
                    <img className="-mt-6" src={Cart} alt="cookie" />
                </div>
                <span className="block w-full mb-3 leading-normal text-gray-800 text-md">
                    <p className='text-lg text-center font-semibold'>Barangmu Sudah Masuk Keranjang!</p>
                </span>
                <div className="flex items-center justify-between mt-4">
                <div className="w-full mx-12 mt-12">
                    <a onClick={handleConfirm} target="_blank" type="button" className="py-2 px-4  bg-amber-600 hover:bg-amber-700 focus:ring-amber-500 focus:ring-offset-amber-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                        Mengerti
                    </a>
                </div>
            </div>
            </div>
        </div>
    )
}

export default Alert