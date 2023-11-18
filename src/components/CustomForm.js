import React, { useEffect, useState } from 'react'
import { BiArrowBack } from "react-icons/bi"
import { AiOutlineCheck } from "react-icons/ai"
import { BsArrowRight } from "react-icons/bs"
import Loading from './Loading'
import { ImageUpload } from '../pages'
import { FIREBASE_DB } from '../config/firebaseinit';
import { set, ref, onValue } from "firebase/database"
import Confirmation from './Confirmation';
import { BoxWrap, MapWrap } from '../assets'
import { Navigate } from 'react-router-dom'
import PopUpCustom from './PopUpCustom'
const CustomForm = ({ price = 5000 }) => {
    const [isLoading, setIsLoading] = useState(false);
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
    const [qty, setQty] = useState(1)
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


    const handleBuy = async () => {
        const cr = selectedOption.split("|");
        const timeStamp = Math.floor(new Date().getTime() / 1000)
        const data = {
            produkID: 1,
            provinsi: selectedProv,
            city: selectedCity,
            alamat: fullAddress,
            img: urlImg,
            kurir: selectedCourier,
            pengiriman: cr[0],
            qty: urlImg.length,
            packaging: packaging,
            bubble_wrap: bubbleWrap,
            price: parseInt(price) * urlImg.length + parseInt(cr[1], 10) + parseInt(packaging.split("|")[1]) + (inBound ? 0 : 1000),
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
        if (step == 3 && selectedOption != "") {
            setToNext(true)
        }
        if (selectedProv != 0 && selectedCourier != '' && selectedOption != "" && urlImg != "" && userName != "" && emailUser != "" && phoneUser != "") {
            setIsComplete(true)
        }
        else {
            setIsComplete(false)
        }
        if(!popUp){
            return(<Navigate to="/products"/>)
        }
    }, [popUp,packaging, selectedProv, selectedCity, selectedCourier, selectedOption, fullAddress, urlImg, step, userName, emailUser, phoneUser])

    useEffect(() => {
        setIsLoading(true)
        fetch('http://localhost:4000/api/provinsi', {
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
        fetch('http://localhost:4000/api/kota/1', {
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
        fetch('http://localhost:4000/api/kota/' + e.target.value, {
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
            fetch(`http://localhost:4000/api/ongkos/${originCity}/${selectedCity}/${weight}/${e.target.value}`, {
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
            {isConfirmed ? <PopUpCustom setPopUp={setIsConfirmed} price={(parseInt(price) * (urlImg.length) + parseInt(selectedOption.split("|")[1], 10) + parseInt(packaging.split("|")[1]) + (inBound ? 0 : 1000))} code={"CUSTM" + 'A' + codeID} /> :
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
                            <span className='text-sm text-opacity-80 ml-2 text-slate-700'>Pilih pengiriman</span>
                        </div>
                        <div className='flex items-center justify-center'>
                            <span className={`text-xl w-10 h-10 ${step > 4 ? "bg-amber-600 text-white" : "border-amber-800 border text-amber-800"}  rounded-full flex justify-center items-center font-semibold`}>{step > 4 ? <AiOutlineCheck /> : "4"}</span>
                            <span className='text-sm text-opacity-80 ml-2 text-slate-700'>Konfirmasi Pembayaran</span>
                        </div>
                    </div>
                    {step == 1 ?
                        <div className='bg-slate-200 h-full'>
                            <div className='bg-slate-50 mt-10 mx-10 px-5 py-8'>
                                <p className='text-slate-800 font-semibold'>Masukkan Gambar</p>
                                <p className='text-slate-600 text-xs'>Upload file hanya dengan ekstensi .jpg .png .heic atau .jpeg</p>
                                <div className='mt-6'>
                                    <ImageUpload url={urlImg} setUrl={setUrlImg} />
                                </div>
                            </div>

                        </div>
                        : step == 2 ?
                            <div className='bg-slate-200 h-full'>
                                <div className='bg-slate-50 mt-10 mx-10 px-5 py-8'>
                                    <p className='text-slate-800 font-semibold'>Pilih Packaging yang Digunakan</p>
                                    <p className='text-slate-600 text-xs'>Setiap Packaging memiliki harga masing-masing</p>
                                    <div className='flex gap-5  mt-8'>
                                        <a onClick={() => setPackaging("map|2000")} className={`rounded-lg ${packaging == "map|2000" ? "border-4 border-blue-600" : ""} flex h-28 w-28 cursor-pointer shadow-lg`}>
                                            <img className='w-full h-full object-cover rounded-lg' src={MapWrap} />
                                        </a>
                                        <a onClick={() => setPackaging("box|3000")} className={`rounded-lg ${packaging == "box|3000" ? "border-4 border-blue-600" : ""} flex h-28 w-28 cursor-pointer shadow-lg`}>
                                            <img className='w-full h-full object-cover rounded-lg' src={BoxWrap} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                            : step == 3 ?
                                <div className='bg-slate-200 h-full'>
                                    <div className='bg-slate-50 flex mt-10 mx-10 px-5 py-8'>
                                        <div className='flex-1 flex flex-col px-4'>
                                            <label className='text-slate-800 mt-4 text-xs'>Pilih Provinsi</label>
                                            <select className='border boder-amber-800 border-opacity-50 px-1 py-1.5 text-md mt-1 text-amber-950' onChange={handleProv} name="Provinsi">
                                                <option value={0} >Pilih Provinsi</option>
                                                {dataProv ? dataProv.map(prov => {
                                                    return (<option value={prov.province_id + "|" + prov.province} key={prov.province_id}>{prov.province}</option>)
                                                }) : null}
                                            </select>
                                            <label className='text-slate-800 mt-4 text-xs'>Pilih Kota</label>
                                            <select className='border boder-amber-800 border-opacity-50 px-1 py-1.5 text-md mt-1 text-amber-950' onChange={handleCity} name="Kota">
                                                <option value={0} >Pilih Kota</option>
                                                {dataCity ? dataCity.map(city => {
                                                    return (<option value={city.city_id + "|" + city.city_name} key={city.city_id}>{city.type} {city.city_name}</option>)
                                                }) : null}
                                            </select>
                                            <div className='flex flex-col'>
                                                <label className='text-slate-800 mt-4 text-xs'>Alamat Lengkap</label>
                                                <input className='border boder-amber-800 px-1 py-1.5 text-md mt-1 text-amber-950' type="text" value={fullAddress} onChange={(e) => setFullAddress(e.currentTarget.value)} required />
                                            </div>
                                        </div>
                                        <div className='flex-1 flex flex-col px-4'>
                                            <label className='text-slate-800 mt-4 text-xs'>Pilih Kurir</label>
                                            <select className='border boder-amber-800 border-opacity-50 px-1 py-1.5 text-md mt-1 text-amber-950' onChange={handleCourier} name="choice">
                                                <option value={0} >Pilih Kurir</option>
                                                {dataCourier ? dataCourier.map((courierList, i) => {
                                                    return (<option value={courierList} key={i}>{courierList.toUpperCase()}</option>)
                                                }) : null}
                                            </select>
                                            <label className='text-slate-800 mt-4 text-xs'>Pilih Jenis Pengiriman</label>
                                            <select className='border boder-amber-800 border-opacity-50 px-1 py-1.5 text-md mt-1 text-amber-950' onChange={(e) => setSelectedOption(e.target.value)} name="choice">
                                                <option value={0} >Pilih Pengiriman</option>
                                                {dataOption.costs ? dataOption.costs.map((option, i) => {
                                                    return (<option className='' value={option.service + '|' + parseInt(option.cost[0].value)} key={i}><span className='text-xs'>{option.service}</span> | <span>{parseInt(option.cost[0].value) == 0 ? "CHAT ADMIN" : new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(parseInt(option.cost[0].value))}</span> | <span>{option.cost[0].etd} Hari</span></option>)
                                                }) : null}
                                            </select>
                                            <div className='flex flex-col mt-8'>
                                                <div className='flex items-center mt-4'>
                                                    {inBound ?
                                                        <input type="checkbox" onChange={e => setBubbleWrap(e.currentTarget.value)} value={bubbleWrap} />
                                                        :
                                                        <input type="checkbox" value={() => setBubbleWrap(true)} checked />
                                                    }
                                                    <label className='ml-1 text-xs text-slate-800'>Bubble Wrap</label>
                                                </div>
                                            </div>
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
                                        <p className='text-amber-950 mt-1 flex justify-between'><span>Harga Produk</span> <span>{selectedOption != "" ? (parseInt(price) * (urlImg.length)).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }) : 'Rp 0'},-</span></p>
                                        <p className='text-amber-950 mt-1 flex justify-between'><span>Harga Packaging</span> <span>{parseInt(packaging.split("|")[1]).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })},-</span></p>
                                        {inBound ? null :
                                            <p className='text-amber-950 mt-1 flex justify-between'><span>Bubble Wrap</span> <span>{parseInt(1000).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })},-</span></p>
                                        }
                                        <p className='text-amber-950 mt-1 flex justify-between'><span>Ongkos Kirim</span> <span>{selectedOption != "" ? (parseInt(selectedOption.split("|")[1], 10)).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }) : 'Rp 0'},-</span></p>
                                        <hr className='mt-3 opacity-80' />
                                        <p className='text-amber-950 mt-1 flex justify-between'><span>Total</span> <span>{selectedOption != "" ? (parseInt(price) * (urlImg.length) + parseInt(selectedOption.split("|")[1], 10) + parseInt(packaging.split("|")[1]) + (inBound ? 0 : 1000)).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }) : 'Rp 0'},-</span></p>
                                        <div className='w-full text-center mt-5'>
                                            {isComplete ?
                                                <a onClick={handleBuy} className='bg-amber-500 cursor-pointer flex px-5 justify-center py-1.5'>
                                                    Beli Sekarang
                                                </a>
                                                :
                                                <a className='bg-slate-500 cursor-not-allowed flex px-5 justify-center py-1.5'>
                                                    Beli Sekarang
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