import React, { useEffect, useState } from 'react'
import { BiArrowBack } from "react-icons/bi"
import { AiOutlineCheck } from "react-icons/ai"
import { BsArrowRight } from "react-icons/bs"
import Loading from './Loading'
import { ImageUpload } from '../pages'
import { FIREBASE_DB } from '../config/firebaseinit';
import { set, ref } from "firebase/database"
import { BoxWrap, MapWrap } from '../assets'
import { Navigate } from 'react-router-dom'
import PopUpCustom from './PopUpCustom'
import Message from './Message'
const CustomForm = ({ price = 5000 }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [handleUnameEcommerce, setHandleUnameEcommerce] = useState("")
    const [unameEcommerce, setUnameEcommerce] = useState("")
    const [handleEcommerce, setHandleEcommerce] = useState('Tokopedia')
    const [commerce, setCommerce] = useState('')
    const [dataProv, setDataProv] = useState([])
    const [dataCity, setDataCity] = useState([])
    const [dataCourier, setDataCourier] = useState(['jne', 'pos', 'tiki'])
    const [dataOption, setDataOption] = useState([])
    const [selectedProv, setSelectedProv] = useState(0)
    const [selectedCity, setSelectedCity] = useState(1)
    const [selectedCourier, setSelectedCourier] = useState('')
    const [selectedOption, setSelectedOption] = useState("")
    const [originCity, setOriginCity] = useState(399)
    const [weight, setWeight] = useState(1000)
    const [fullAddress, setFullAddress] = useState("")
    const [packaging, setPackaging] = useState("map|2000")
    const [urlImg, setUrlImg] = useState("")
    const [isComplete, setIsComplete] = useState(false)
    const [inBound, setInBound] = useState(false)
    const [bubbleWrap, setBubbleWrap] = useState(true)
    const [isConfirmed, setIsConfirmed] = useState(false)
    const [codeID, setCodeID] = useState(0)
    const [step, setStep] = useState(1)
    const [toNext, setToNext] = useState(false)
    const [lastStep, setLastStep] = useState(1)
    const [userName, setUserName] = useState("")
    const [emailUser, setEmaiUser] = useState("")
    const [phoneUser, setPhoneUser] = useState("")
    const [popUp, setPopUp] = useState(true)
    const [typeMsg, setTypeMsg] = useState(0)
    const [msg, setMsg] = useState("")

    const handleBuy = async () => {
        const timeStamp = Math.floor(new Date().getTime() / 1000)
        const data = {
            produkID: 1,
            provinsi: selectedProv,
            city: selectedCity,
            alamat: fullAddress,
            img: urlImg,
            kurir: selectedCourier,
            pengiriman: handleEcommerce + "|" + unameEcommerce,
            qty: urlImg.length,
            packaging: packaging,
            bubble_wrap: bubbleWrap,
            price: parseInt(price) * urlImg.length + parseInt(packaging.split("|")[1]) + (inBound ? 0 : 1000),
            userID: "CST" + timeStamp,
            buyStatus: 0,
            userName: userName,
            email: emailUser,
            phone: phoneUser
        }
        setCodeID(timeStamp)
        await set(ref(FIREBASE_DB, "transactions/" + "CUSTM" + "A" + timeStamp), data)
            .then(() => {
                <Navigate to="/products" />
                setIsConfirmed(true);
            })
            .catch((error) => {
                console.log(error)
            });
    }

    useEffect(() => {
        if (step == 1 && urlImg.length >= 1) {
            setToNext(true)
        }
        if (step == 2) {
            setToNext(true)
        }
        if (step == 3 && unameEcommerce != "") {
            setToNext(true)
        }
        if (urlImg != "" && userName != "" && emailUser != "" && phoneUser != "") {
            setIsComplete(true)
        }
        else {
            setIsComplete(false)
        }
        if (!popUp) {
            return (<Navigate to="/products" />)
        }
    }, [popUp, packaging, selectedProv, selectedCity, selectedCourier, unameEcommerce, fullAddress, urlImg, step, userName, emailUser, phoneUser])

    useEffect(() => {
        setIsLoading(true)
        fetch('https://proud-plum-duckling.cyclic.app/api/provinsi', {
            method: 'GET',
        })
            .then((resp) => {
                if (!resp.ok) {
                    throw new Error('Network response was not ok');
                }
                return resp.json();
            })
            .then((data) => {
                setDataProv(data.rajaongkir.results);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
        fetch('https://proud-plum-duckling.cyclic.app/api/kota/1', {
            method: 'GET',
        })
            .then((resp) => {
                if (!resp.ok) {
                    throw new Error('Network response was not ok');
                }
                return resp.json();
            })
            .then((data) => {
                setDataCity(data.rajaongkir.results);
                setIsLoading(false)
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setIsLoading(false)
            })
    }, []);

    const handleProv = (e) => {
        setIsLoading(true)
        setSelectedProv(e.target.value)
        fetch('https://proud-plum-duckling.cyclic.app/api/kota/' + e.target.value, {
            method: 'GET',
        })
            .then((resp) => {
                if (!resp.ok) {
                    throw new Error('Network response was not ok');
                }
                return resp.json();
            })
            .then((data) => {
                setDataCity(data.rajaongkir.results);
                setIsLoading(false)
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setIsLoading(false)
            });
    }

    const handleCity = (e) => {
        setSelectedCity(e.target.value)
        if (e.target.value == originCity) {
            setDataCourier(['jne', 'pos', 'tiki', 'gojek', 'grab'])
            setInBound(true)
        }
        else {
            setInBound(false)
        }
    }
    const handleCourier = (e) => {
        setIsLoading(true)
        if (e.target.value == 'gojek' || e.target.value == 'grab') {
            setDataOption({
                "code": "COD",
                "name": "POS Indonesia (POS)",
                "costs": [
                    {
                        "service": "COD",
                        "description": "Pos Reguler",
                        "cost": [
                            {
                                "value": 0,
                                "etd": "1-2 HARI",
                                "note": ""
                            }
                        ]
                    }
                ]
            })
            setIsLoading(false)
        }
        else {
            setSelectedCourier(e.target.value)
            fetch(`https://proud-plum-duckling.cyclic.app/api/ongkos/${originCity}/${selectedCity}/${weight}/${e.target.value}`, {
                method: 'GET',
            })
                .then((resp) => {
                    if (!resp.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return resp.json();
                })
                .then((data) => {
                    setDataOption(data.rajaongkir.results[0]);
                    setIsLoading(false)
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                    setIsLoading(false)
                });
        }
    }

    const handleStepUp = (e) => {
        e.preventDefault()
        if (lastStep < step) setLastStep(step)
        if (step < 5) {
            if (lastStep < step) {
                setToNext(false)
            }
            setStep(step + 1)
        }
    }

    const handleStepDown = (e) => {
        e.preventDefault()
        if (step == 1) {
        }
        else {
            setStep(step - 1)
        }
    }

    return (
        <div className='w-full h-screen bg-black bg-opacity-30 fixed left-0 top-0 flex justify-center items-center flex-col z-50 '>
            {isLoading ? <Loading /> : null}
            <Message msg={msg} type={typeMsg} setType={setTypeMsg} />
            {/* Heading */}
            {isConfirmed ? <PopUpCustom setPopUp={setIsConfirmed} price={(parseInt(price) * (urlImg.length) + parseInt(packaging.split("|")[1]) + (inBound ? 0 : 1000))} code={"CUSTM" + 'A' + codeID} /> :
                <div className='flex bg-slate-50 flex-col w-full h-full relative'>
                    <div className='w-full bg-slate-50 shadow py-4 gap-x-6 flex justify-center items-center'>
                        <div className='flex items-center justify-center'>
                            <span className={`text-xl w-10 h-10 ${step > 1 ? "bg-amber-600 text-white" : "border-amber-800 border text-amber-800"}  rounded-full flex justify-center items-center font-semibold`}>{step > 1 ? <AiOutlineCheck /> : "1"}</span>
                            <span className='text-sm text-opacity-80 ml-2 text-slate-700'>Upload Foto</span>
                        </div>
                        <div className='flex items-center justify-center'>
                            <span className={`text-xl w-10 h-10 ${step > 2 ? "bg-amber-600 text-white" : "border-amber-800 border text-amber-800"}  rounded-full flex justify-center items-center font-semibold`}>{step > 2 ? <AiOutlineCheck /> : "2"}</span>
                            <span className='text-sm text-opacity-80 ml-2 text-slate-700'>Pilih Packaging</span>
                        </div>
                        <div className='flex items-center justify-center'>
                            <span className={`text-xl w-10 h-10 ${step > 3 ? "bg-amber-600 text-white" : "border-amber-800 border text-amber-800"}  rounded-full flex justify-center items-center font-semibold`}>{step > 3 ? <AiOutlineCheck /> : "3"}</span>
                            <span className='text-sm text-opacity-80 ml-2 text-slate-700'>Isi Data</span>
                        </div>
                        <div className='flex items-center justify-center'>
                            <span className={`text-xl w-10 h-10 ${step > 4 ? "bg-amber-600 text-white" : "border-amber-800 border text-amber-800"}  rounded-full flex justify-center items-center font-semibold`}>{step > 4 ? <AiOutlineCheck /> : "4"}</span>
                            <span className='text-sm text-opacity-80 ml-2 text-slate-700'>Konfirmasi Pembayaran</span>
                        </div>
                    </div>

                    {/* Step Upload Image */}
                    {step == 1 ?
                        <div className='bg-slate-200 h-full'>
                            <div className='bg-slate-50 mt-10 mx-10 px-5 py-8'>
                                <p className='text-slate-800 font-semibold'>Masukkan Gambar</p>
                                <p className='text-slate-600 text-xs'>Upload file hanya dengan ekstensi .jpg .png .heic atau .jpeg</p>
                                <div className='mt-6'>
                                    <ImageUpload url={urlImg} setUrl={setUrlImg} setIsLoading={setIsLoading} setMsg={setMsg} setType={setTypeMsg} />
                                </div>
                            </div>

                        </div>
                        : step == 2 ?
                            <div className='bg-slate-200 h-full'>
                                <div className='bg-slate-50 mt-10 mx-10 px-5 py-8'>
                                    <p className='text-slate-800 font-semibold'>Pilih Packaging yang Digunakan</p>
                                    <p className='text-slate-600 text-xs'>Setiap Packaging memiliki harga masing-masing</p>
                                    <div className='flex justify-around gap-5  mt-8'>
                                        <a onClick={() => setPackaging("map|2000")} className={`rounded-lg ${packaging == "map|2000" ? "border-4 border-blue-600" : ""} flex flex-col w-64 h-64 cursor-pointer shadow-lg`}>
                                            <img className='w-full h-full object-cover rounded-lg' src={MapWrap} />
                                            <p className='text-xl bg-amber-800 text-center text-white font-semibold mt-4 py-2'>+ Rp 2.000<sub className='text-xs font-light'>/item</sub></p>
                                        </a>
                                        <a onClick={() => setPackaging("box|3000")} className={`rounded-lg ${packaging == "box|3000" ? "border-4 border-blue-600" : ""} flex flex-col w-64 h-64 cursor-pointer shadow-lg`}>
                                            <img className='w-full h-full object-cover rounded-lg' src={BoxWrap} />
                                            <p className='text-xl bg-amber-800 text-center text-white font-semibold mt-4 py-2'>+ Rp 3.000<sub className='text-xs font-light'>/item</sub></p>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            : step == 3 ?
                                <div className='bg-slate-200 h-full'>
                                    <div className='bg-slate-50 flex mt-10 mx-10 px-5 py-8'>
                                        <div className='flex-1 flex flex-col px-4'>
                                            <label className='text-slate-800 mt-4 text-xs'>Pilih E-Commerce</label>
                                            <select className='border boder-amber-800 border-opacity-50 px-1 py-1.5 text-md mt-1 text-amber-950' onChange={setHandleEcommerce} name="Kota">
                                                <option value={'Tokopedia'} >Tokopedia</option>
                                                <option value={'Shopee'} >Shopee</option>
                                            </select>
                                        </div>
                                        <div className='flex-1 flex flex-col px-4'>
                                            <label className='text-slate-800 mt-4 text-xs'>Nama Akun</label>
                                            <input className='border boder-amber-800 px-1 py-1.5 text-md mt-1 text-amber-950' type="text" value={unameEcommerce} onChange={(e) => setUnameEcommerce(e.currentTarget.value)} required />
                                        </div>
                                    </div>
                                </div>
                                :

                                <div className='bg-slate-200 h-full'>
                                    <div className='bg-slate-50 flex flex-col mt-2 mx-auto w-5/12 px-5 py-4'>
                                        <div className='flex flex-col'>
                                            <label className='text-slate-800 text-xs'>Nama Lengkap</label>
                                            <input className='border boder-amber-800 px-1 py-1.5 text-md mt-1 text-amber-950' type="text" value={userName} onChange={(e) => setUserName(e.currentTarget.value)} required />
                                        </div>
                                        <div className='flex justify-between gap-x-2'>
                                            <div className='flex flex-col flex-1'>
                                                <label className='text-slate-800 mt-4 text-xs'>Email</label>
                                                <input className='border boder-amber-800 px-1 py-1.5 text-md mt-1 text-amber-950' type="text" value={emailUser} onChange={(e) => setEmaiUser(e.currentTarget.value)} required />
                                            </div>
                                            <div className='flex flex-col flex-1'>
                                                <label className='text-slate-800 mt-4 text-xs'>No WA</label>
                                                <input className='border boder-amber-800 px-1 py-1.5 text-md mt-1 text-amber-950' type="text" value={phoneUser} onChange={(e) => setPhoneUser(e.currentTarget.value)} required />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='bg-slate-50 flex flex-col mt-2 mx-auto w-5/12 px-5 py-5'>
                                        {console.log(parseInt(price), (urlImg.length))}
                                        <p className='text-amber-950 mt-1 flex justify-between'><span>Harga Produk</span> <span>{(parseInt(price) * (urlImg.length)).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })},-</span></p>
                                        <p className='text-amber-950 mt-1 flex justify-between'><span>Harga Packaging</span> <span>{parseInt(packaging.split("|")[1]).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })},-</span></p>
                                        {inBound ? null :
                                            <p className='text-amber-950 mt-1 flex justify-between'><span>Bubble Wrap</span> <span>{parseInt(1000).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })},-</span></p>
                                        }
                                        <hr className='mt-3 opacity-80' />
                                        <p className='text-amber-950 mt-1 flex justify-between'><span>Total</span> <span>{(parseInt(price) * (urlImg.length)  + parseInt(packaging.split("|")[1]) + (inBound ? 0 : 1000)).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })},-</span></p>
                                        <div className='w-full text-center mt-5'>
                                            {isComplete ?
                                                <a onClick={handleBuy} className='bg-amber-500 cursor-pointer flex px-5 justify-center py-1.5'>
                                                    Konfirmasi Sekarang
                                                </a>
                                                :
                                                <a className='bg-slate-500 cursor-not-allowed flex px-5 justify-center py-1.5'>
                                                    Konfirmasi Sekarang
                                                </a>
                                            }
                                        </div>
                                    </div>
                                </div>
                    }
                    <div className='w-full flex justify-between bg-slate-200 items-center'>
                        <button className='flex justify-center items-center bg-amber-800 px-6 py-2' onClick={handleStepDown}>
                            <BiArrowBack className='text-xl text-white' />
                            <span className='text-white ml-2'>Kembali</span>
                        </button>
                        {toNext || (lastStep > step) ?
                            <button className={`flex justify-center items-center bg-amber-800 px-6 py-2 ${step == 4 ? "hidden" : ""}`} onClick={handleStepUp}>
                                <BsArrowRight className='text-xl text-white' />
                                <span className='text-white ml-2'>Lanjut</span>
                            </button>
                            :
                            <button className={`flex justify-center items-center bg-slate-800 px-6 py-2 ${step == 4 ? "hidden" : ""}`} disabled onClick={handleStepUp}>
                                <BsArrowRight className='text-xl text-white' />
                                <span className='text-white ml-2'>Lanjut</span>
                            </button>
                        }

                    </div>
                </div>
            }
        </div>
    )
}

export default CustomForm