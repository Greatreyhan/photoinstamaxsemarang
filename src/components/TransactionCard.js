import React, { useState, useEffect } from 'react'
import { useFirebase } from "../FirebaseContext";
import { FilmWrap } from '../assets'
import { BsFillBagPlusFill } from "react-icons/bs"
import { onValue, ref, set } from 'firebase/database'
import { FIREBASE_DB } from '../config/firebaseinit'

const TransactionCard = ({ list, id }) => {
    const [dataItem, setDataItem] = useState([])
    useEffect(() => {
        onValue(ref(FIREBASE_DB, "goods"), (snapshot) => {
            const data = snapshot.val();
            const key = Object.keys(data)
            setDataItem(data)
        });
    }, [])
    return (
        <div className='mx-5 flex flex-col bg-amber-800 px-8 py-4 rounded-lg mt-5 border-2 border-white border-opacity-20'>
            <div className='flex text-sm py-2 text-amber-50'>
                <p className='mr-3 font-bold flex items-center'><BsFillBagPlusFill /><span className='ml-1'>Produk</span></p>
                <p className='mx-3'>{new Date(id.slice(6) * 1000).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                {list.buyStatus == 0 ?
                    <span className='bg-amber-500 rounded-full px-6 text-amber-50 mx-3'>Belum Dibayar</span>
                    :
                    list.buyStatus == 1 ?
                        <span className='bg-blue-500 rounded-full px-6 text-blue-50 mx-3'>Diproses</span>
                        :
                        list.buyStatus == 2 ?
                            <span className='bg-green-500 rounded-full px-6 text-green-50 mx-3'>Selesai</span>
                            :
                            <span className='bg-red-500 rounded-full px-6 text-red-50 mx-3'>Terkendala</span>

                }

                <p className='font-mono'>INV/2{id}</p>
            </div>
            {dataItem[list.produkID] ?
                <div className='flex mt-3 items-center'>
                    <div className='bg-white px-1 pb-8 pt-1 shadow-xl'>
                    <img className='w-32 h-32 object-cover object-center' src={list.img} />
                    </div>
                    <div className='w-4/12 mx-5 text-amber-50'>
                        <p className='font-semibold text-lg'>{dataItem[list.produkID].title}</p>
                        <p className='text-sm'>{list.qty} Buah</p>
                    </div>
                    <div className='w-4/12 text-amber-50 pl-2 border-l-2 border-white border-opacity-20'>
                        <p className='text-sm'>Total Belanja</p>
                        <p className='text-lg font-bold'>{list.price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</p>
                    </div>
                </div>
                :
                null}
            <div className='flex justify-end '>
                <button className='mx-8 px-5 text-white font-semibold hover:font-bold'>Batalkan</button>
                <button className="px-8 py-1.5 hover:shadow-none shadow-[5px_5px_0px_0px_rgba(0,0,0,0.5)] bg-amber-100 text-lg font-semibold text-amber-950">Lihat Invoice</button>
            </div>
        </div>
    )
}

export default TransactionCard