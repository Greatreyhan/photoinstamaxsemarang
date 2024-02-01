import React, { useEffect, useState } from 'react'
import { MdKeyboardBackspace } from "react-icons/md"
import Loading from './Loading'
import { ImageUpload } from '../pages'
import { useFirebase } from "../FirebaseContext";
import { FIREBASE_DB } from '../config/firebaseinit';
import { set, ref, onValue } from "firebase/database"
import Alert from './Alert';
import { BoxWrap, MapWrap } from '../assets'
const PopupGoodDefault = ({ name, price, setPopUp, weight, ProdukID, ImageSource }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [qty, setQty] = useState(1)
    const [isComplete, setIsComplete] = useState(false)
    const [isConfirmed, setIsConfirmed] = useState(false)
    const { user } = useFirebase();
    const [codeID, setCodeID] = useState(0)
    const [cartData, setCartData] = useState([])


    const handleCart = async () => {
        const data = {
            name: name,
            produkID: ProdukID,
            img: ImageSource,
            qty: qty,
            weight: parseInt(weight),
            packaging: "",
            price: parseInt(price) * qty,
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
        if (qty >= 1) {
            setIsComplete(true)
        }
        if(qty < 1){
            setIsComplete(false)
        }
    }, [qty])

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
            {isConfirmed ? <Alert setPopBuy={setPopUp} setIsConfirmed={setIsConfirmed} price={parseInt(price) * parseInt(qty)} code={user.uid.substring(0, 5) + 'A' + codeID} /> :
                <>
                    <div className='flex bg-slate-50 w-full h-full relative flex-wrap'>

                        <div className='bg-slate-200 h-full w-full pr-0 md:pr-10'>
                            <div className='bg-slate-50 md:w-4/12 w-11/12 flex flex-col mt-10 mx-auto px-5 py-8'>
                                <p className='text-amber-950 mt-1 flex justify-between'><span>{name}</span> <span><input className='border-b-2 text-center border-amber-500' type="number" min="1" max="99" value={qty} onChange={(e)=>setQty(e.currentTarget.value)} /> barang</span></p>                            </div>
                            <div className='bg-slate-50 md:w-4/12 w-11/12 flex flex-col mt-4 mx-auto px-5 py-8'>
                                <p className='text-amber-950 mt-1 flex justify-between'><span>Harga Produk</span> <span>{(parseInt(price) * (qty)).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })},-</span></p>
                                <hr className='mt-3 opacity-80' />
                                <p className='text-amber-950 mt-1 flex justify-between'><span>Total</span> <span>{(parseInt(price) * (qty)).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })},-</span></p>
                                <div className='w-full text-center mt-5'>
                                    {isComplete ?
                                        <a onClick={handleCart} className='bg-amber-500 flex px-5 justify-center py-1.5'>
                                            Masuk Keranjang
                                        </a>
                                        :
                                        <a className='bg-slate-500 cursor-not-allowed flex px-5 justify-center py-1.5'>
                                            Masuk Keranjang
                                        </a>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='bg-slate-200 w-full '>
                        <a onClick={handleClose} className='flex items-center w-36 py-2 justify-center text-white bg-amber-800'><MdKeyboardBackspace className='text-xl' /><span className='ml-1 text-sm'>Kembali</span></a>
                    </div>
                </>
            }
        </div>
    )
}

export default PopupGoodDefault