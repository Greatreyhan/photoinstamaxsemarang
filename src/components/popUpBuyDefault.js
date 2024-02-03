import React, { useEffect, useState } from 'react'
import { BiArrowBack } from "react-icons/bi"
import { AiOutlineCheck } from "react-icons/ai"
import { BsArrowRight } from "react-icons/bs"
import Loading from './Loading'
import axios from 'axios'
import { useFirebase } from "../FirebaseContext";
import { FIREBASE_DB } from '../config/firebaseinit';
import { set, ref, onValue } from "firebase/database"
import Confirmation from './Confirmation';
const PopupBuyDefault = ({ name, price, setPopBuy, ProdukID, ImageSource }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [dataProv, setDataProv] = useState([])
  const [dataCity, setDataCity] = useState([])
  const [dataSubdistrict, setDataSubdistrict] = useState([])
  const [dataCourier, setDataCourier] = useState(['jne', 'jnt', 'pos', 'tiki'])
  const [dataOption, setDataOption] = useState([])
  const [selectedProv, setSelectedProv] = useState(0)
  const [selectedCity, setSelectedCity] = useState(1)
  const [selectedSubdistrict, setSelectedSubdistrict] = useState(1)
  const [selectedCourier, setSelectedCourier] = useState('')
  const [selectedOption, setSelectedOption] = useState("")
  const [originCity, setOriginCity] = useState(399)
  const [originSubdistrict, setOriginSubdistrict] = useState(5501)
  const [weight, setWeight] = useState(1000)
  const [fullAddress, setFullAddress] = useState("")
  const [qty, setQty] = useState(1)
  const [packaging, setPackaging] = useState("map|2000")
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

  const handleBuy = async () => {
    const cr = selectedOption.split("|");
    const data = {
      produkID: ProdukID,
      provinsi: selectedProv,
      city: selectedCity,
      subdistrict : selectedSubdistrict,
      alamat: fullAddress,
      img: ImageSource,
      kurir: selectedCourier,
      pengiriman: cr[0],
      qty: qty,
      packaging: "",
      bubble_wrap: bubbleWrap,
      price: parseInt(price) * qty + parseInt(cr[1], 10) + (bubbleWrap ? 2000 : 0),
      userID: user.uid,
      buyStatus: 0,
    }

    const timeStamp = Math.floor(new Date().getTime() / 1000)
    setCodeID(timeStamp)
    await set(ref(FIREBASE_DB, "transactions/" + user.uid.slice(0, 5) + "A" + timeStamp), data)
      .then(() => {
        setIsConfirmed(true)
      })
      .catch((error) => {
        console.log(error)
      });

    const updatedTransactionData = [...transactionData, (user.uid.slice(0, 5) + "A" + timeStamp)];
    await set(ref(FIREBASE_DB, "user/" + user.uid + "/transaction/"), updatedTransactionData)
      .then(() => {
        setIsConfirmed(true)
      })
      .catch((error) => {
        console.log(error)
      });
  }

  useEffect(() => {
    if (step == 1 && selectedOption != "" && fullAddress != "") {
      setToNext(true)
    }
    if (selectedProv != 0 && selectedCourier != '' && selectedOption != "" && qty >= 1) {
      setIsComplete(true)
    }
    if (qty < 1) {
      setQty(1)
      setIsComplete(false)
    }

  }, [packaging, selectedProv, selectedCity, selectedCourier, selectedOption, fullAddress, qty, step])

  useEffect(() => {
    setIsLoading(true)
    fetch(process.env.REACT_APP_BASE_URL + '/provinsi', {
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
    fetch(process.env.REACT_APP_BASE_URL + '/kota/1', {
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
    fetch(process.env.REACT_APP_BASE_URL + '/kota/' + e.target.value, {
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
    setIsLoading(true)
    setSelectedCity(e.target.value)
    if (e.target.value.match(/\d+/)[0] == originCity) {
      setDataCourier(['jne', 'jnt', 'pos', 'tiki', 'gojek', 'ambil sendiri'])
      setInBound(true)
    }
    else {
      setInBound(false)
    }

    // Get Data Kecamatan
    fetch(process.env.REACT_APP_BASE_URL + '/kecamatan/' + e.target.value, {
      method: 'GET',
    })
      .then((resp) => {
        if (!resp.ok) {
          throw new Error('Network response was not ok');
        }
        return resp.json();
      })
      .then((data) => {
        console.log(data)
        setDataSubdistrict(data.rajaongkir.results);
        setIsLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setIsLoading(false)
      });
  }

  const handleSubdistrict = (e) => {
    console.log(e.target.value)
    setSelectedSubdistrict(e.target.value)
  }

  const handleCourier = (e) => {
    setSelectedCourier(e.target.value)
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
      const payload = {
        origin: originSubdistrict,
        originType: "subdistrict",
        destination: selectedSubdistrict,
        destinationType: "subdistrict",
        weight: weight,
        courier: e.target.value
      }
      axios.post(process.env.REACT_APP_BASE_URL + '/ongkos', payload)
        .then((response) => {
          const data = response.data;
          setDataOption(data.rajaongkir.results[0]);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setIsLoading(false);
        });
    }
  }

  const handleStepUp = (e) => {
    e.preventDefault()
    if (lastStep < step) setLastStep(step)
    if (step < 2) {
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
      {isConfirmed ? <Confirmation setIsConfirmed={setIsConfirmed} setPopUp={setPopBuy} produk={(parseInt(price) * (qty)).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })} total={((parseInt(price) * (qty)) + parseInt(selectedOption.split("|")[1], 10) + (bubbleWrap ? 2000 : 0)).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })} code={"CUSTM" + 'A' + codeID} packaging={parseInt(0).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })} bubble={(bubbleWrap ? 2000 : 0).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })} ongkir={(parseInt(selectedOption.split("|")[1], 10)).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })} /> :
        <div className='flex bg-slate-50 flex-col w-full h-full relative'>
          <div className='w-full bg-slate-50 shadow py-4 gap-x-6 flex justify-center items-center'>
            <div className='flex items-center justify-center'>
              <span className={`text-xl w-10 h-10 ${step > 1 ? "bg-amber-600 text-white" : "border-amber-800 border text-amber-800"}  rounded-full flex justify-center items-center font-semibold`}>{step > 1 ? <AiOutlineCheck /> : "1"}</span>
              <span className='text-sm text-opacity-80 ml-2 text-slate-700'>Pilih pengiriman</span>
            </div>
            <div className='flex items-center justify-center'>
              <span className={`text-xl w-10 h-10 ${step > 2 ? "bg-amber-600 text-white" : "border-amber-800 border text-amber-800"}  rounded-full flex justify-center items-center font-semibold`}>{step > 2 ? <AiOutlineCheck /> : "2"}</span>
              <span className='text-sm text-opacity-80 ml-2 text-slate-700'>Konfirmasi Pembayaran</span>
            </div>
          </div>
          {step == 1 ?
            <div className='bg-slate-200 h-full'>
              <div className='bg-slate-50 flex flex-wrap mt-10 mx-10 px-5 py-8'>
                <div className='flex-1 flex flex-col px-4'>

                  {/* Pilih Provinsi */}
                  <label className='text-slate-800 mt-4 text-xs'>Pilih Provinsi</label>
                  <select className='border boder-amber-800 border-opacity-50 px-1 py-1.5 text-md mt-1 text-amber-950' onChange={handleProv} name="Provinsi">
                    <option value={0} >Pilih Provinsi</option>
                    {dataProv ? dataProv.map(prov => {
                      return (<option value={prov.province_id + "|" + prov.province} key={prov.province_id}>{prov.province}</option>)
                    }) : null}
                  </select>

                  {/* Pilih Kota */}
                  <label className='text-slate-800 mt-4 text-xs'>Pilih Kota</label>
                  <select className='border boder-amber-800 border-opacity-50 px-1 py-1.5 text-md mt-1 text-amber-950' onChange={handleCity} name="Kota">
                    <option value={0} >Pilih Kota</option>
                    {dataCity ? dataCity.map(city => {
                      return (<option value={city.city_id + "|" + city.city_name} key={city.city_id}>{city.type} {city.city_name}</option>)
                    }) : null}
                  </select>

                  {/* Pilih Kecamatan */}
                  <label className='text-slate-800 mt-4 text-xs'>Pilih Kecamatan</label>
                  <select className='border boder-amber-800 border-opacity-50 px-1 py-1.5 text-md mt-1 text-amber-950' onChange={handleSubdistrict} name="Kecamatan">
                    <option value={0} >Pilih Kecamatan</option>
                    {dataSubdistrict ? dataSubdistrict.map(disctrict => {
                      return (<option value={disctrict.subdistrict_id + "|" + disctrict.subdistrict_name} key={disctrict.subdistrict_id}>{disctrict.type} {disctrict.subdistrict_name}</option>)
                    }) : null}
                  </select>

                </div>
                <div className='flex-1 flex flex-col px-4'>

                  {/* Pilih Kurir */}
                  <label className='text-slate-800 mt-4 text-xs'>Pilih Kurir</label>
                  <select className='border boder-amber-800 border-opacity-50 px-1 py-1.5 text-md mt-1 text-amber-950' onChange={handleCourier} name="choice">
                    <option value={0} >Pilih Kurir</option>
                    {dataCourier ? dataCourier.map((courierList, i) => {
                      return (<option value={courierList} key={i}>{courierList.toUpperCase()}</option>)
                    }) : null}
                  </select>

                  {/* Pilih Jenis Pengiriman */}
                  <label className='text-slate-800 mt-4 text-xs'>Pilih Jenis Pengiriman</label>
                  <select className='border boder-amber-800 border-opacity-50 px-1 py-1.5 text-md mt-1 text-amber-950' onChange={(e) => setSelectedOption(e.target.value)} name="choice">
                    <option value={0} >Pilih Pengiriman</option>
                    {dataOption.costs ? dataOption.costs.map((option, i) => {
                      return (<option className='' value={option.service + '|' + parseInt(option.cost[0].value)} key={i}><span className='text-xs'>{option.service}</span> | <span>{parseInt(option.cost[0].value) == 0 ? "CHAT ADMIN" : new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(parseInt(option.cost[0].value))}</span> | <span>{option.cost[0].etd} Hari</span></option>)
                    }) : null}
                  </select>

                  {/* Masukkan Alamat Lengkap */}
                  <div className='flex flex-col'>
                    <label className='text-slate-800 mt-4 text-xs'>Alamat Lengkap</label>
                    <input className='border boder-amber-800 px-1 py-1.5 text-md mt-1 text-amber-950' type="text" value={fullAddress} onChange={(e) => setFullAddress(e.currentTarget.value)} required />
                  </div>

                  <div className='flex flex-col mt-2'>
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
              <div className='bg-slate-50 flex flex-col mt-10 mx-auto md:w-5/12 w-11/12 px-5 py-8'>
                <p className='text-amber-950 mt-1 flex justify-between'><span>{name}</span> <span><input className='border-b-2 text-center border-amber-500' type="number" min="1" max="99" value={qty} onChange={(e) => setQty(e.currentTarget.value)} /> barang</span></p>
                <p className='text-amber-950 mt-1 flex justify-between'><span>Jenis Pengiriman</span> <span className='uppercase'>{selectedCourier + "-" + selectedOption.split("|")[0]} </span></p>
              </div>
              <div className='bg-slate-50 flex flex-col mt-4 mx-auto  md:w-5/12 w-11/12 px-5 py-8'>
                <p className='text-amber-950 mt-1 flex justify-between'><span>Harga Produk</span> <span>{selectedOption != "" ? (parseInt(price) * (qty)).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }) : 'Rp 0'}</span></p>
                <p className='text-amber-950 mt-1 flex justify-between'><span>Ongkos Kirim</span> <span>{selectedOption != "" ? (parseInt(selectedOption.split("|")[1], 10)).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }) : 'Rp 0'}</span></p>
                <p className='text-amber-950 mt-1 flex justify-between'><span>Bubble Wrap</span> <span>{bubbleWrap ? 'Rp 2.000,00' : 'Rp 0'}</span></p>
                <hr className='mt-3 opacity-80' />
                <p className='text-amber-950 mt-1 flex justify-between'><span>Total</span> <span>{selectedOption != "" ? (parseInt(price) * (qty) + parseInt(selectedOption.split("|")[1], 10) + (bubbleWrap ? 2000 : 0)).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }) : 'Rp 0'}</span></p>
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
          <div className='w-full fixed bottom-0 flex justify-between bg-slate-200 items-center'>
            <button className='flex justify-center items-center bg-amber-800 px-6 py-2' onClick={handleStepDown}>
              <BiArrowBack className='text-xl text-white' />
              <span className='text-white ml-2'>Kembali</span>
            </button>
            {toNext || (lastStep > step) ?
              <button className={`flex justify-center items-center ${step > 1 ? "hidden" : ""} bg-amber-800 px-6 py-2`} onClick={handleStepUp}>
                <BsArrowRight className='text-xl text-white' />
                <span className='text-white ml-2'>Lanjut</span>
              </button>
              :
              <button className={`flex justify-center items-center ${step > 1 ? "hidden" : ""} bg-slate-800 px-6 py-2`} disabled onClick={handleStepUp}>
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

export default PopupBuyDefault