import React, { useEffect, useState } from 'react'
import { AiOutlineClose } from "react-icons/ai"
import Loading from './Loading'
import { useFirebase } from "../FirebaseContext";
import { FIREBASE_DB } from '../config/firebaseinit';
import { set, ref, onValue, remove } from "firebase/database"
import Confirmation from './Confirmation';
import { MdKeyboardBackspace } from "react-icons/md"
const PopUpChekcout = ({ list, price, weightTotal, setPopUp, dataCart }) => {
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
  const [packaging, setPackaging] = useState("map")
  const [urlImg, setUrlImg] = useState("")
  const [isComplete, setIsComplete] = useState(false)
  const [inBound, setInBound] = useState(false)
  const [bubbleWrap, setBubbleWrap] = useState(true)
  const [isConfirmed, setIsConfirmed] = useState(false)
  const { user } = useFirebase();
  const [codeID, setCodeID] = useState(0)
  const [transactionData, setTransactionData] = useState([])

  const handleBuy = async () => {
    let goodsId = []
    list.map(i => {
      onValue(ref(FIREBASE_DB, "carts/" + i), (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const key = Object.keys(data);
          goodsId.push(data)
        }
      });
      remove(ref(FIREBASE_DB, "user/" + user.uid + "/cart/" + dataCart.indexOf(i)))
        .then(() => {
          list.splice(list.indexOf(i), 1)
        })
        .catch((error) => {
          console.log(error)
        });
      remove(ref(FIREBASE_DB, "carts/" + i))
        .then(() => {
        })
        .catch((error) => {
          console.log(error)
        });
    })
    const cr = selectedOption.split("|");
    const data = {
      produkID: goodsId,
      provinsi: selectedProv,
      city: selectedCity,
      alamat: fullAddress,
      img: goodsId[0].img,
      kurir: selectedCourier,
      pengiriman: cr[0],
      qty: list.length,
      packaging: packaging,
      bubble_wrap: bubbleWrap,
      weight: weightTotal,
      price: parseInt(price) + parseInt(selectedOption.split("|")[1], 10),
      userID : user.uid,
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
    await set(ref(FIREBASE_DB, "user/" + user.uid + "/transaction/"), [...transactionData, (user.uid.slice(0, 5) + "A" + timeStamp)])
      .then(() => {
        setIsConfirmed(true)
      })
      .catch((error) => {
        console.log(error)
      });
  }

  useEffect(() => {
    if (selectedProv != 0 && selectedCourier != '' && selectedOption != "" && fullAddress != "") {
      setIsComplete(true)
    }
  }, [selectedProv, selectedCity, selectedCourier, selectedOption, fullAddress])

  useEffect(() => {
    console.log(dataCart)
    setWeight(weightTotal)
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
    onValue(ref(FIREBASE_DB, "user/" + user.uid + "/transaction"), (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const key = Object.keys(data);
        setTransactionData(data)
      }
    });
  }, []);

  const handleClose = (e) => {
    setPopUp(false)
  }

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

  return (
    <div className='w-full h-screen bg-black bg-opacity-30 fixed left-0 top-0 flex justify-center items-center flex-col z-50'>
      {isLoading ? <Loading /> : null}
      {isConfirmed ? <Confirmation setIsConfirmed={setIsConfirmed} setPopUp={setPopUp} produk={(parseInt(price) * parseInt(qty)).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })} total={((parseInt(price) * parseInt(qty)) + (inBound ? 0 : 1000) + (parseInt(selectedOption.split("|")[1], 10))).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })} code={"CUSTM" + 'A' + codeID} packaging={(0).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })} bubble={ inBound ? 0 : parseInt(1000).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })} ongkir={(parseInt(selectedOption.split("|")[1], 10)).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}  /> :
        <>
          <div className='flex bg-slate-50 w-full h-full relative flex-wrap'>

            <div className='bg-slate-200 h-full flex-1'>
              <div className='bg-slate-50 mt-10 mx-10 px-5 py-8'>
                <div className='flex'>
                  <div className='flex-1 flex flex-col px-4'>
                    <label className='text-amber-950 mt-4 text-xs'>Pilih Provinsi</label>
                    <select className='border border-slate-400 border-opacity-50 px-1 py-1.5 text-md mt-1 text-amber-950' onChange={handleProv} name="Provinsi">
                      <option value={0} >Pilih Provinsi</option>
                      {dataProv ? dataProv.map(prov => {
                        return (<option value={prov.province_id + "|" + prov.province} key={prov.province_id}>{prov.province}</option>)
                      }) : null}
                    </select>
                    <label className='text-amber-950 mt-4 text-xs'>Pilih Kota</label>
                    <select className='border border-slate-400 border-opacity-50 px-1 py-1.5 text-md mt-1 text-amber-950' onChange={handleCity} name="Kota">
                      <option value={0} >Pilih Kota</option>
                      {dataCity ? dataCity.map(city => {
                        return (<option value={city.city_id + "|" + city.city_name} key={city.city_id}>{city.type} {city.city_name}</option>)
                      }) : null}
                    </select>
                    <div className='flex flex-col'>
                      <label className='text-amber-950 mt-4 text-xs'>Alamat Lengkap</label>
                      <input className='border border-slate-500 border-opacity-50 px-1 py-1.5 text-md mt-1 text-amber-950' type="text" value={fullAddress} onChange={(e) => setFullAddress(e.currentTarget.value)} required />
                    </div>
                  </div>
                  <div className='flex-1 flex flex-col px-4'>
                    <label className='text-amber-950 mt-4 text-xs'>Pilih Kurir</label>
                    <select className='border border-slate-400 border-opacity-50 px-1 py-1.5 text-md mt-1 text-amber-950' onChange={handleCourier} name="choice">
                      <option value={0} >Pilih Kurir</option>
                      {dataCourier ? dataCourier.map((courierList, i) => {
                        return (<option value={courierList} key={i}>{courierList.toUpperCase()}</option>)
                      }) : null}
                    </select>
                    <label className='text-amber-950 mt-4 text-xs'>Pilih Jenis Pengiriman</label>
                    <select className='border border-slate-400 border-opacity-50 px-1 py-1.5 text-md mt-1 text-amber-950' onChange={(e) => setSelectedOption(e.target.value)} name="choice">
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
            </div>

            <div className='bg-slate-200 h-full w-4/12 pr-10'>
              <div className='bg-slate-50 flex flex-col mt-10 mx-auto w-full px-5 py-8'>
                <p className='text-amber-950 mt-1 flex justify-between'><span>Total Harga</span> <span>{selectedOption != "" ? (parseInt(price)).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }) : 'Rp 0'},-</span></p>
                <p className='text-amber-950 mt-1 flex justify-between'><span>Ongkos Kirim</span> <span>{selectedOption != "" ? (parseInt(selectedOption.split("|")[1], 10)).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }) : 'Rp 0'},-</span></p>
                <hr className='mt-3 opacity-60' />
                <p className='text-amber-950 mt-1 flex justify-between'><span>Total</span> <span>{selectedOption != "" ? (parseInt(price) + parseInt(selectedOption.split("|")[1], 10)).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }) : 'Rp 0'},-</span></p>
                <div className='w-full text-center mt-5'>
                  {isComplete ?
                    <a onClick={handleBuy} className='bg-amber-500 cursor-pointer flex px-5 justify-center mx-4 py-1.5'>
                      Beli Sekarang
                    </a>
                    :
                    <a className='bg-slate-500 cursor-not-allowed flex px-5 justify-center mx-4 py-1.5'>
                      Beli Sekarang
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

export default PopUpChekcout