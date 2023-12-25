import React, { useEffect, useState } from 'react'
import { MdKeyboardBackspace } from "react-icons/md"
import Loading from './Loading'
import { ImageUpload } from '../pages'
import { useFirebase } from "../FirebaseContext";
import { FIREBASE_DB } from '../config/firebaseinit';
import { set, ref, onValue } from "firebase/database"
import Alert from './Alert';
import { BoxWrap, MapWrap } from '../assets'
import Message from './Message';
const PopupGood = ({ name, price, setPopUp, weight, ProdukID }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [qty, setQty] = useState(1)
    const [packaging, setPackaging] = useState("map|2000")
    const [urlImg, setUrlImg] = useState("")
    const [isComplete, setIsComplete] = useState(false)
    const [isConfirmed, setIsConfirmed] = useState(false)
    const { user } = useFirebase();
    const [codeID, setCodeID] = useState(0)
    const [cartData, setCartData] = useState([])
    const [typeMsg, setTypeMsg] = useState(0)
    const [msg, setMsg] = useState("")

    const handleCart = async () => {
        const data = {
            produkID: ProdukID,
            img: urlImg,
            qty: urlImg.length,
            weight: parseInt(weight),
            packaging: packaging,
            price: parseInt(price) * urlImg.length + parseInt(packaging.split("|")[1] * (urlImg.length)),
        }
        const timeStamp = Math.floor(new Date().getTime() / 1000)
        setCodeID(timeStamp)
        await set(ref(FIREBASE_DB, "carts/" + user.uid.slice(0, 5) + "B" + timeStamp), data)
            .then(() => {
                setIsConfirmed(true)
            })
            .catch((error) => {
                console.log(error)
            });
        if (cartData[0]) {
            await set(ref(FIREBASE_DB, "user/" + user.uid + "/cart/"), [...cartData, (user.uid.slice(0, 5) + "B" + timeStamp)])
                .then(() => {
                    setIsConfirmed(true)
                })
                .catch((error) => {
                    console.log(error)
                });
        }
        else {
            await set(ref(FIREBASE_DB, "user/" + user.uid + "/cart/"), [(user.uid.slice(0, 5) + "B" + timeStamp)])
                .then(() => {
                    setIsConfirmed(true)
                })
                .catch((error) => {
                    console.log(error)
                });
        }
    }

    useEffect(() => {
        console.log(weight)
        if (urlImg != "") {
            setIsComplete(true)
        }
    }, [urlImg])

    useEffect(() => {
        setIsLoading(true)
        onValue(ref(FIREBASE_DB, "user/" + user.uid + "/cart"), (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const key = Object.keys(data);
                setCartData(data)
            }
            setIsLoading(false)
        });
    }, []);

    const handleClose = (e) => {
        setPopUp(false)
    }

    return (
        <div className='w-full h-screen overflow-y-auto bg-black bg-opacity-30 fixed left-0 top-0 flex justify-center items-center flex-col z-50'>
            {isLoading ? <Loading /> : null}
            <Message msg={msg} type={typeMsg} setType={setTypeMsg} />
            {isConfirmed ? <Alert setPopBuy={setPopUp} setIsConfirmed={setIsConfirmed} price={parseInt(price) * parseInt(qty)} code={user.uid.substring(0, 5) + 'A' + codeID} /> :
                <>
                    <div className='flex justify-center bg-slate-50 w-full h-full relative flex-wrap'>

                        <div className='bg-slate-200 h-auto md:h-full flex-1'>
                            <div className='bg-slate-50 mt-10 mx-10 px-5 py-8'>
                                <p className='text-slate-800 font-semibold'>Masukkan Gambar</p>
                                <p className='text-slate-600 text-xs'>Upload file hanya dengan ekstensi .jpg, .jpeg, .png, atau .heic</p>
                                <div className='mt-6'>
                                    <ImageUpload url={urlImg} setUrl={setUrlImg} setIsLoading={setIsLoading} setMsg={setMsg} setType={setTypeMsg} />
                                </div>
                            </div>
                            <div className='bg-slate-50 mt-2 mx-10 px-5 py-8 pb-16'>
                                <p className='text-slate-800 font-semibold'>Pilih Packaging yang Digunakan</p>
                                <p className='text-slate-600 text-xs'>Setiap Packaging memiliki harga masing-masing</p>
                                <div className='flex justify-around gap-5  mt-8'>
                                    <a onClick={() => setPackaging("map|2000")} className={`rounded-lg ${packaging == "map|2000" ? "border-4 border-blue-600" : ""} flex flex-col w-40 h-40 cursor-pointer shadow-lg`}>
                                        <img className='w-full h-full object-cover rounded-lg' src={MapWrap} />
                                        <p className='text-lg bg-amber-800 text-center text-white font-semibold mt-4 py-2'>+ Rp 2.000<sub className='text-xs font-light'>/item</sub></p>
                                    </a>
                                    <a onClick={() => setPackaging("box|3000")} className={`rounded-lg ${packaging == "box|3000" ? "border-4 border-blue-600" : ""} flex flex-col w-40 h-40 cursor-pointer shadow-lg`}>
                                        <img className='w-full h-full object-cover rounded-lg' src={BoxWrap} />
                                        <p className='text-lg bg-amber-800 text-center text-white font-semibold mt-4 py-2'>+ Rp 3.000<sub className='text-xs font-light'>/item</sub></p>
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className='bg-slate-200 md:h-full h-auto w-full md:w-4/12 md:pr-10'>
                            <div className='bg-slate-50 flex flex-col mt-2 md:mt-10 w-full px-5 py-8'>
                                <p className='text-amber-950 mt-1 flex justify-between'><span>{name}</span> <span>{urlImg ? urlImg.length : 0} barang</span></p>
                                <p className='text-amber-950 mt-1 flex justify-between'><span>Jenis Packaging</span> <span className='capitalize'>{packaging.split("|")[0]} </span></p>
                            </div>
                            <div className='bg-slate-50 flex flex-col mt-2 mx-auto w-full px-5 py-2 md:py-5'>
                                <p className='text-amber-950 mt-1 flex justify-between'><span>Harga Produk</span> <span>{(parseInt(price) * (urlImg.length)).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })},-</span></p>
                                <p className='text-amber-950 mt-1 flex justify-between'><span>Harga Packaging</span> <span>{parseInt(packaging.split("|")[1] * (urlImg.length)).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })},-</span></p>
                                <hr className='mt-3 opacity-80' />
                                <p className='text-amber-950 mt-1 flex justify-between'><span>Total</span> <span>{(parseInt(price) * (urlImg.length) + parseInt(packaging.split("|")[1]* (urlImg.length))).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })},-</span></p>
                                <div className='w-full text-center mt-5'>
                                    {isComplete ?
                                        <div className='flex flex-col'>
                                        <a onClick={handleCart} className='bg-amber-500 flex px-5 justify-center py-1.5'>
                                            Masuk Keranjang
                                        </a>
                                        <a onClick={handleClose} className='flex items-center py-1.5 px-5 mt-2  justify-center text-amber-800'><MdKeyboardBackspace className='text-xl' /><span className='ml-1 text-sm'>Kembali</span></a>
                                        </div>
                                        :
                                        <div className='flex flex-col'>
                                        <a className='bg-slate-500 cursor-not-allowed flex px-5 justify-center py-1.5'>
                                            Masuk Keranjang
                                        </a>
                                        <a onClick={handleClose} className='flex items-center py-1.5 px-5 mt-2  justify-center text-amber-800'><MdKeyboardBackspace className='text-xl' /><span className='ml-1 text-sm'>Kembali</span></a>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='bg-slate-200 w-full '>
                    </div>
                </>
            }
        </div>
    )
}

export default PopupGood