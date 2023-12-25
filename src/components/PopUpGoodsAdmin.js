import React, { useState, useEffect } from 'react'
import { FIREBASE_DB } from '../config/firebaseinit'
import { set, ref } from 'firebase/database'
import { UploadImageAdmin } from '../components';
import { IoMdClose } from "react-icons/io";



const PopUpGoodsAdmin = ({ data, length, setPopUp, i }) => {
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [imgSrc, setImgSrc] = useState("")
    const [price, setPrice] = useState(0)
    const [qty, setQty] = useState(0)
    const [type, setType] = useState(2)
    const [weight, setWeight] = useState(0)

    useEffect(() => {
        console.log(data)
        if (data) {
            setTitle(data.title)
            setDesc(data.desc)
            setImgSrc(data.img)
            setPrice(data.price)
            setQty(data.qty)
            setType(data.type)
            setWeight(data.weight)
        }
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        const updateData = {
            title: title,
            desc: desc,
            img: imgSrc,
            price: price,
            qty: qty,
            weight: weight,
            type: type
        }
        set(ref(FIREBASE_DB, "goods/" + (i)), updateData)
            .then(() => {
                setPopUp(false)
            })
            .catch((error) => {
                console.log(error)
            });
    }
    return (
        <div className='fixed w-screen h-screen top-0 left-0 bg-black bg-opacity-50 flex justify-center items-center'>
            <div className="flex w-8/12 overflow-hidden bg-white rounded-lg shadow-lg relative">
                <IoMdClose onClick={() => setPopUp(false)} className='absolute z-10 top-0 rounded-full text-white left-0 bg-rose-500 w-8 h-8 cursor-pointer p-1' />
                <div className="w-5/12 bg-cover bg-slate-200 flex justify-center items-center">
                    {/* {imgSrc ? <img src={imgSrc} className='object-cover w-full h-full' /> : <MdFileUpload className='text-5xl text-slate-400' />} */}
                    <UploadImageAdmin url={imgSrc} setUrl={setImgSrc} />
                </div>
                <div className="w-7/12 p-4">
                    <div className='m-4 flex flex-col'>
                        <label className='text-xs text-slate-600'>Nama Produk</label>
                        <input required value={title} onChange={(e) => setTitle(e.currentTarget.value)} className='px-3 py-1 border-b border-slate-600' type="text" />
                    </div>
                    <div className='flex'>
                        <div className='m-4 flex flex-col'>
                            <label className='text-xs text-slate-600'>Harga Produk</label>
                            <input required value={price} onChange={(e) => setPrice(e.currentTarget.value)} className='px-3 py-1 border-b border-slate-600' type="number" min={0} />
                        </div>

                        <div className='m-4 flex flex-col'>
                            <label className='text-xs text-slate-600'>Stok Produk</label>
                            <input required value={qty} onChange={(e) => setQty(e.currentTarget.value)} className='px-3 py-1 border-b border-slate-600' type="number" min={0} />
                        </div>
                    </div>
                    <div className='flex'>
                        <div className='m-4 flex flex-col'>
                            <label className='text-xs text-slate-600'>Berat Produk</label>
                            <input required value={weight} onChange={(e) => setWeight(e.currentTarget.value)} className='px-3 py-1 border-b border-slate-600' type="number" min={0} />
                        </div>

                        <div className='m-4 flex flex-col'>
                            <label className='text-xs text-slate-600'>Tipe Produk</label>
                            <input required value={type} onChange={(e) => setType(e.currentTarget.value)} className='px-3 py-1 border-b border-slate-600' type="text" />
                        </div>
                    </div>
                    <div className='m-4 flex flex-col'>
                        <label className='text-xs text-slate-600'>Deskripsi Produk</label>
                        <textarea required value={desc} onChange={(e) => setDesc(e.currentTarget.value)} className='px-3 py-1 border-b border-slate-600' />
                    </div>

                    <div className="flex justify-center mt-3 item-center text-center mx-auto">
                        <button onClick={handleSubmit} className="px-6 py-2 text-xs text-black uppercase bg-amber-300 rounded">
                            Simpan
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default PopUpGoodsAdmin