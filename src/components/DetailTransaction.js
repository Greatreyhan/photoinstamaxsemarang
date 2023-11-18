import React, { useState, useEffect } from 'react'
import { FIREBASE_DB } from '../config/firebaseinit'
import { onValue, ref, set } from 'firebase/database'
import { FaFileImage } from "react-icons/fa";
import { MdSave } from "react-icons/md";
import { IoIosArrowRoundBack } from "react-icons/io";

const DetailTransaction = ({ keyItem, data, name, setPopUpDetail }) => {
    const [userData, setUserData] = useState([])
    const [resi, setResi] = useState("")
    const [status, setStatus] = useState(0)
    useEffect(() => {
        onValue(ref(FIREBASE_DB, "transactions/" + keyItem), (snapshot) => {
            const data = snapshot.val();
            if (data) {
                console.log(data)
                setResi(data.resi ? data.resi : "")
                setStatus(parseInt(data.status))
            }
        });
        onValue(ref(FIREBASE_DB, "user/" + data.userID), (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setUserData(data)
            }
        });
    }, [])
    const handleSave = () => {
        const updateData = { ...data, resi: resi, buyStatus: parseInt(status) }
        set(ref(FIREBASE_DB, "transactions/" + keyItem), updateData)
            .then(() => {
                setPopUpDetail(false)
            })
            .catch((error) => {
                console.log(error)
            });
    }
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
                                <select onChange={e => setStatus(e.currentTarget.value)} className='border border-slate-400 border-opacity-50 px-1 py-1.5 text-md mt-1 text-amber-950' name="Status">
                                    <option value={0} >Belum Dibayar</option>
                                    <option value={1} >Diproses</option>
                                    <option value={2} >Dikirim</option>
                                    <option value={3} >Diterima</option>
                                    <option value={4} >Gagal</option>
                                </select>
                            </dd>
                        </div>
                        <div className="px-4 py-2 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Resi
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                <input className='border-b border-slate-700 py-1 px-3' type="text" value={resi} onChange={(e) => setResi(e.currentTarget.value)} />
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
                            <a onClick={(e) => { setPopUpDetail(false); e.preventDefault() }} className='px- cursor-pointer py-2 text-md text-amber-900 flex justify-center items-center ' href={data.img}><IoIosArrowRoundBack className='mr-2' /> Kembali</a>
                            <a onClick={handleSave} className='bg-green-200 px-6 py-2 text-md cursor-pointer text-green-950 flex justify-center items-center rounded border-slate-500 border'><MdSave className='mr-2' /> Simpan</a>
                        </div>
                    </dl>
                </div>
            </div>

        </div>
    )
}

export default DetailTransaction