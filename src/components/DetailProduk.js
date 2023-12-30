import React, { useState, useEffect } from 'react'
import { FIREBASE_DB } from '../config/firebaseinit'
import { onValue, ref, set } from 'firebase/database'
import { FaFileImage } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";

const DetailProduk = ({ data, setProduk }) => {
    const [userData, setUserData] = useState([])
    const [resi, setResi] = useState("")
    const [status, setStatus] = useState(0)
    const [goods, setGoods] = useState([])
    useEffect(() => {
        onValue(ref(FIREBASE_DB, "goods/" + data.produkID), (snapshot) => {
            const d = snapshot.val();
            if (d) {
                setGoods(d)
            }
        });
        console.log(data)
    }, [])
    const handleSave = () => {
        // const updateData = { ...data[keyItem[countID]], resi: resi, buyStatus: parseInt(status) }
        // set(ref(FIREBASE_DB, "transactions/" + keyItem[countID]), updateData)
        //     .then(() => {
        //         setPopUpDetail(false)
        //     })
        //     .catch((error) => {
        //         console.log(error)
        //     });
    }
    return (
        <div className='w-screen h-screen fixed bg-black top-0 left-0 bg-opacity-50 flex justify-center items-center'>

            <div className="max-w-2xl overflow-hidden bg-white shadow sm:rounded-lg py-8">
                <div className="px-4 py-2 sm:px-6">
                    <div className='w-full flex justify-end text-3xl'>
                        <a className='inline' onClick={() => setProduk(false)}><IoIosClose /></a>
                    </div>
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                        {goods.title}
                    </h3>
                </div>
                <div className="border-t border-gray-200">
                    <dl>
                        <div className="px-4 py-2 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Packaging
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {data.packaging.split("|")[0]}
                            </dd>
                            <dt className="text-sm font-medium text-gray-500">
                                Qty
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {data.qty}
                            </dd>
                            <dt className="text-sm font-medium text-gray-500">
                                Gambar
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {data.img ? data.img.map(i => {
                                    return (<a className='bg-amber-200 w-6 h-6 text-sm text-amber-900 flex justify-center items-center rounded-full' target="_blank" href="#" download={i}><FaFileImage /></a>)
                                }) : null}                            </dd>
                        </div>
                    </dl>
                </div>
            </div>

        </div>
    )
}

export default DetailProduk