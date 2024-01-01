import React, { useEffect, useState } from 'react'
import { BiArrowBack } from "react-icons/bi"
import { AiOutlineCheck } from "react-icons/ai"
import { BsArrowRight } from "react-icons/bs"
import Loading from './Loading'
import { ImageUpload } from '../pages'
import { useFirebase } from "../FirebaseContext";
import { FIREBASE_DB } from '../config/firebaseinit';
import { set, ref, onValue } from "firebase/database"
import Confirmation from './Confirmation';
import { BoxWrap, HeroProduct, MapWrap } from '../assets'
import Message from './Message'
const PopupBuy = ({ name, price, setPopBuy, ProdukID }) => {
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
  const { user } = useFirebase();
  const [codeID, setCodeID] = useState(0)
  const [transactionData, setTransactionData] = useState([])
  const [step, setStep] = useState(1)
  const [toNext, setToNext] = useState(false)
  const [lastStep, setLastStep] = useState(1)
  const [typeMsg, setTypeMsg] = useState(0)
  const [msg, setMsg] = useState("")

  const handleBuy = async () => {
    const cr = selectedOption.split("|");
    const data = {
      produkID: ProdukID,
      provinsi: selectedProv,
      city: selectedCity,
      alamat: fullAddress,
      img: urlImg,
      kurir: selectedCourier,
      pengiriman: cr[0],
      qty: urlImg.length,
      packaging: packaging,
      bubble_wrap: bubbleWrap,
      price: parseInt(price) * urlImg.length + parseInt(cr[1], 10) + parseInt(packaging.split("|")[1] * (urlImg.length)),
      userID: user.uid,
      buyStatus: 0,
    }
    console.log(data)
    const timeStamp = Math.floor(new Date().getTime() / 1000)
    setCodeID(timeStamp)
    await set(ref(FIREBASE_DB, "transactions/" + user.uid.slice(0, 5) + "A" + timeStamp), data)
      .then(() => {
        setIsConfirmed(true)
      })
      .catch((error) => {
        console.log(error)
      });
    await set(ref(FIREBASE_DB, "user/" + user.uid + "/transaction/"), [...transactionData, (user.uid.slice(0, 5) + "A" + timeStamp)])
      .then(() => {
        setIsConfirmed(true)
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
    if (selectedProv != 0 && selectedOption != "" && urlImg != "") {
      setIsComplete(true)
    }
  }, [packaging, selectedProv, selectedCity, selectedOption, fullAddress, urlImg, step])

  useEffect(() => {
    setIsLoading(true)
    fetch('https://photoinstax.onrender.com/api/provinsi', {
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
    fetch('https://photoinstax.onrender.com/api/kota/1', {
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
    onValue(ref(FIREBASE_DB, "user/" + user.uid + "/transaction"), (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const key = Object.keys(data);
        setTransactionData(data)
      }

    });
  }, []);

  const handleClose = (e) => {
    setPopBuy(false)
  }

  const handleProv = (e) => {
    setIsLoading(true)
    setSelectedProv(e.target.value)
    fetch('https://photoinstax.onrender.com/api/kota/' + e.target.value, {
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
    if (e.target.value.match(/\d+/)[0] == originCity) {
      setDataCourier(['jne', 'pos', 'tiki', 'gojek', 'ambil sendiri'])
      setInBound(true)
    }
    else {
      setInBound(false)
    }
  }
  const handleCourier = (e) => {
    setIsLoading(true)
    if (e.target.value == 'gojek' || e.target.value == 'ambil sendiri') {
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
      fetch(`https://photoinstax.onrender.com/api/ongkos/${originCity}/${selectedCity}/${weight}/${e.target.value}`, {
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
      handleClose()
    }
    else {
      setStep(step - 1)
    }
  }

  return (
    <div className='w-full h-screen bg-black bg-opacity-30 fixed left-0 top-0 flex justify-center items-center flex-col z-50'>
      {isLoading ? <Loading /> : null}
      <Message msg={msg} type={typeMsg} setType={setTypeMsg} />
      {isConfirmed ? <Confirmation setIsConfirmed={setIsConfirmed} setPopUp={setPopBuy} produk={(parseInt(price) * (urlImg.length)).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })} total={(parseInt(price) * (urlImg.length) + parseInt(packaging.split("|")[1]) + (inBound ? 0 : 1000) + (parseInt(selectedOption.split("|")[1], 10))).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })} code={user.uid.slice(0, 5) + 'A' + codeID} packaging={parseInt(packaging.split("|")[1]).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })} bubble={ inBound ? 0 : parseInt(1000).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })} ongkir={(parseInt(selectedOption.split("|")[1], 10)).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}  /> :
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
                    <a onClick={() => setPackaging("none|0")} className={`rounded-lg ${packaging == "none|0" ? "border-4 border-blue-600" : ""} flex flex-col w-64 h-64 cursor-pointer shadow-lg`}>
                      <img className='w-full h-full object-cover rounded-lg' src={HeroProduct} />
                      <p className='text-xl bg-amber-800 text-center text-white font-semibold mt-4 py-2'>Rp 0<sub className='text-xs font-light'>/item</sub></p>
                    </a>
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
                  {console.log(selectedCourier)}
                  <div className='bg-slate-50 flex flex-col mt-10 mx-auto w-5/12 px-5 py-8'>
                    <p className='text-amber-950 mt-1 flex justify-between'><span>{name}</span> <span>{urlImg ? urlImg.length : 0} barang</span></p>
                    <p className='text-amber-950 mt-1 flex justify-between'><span>Jenis Packaging</span> <span className='capitalize'>{packaging.split("|")[0]} </span></p>
                    <p className='text-amber-950 mt-1 flex justify-between'><span>Jenis Pengiriman</span> <span className='uppercase'>{selectedCourier + "-" + selectedOption.split("|")[0]} </span></p>
                  </div>
                  <div className='bg-slate-50 flex flex-col mt-4 mx-auto w-5/12 px-5 py-8'>
                    <p className='text-amber-950 mt-1 flex justify-between'><span>Harga Produk</span> <span>{selectedOption != "" ? (parseInt(price) * (urlImg.length)).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }) : 'Rp 0'},-</span></p>
                    <p className='text-amber-950 mt-1 flex justify-between'><span>Harga Packaging</span> <span>{parseInt(packaging.split("|")[1]).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })},-</span></p>
                    <p className='text-amber-950 mt-1 flex justify-between'><span>Ongkos Kirim</span> <span>{selectedOption != "" ? (parseInt(selectedOption.split("|")[1], 10)).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }) : 'Rp 0'},-</span></p>
                    <hr className='mt-3 opacity-80' />
                    <p className='text-amber-950 mt-1 flex justify-between'><span>Total</span> <span>{selectedOption != "" ? (parseInt(price) * (urlImg.length) + parseInt(selectedOption.split("|")[1], 10) + parseInt(packaging.split("|")[1])).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }) : 'Rp 0'},-</span></p>
                    <div className='w-full text-center mt-5'>
                      {isComplete ?
                        <a onClick={handleBuy} className='bg-amber-500 flex px-5 justify-center py-1.5'>
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
              <button className='flex justify-center items-center bg-amber-800 px-6 py-2' onClick={handleStepUp}>
                <BsArrowRight className='text-xl text-white' />
                <span className='text-white ml-2'>Lanjut</span>
              </button>
              :
              <button className='flex justify-center items-center bg-slate-800 px-6 py-2' disabled onClick={handleStepUp}>
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

export default PopupBuy