import React, { useState, useEffect } from 'react'
import { useFirebase } from "../FirebaseContext";
import { BsFillBagPlusFill } from "react-icons/bs"
import { onValue, ref, remove } from 'firebase/database'
import { FIREBASE_DB } from '../config/firebaseinit'
import { PopUpTransaction } from '.';

const TransactionCard = ({ list, id }) => {
    const [dataItem, setDataItem] = useState([])
    const [dataTransaction, setDataTransaction] = useState([])
    const [popUp, setPopUp] = useState(false)
    const { user } = useFirebase()
    useEffect(() => {
        onValue(ref(FIREBASE_DB, "goods"), (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const key = Object.keys(data)
                setDataItem(data)
            }
        });
        onValue(ref(FIREBASE_DB, "user/" + user.uid + "/transaction"), (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const key = Object.keys(data)
                setDataTransaction(data)
            }
        });
    }, [])

    const handleDelete = (e) => {
        e.preventDefault()
        remove(ref(FIREBASE_DB, "transactions/" + id))
            .then(() => {
                console.log('deleted')
            })
            .catch((error) => {
                console.log(error)
            });

        remove(ref(FIREBASE_DB, "user/" + user.uid + "/transaction/"+(dataTransaction.indexOf(id))))
            .then(() => {
                console.log('deleted')
                window.location.reload();
            })
            .catch((error) => {
                console.log(error)
            });
            
    }
    return (
        <div className='mx-5 flex flex-col bg-amber-800 px-8 py-4 rounded-lg mt-5 border-2 border-white border-opacity-20'>
            {popUp ? <div className='w-screen h-screen fixed bg-black bg-opacity-50 z-50 flex justify-center items-center top-0 left-0'>
                <PopUpTransaction setPopUp={setPopUp} price={list.price} code={id} />
            </div> : null}

            <div className='flex flex-wrap text-sm py-2 text-amber-50'>
                <p className='mr-3 font-bold flex items-center'><BsFillBagPlusFill /><span className='ml-1'>Produk</span></p>
                <p className='mx-3 '>{new Date(id.slice(6) * 1000).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                {list.buyStatus == 0 ?
                    <span className='bg-amber-500 md:text-md text-xs rounded-full px-6  md:mt-0 mt-2 text-amber-50 mx-0 md:mx-3'>Belum Dibayar</span>
                    :
                    list.buyStatus == 1 ?
                        <span className='bg-blue-500 md:text-md text-xs rounded-full px-6  md:mt-0 mt-2 text-blue-50 mx-0 md:mx-3'>Diproses</span>
                        :
                        list.buyStatus == 2 ?
                            <span className='bg-cyan-500 md:text-md text-xs rounded-full px-6  md:mt-0 mt-2 text-green-50 mx-0 md:mx-3'>Dikirim</span>
                            :
                            list.buyStatus == 3 ?
                            <span className='bg-green-500 md:text-md text-xs rounded-full px-6  md:mt-0 mt-2 text-green-50 mx-0 md:mx-3'>Selesai</span>
                            :
                            <span className='bg-red-500 md:text-md text-xs rounded-full px-6  md:mt-0 mt-2 text-red-50 mx-0 md:mx-3'>Terkendala</span>

                }

                <p className='font-mono  md:mt-0 mt-2 md:ml-0 ml-2'>INV/2{id}</p>
            </div>
            {dataItem != [] ?
                Array.isArray(list.produkID) ?
                    <div className='flex mt-3 items-center'>
                        <div className='bg-white px-1 pb-8 pt-1 shadow-xl'>
                            <img className='w-32 h-32 object-cover object-center' src={list.img} />
                        </div>
                        <div className='w-4/12 mx-5 text-amber-50'>
                            <p className='font-semibold text-lg'>{dataItem[list.produkID[0].produkID] ? dataItem[list.produkID[0].produkID].title : null}</p>
                            <p className='text-sm'>{list.qty} Buah</p>
                        </div>
                        <div className='w-4/12 text-amber-50 pl-2 border-l-2 border-white border-opacity-20'>
                            <p className='text-sm'>Total Belanja</p>
                            <p className='text-lg font-bold'>{list.price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</p>
                        </div>
                    </div>
                    :
                    <div className='flex mt-3 items-center'>
                        <div className='bg-white px-1 pb-8 pt-1 shadow-xl'>
                            <img className='w-32 h-32 object-cover object-center' src={list.img} />
                        </div>
                        <div className='w-4/12 mx-5 text-amber-50'>
                            <p className='font-semibold text-lg'>{dataItem[list.produkID] ? dataItem[list.produkID].title : null}</p>
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
                <button onClick={(e)=>handleDelete(e)} className='mx-8 px- text-white font-semibold hover:font-bold'>Batalkan</button>
                <button onClick={() => setPopUp(true)} className="px-8 py-1.5 hover:shadow-none shadow-[5px_5px_0px_0px_rgba(0,0,0,0.5)] bg-amber-100 text-lg font-semibold text-amber-950">Bayar</button>
            </div>
        </div>
    )
}

export default TransactionCard