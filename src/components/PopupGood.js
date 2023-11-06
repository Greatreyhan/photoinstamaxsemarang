import React, { useEffect, useState } from 'react'
import { AiOutlineClose } from "react-icons/ai"
import Loading from './Loading'
import { ImageUpload } from '../pages'
import { useFirebase } from "../FirebaseContext";
import { FIREBASE_DB } from '../config/firebaseinit';
import { set, ref, onValue, update } from "firebase/database"
import Confirmation from './Confirmation';
const PopupGood = ({ Name, price, setPopUp, ProdukID }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [weight, setWeight] = useState(1000)
    const [qty, setQty] = useState(1)
    const [packaging, setPackaging] = useState("map")
    const [urlImg, setUrlImg] = useState("")
    const [isComplete, setIsComplete] = useState(false)
    const [isConfirmed, setIsConfirmed] = useState(false)
    const { user } = useFirebase();
    const [codeID, setCodeID] = useState(0)
    const [cartData, setCartData] = useState([])

    const handleCart = async () => {
        const data = {
            produkID: ProdukID,
            img: urlImg,
            qty: qty,
            packaging: packaging,
            price: parseInt(price) * parseInt(qty),
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
        await set(ref(FIREBASE_DB, "user/" + user.uid + "/cart/"), [...cartData, (user.uid.slice(0, 5) + "B" + timeStamp)])
            .then(() => {
                setIsConfirmed(true)
            })
            .catch((error) => {
                console.log(error)
            });
    }

    useEffect(() => {
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
        <div className='w-full h-screen bg-black bg-opacity-30 fixed left-0 top-0 flex justify-center items-center flex-col z-50'>
            {isLoading ? <Loading /> : null}
            {isConfirmed ? <Confirmation setPopBuy={setPopUp} setIsConfirmed={setIsConfirmed} price={parseInt(price) * parseInt(qty)} code={user.uid.substring(0, 5) + 'A' + codeID} /> :
                <div className='flex bg-amber-800 flex-col w-3/5 h-96 px-3 py-1 relative'>
                    <div className='w-full flex justify-end items-center'>
                        <AiOutlineClose className='text-xl text-white bg-red-500 mt-2' onClick={handleClose} />
                    </div>
                    <div className='flex'>
                        <div className='flex-1 flex flex-col px-4'>
                            <div className='flex flex-col mt-4'>
                                <div className='flex justify-between items-center'>
                                    <div className='flex-1 flex flex-col'>
                                        <label className='text-amber-50 text-xs'>Jumlah</label>
                                        <input className='px-1 py-1.5 text-md mt-1 w-2/3 text-amber-950' min={1} value={qty} onChange={(e) => setQty(e.currentTarget.value)} type="number" required />
                                    </div>
                                    <div className='flex-1'>
                                        <div className='my-6'>
                                            <ImageUpload setUrl={setUrlImg} />
                                        </div>
                                        <p className='text-xs text-amber-50'>Pilihan Packaging</p>
                                        <div className='flex gap-5  mt-2'>
                                            <div className='flex items-center' required>
                                                <input type="radio" value="map" checked={packaging == "map"} onChange={e => setPackaging(e.currentTarget.value)} name="packaging" />
                                                <label htmlFor="packaging" className='ml-1 text-xs text-amber-50'>Map</label>
                                            </div>
                                            <div className='flex items-center'>
                                                <input type="radio" value="box" checked={packaging == "box"} onChange={e => setPackaging(e.currentTarget.value)} name="packaging" />
                                                <label htmlFor="packaging" className='ml-1 text-xs text-amber-50'>Box</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr className='mt-3 opacity-60' />
                            <p className='text-white mt-1 flex justify-between'><span>Total</span>Rp <span>{parseInt(price) * parseInt(qty)},-</span></p>
                            <div className='w-full text-center mt-5'>
                                {isComplete ?
                                    <a onClick={handleCart} className='bg-amber-500 flex px-5 justify-center mx-4 py-1.5'>
                                        Masukkan
                                    </a>
                                    :
                                    <a className='bg-slate-500 cursor-not-allowed flex px-5 justify-center mx-4 py-1.5'>
                                        Masukkan
                                    </a>
                                }

                            </div>

                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default PopupGood