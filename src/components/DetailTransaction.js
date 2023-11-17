import React, { useState, useEffect } from 'react'
import { FIREBASE_DB } from '../config/firebaseinit'
import { onValue, ref } from 'firebase/database'
import { FaFileImage } from "react-icons/fa";

const DetailTransaction = ({ keyItem, data, name, setPopUpDetail }) => {
    const [userData, setUserData] = useState([])
    useEffect(() => {
        onValue(ref(FIREBASE_DB, "user/" + data.userID), (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setUserData(data)
                const key = Object.keys(data)
            }
        });
    }, [])
    return (
        <div className='w-screen h-screen fixed bg-black top-0 left-0 bg-opacity-50 flex justify-center items-center'>

            <div className="max-w-2xl overflow-hidden bg-white shadow sm:rounded-lg py-8">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                        {name}
                    </h3>
                    <p className="max-w-2xl mt-1 text-sm text-gray-500 uppercase">
                        ID {keyItem}
                    </p>
                </div>
                <div className="border-t border-gray-200">
                    <dl>
                        <div className="px-4 py-2 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Email
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {userData.email}
                            </dd>
                        </div>
                        <div className="px-4 py-2 bg-white sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Phone
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {userData.phone}
                            </dd>
                        </div>
                        <div className="px-4 py-2 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Alamat
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {data.alamat}, {data.city.split("|")[1]}, {data.provinsi.split("|")[1]}
                            </dd>
                        </div>
                        <div className="px-4 py-2 bg-white sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Harga
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {new Intl.NumberFormat('id-ID', {
                                    style: 'currency',
                                    currency: 'IDR'
                                }).format(data.price)}
                            </dd>
                        </div>
                        <div className="px-4 py-2 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Packaging
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 uppercase">
                                {data.kurir}- {data.pengiriman}
                            </dd>
                        </div>
                        <div className="px-4 py-2 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Jumlah
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {data.qty} buah
                            </dd>
                        </div>
                        <div className="px-4 py-2 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Status
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {data.buyStatus}
                            </dd>
                        </div>
                        <div className="px-4 py-2 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Resi
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                
                            </dd>
                        </div>
                        <div className="px-4 py-2 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Gambar
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <a className='bg-amber-200 w-6 h-6 text-sm text-amber-900 flex justify-center items-center rounded-full' target="_blank" href={data.img}><FaFileImage /></a>
                            </dd>
                        </div>
                        <div className="px-4 py-2 bg-gray-50 flex justify-between">
                            <a onClick={(e)=>{setPopUpDetail(false); e.preventDefault()}} className='px-6 py-2 text-md text-amber-900 flex justify-center items-center ' href={data.img}><FaFileImage className='mr-2' /> Kembali</a>
                            <a className='bg-green-200 px-6 py-2 text-md text-green-950 flex justify-center items-center rounded border-slate-500 border' target="_blank" href={data.img}><FaFileImage className='mr-2' /> Simpan</a>
                        </div>
                    </dl>
                </div>
            </div>

        </div>
    )
}

export default DetailTransaction