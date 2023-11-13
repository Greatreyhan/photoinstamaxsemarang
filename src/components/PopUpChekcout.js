import React, { useEffect, useState } from 'react'
import { AiOutlineClose } from "react-icons/ai"
import Loading from './Loading'
import { useFirebase } from "../FirebaseContext";
import {FIREBASE_DB} from '../config/firebaseinit';
import {set,ref, onValue, update} from "firebase/database"
import Confirmation from './Confirmation';
const PopUpChekcout = ({ list, price, weightTotal, setPopUp }) => {
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
    list.map(i=>{
      onValue(ref(FIREBASE_DB, "carts/" + i), (snapshot) => {
        const data = snapshot.val();
        if(data){
          const key = Object.keys(data);
          goodsId.push(data)
        }
      });
    })
    console.log(goodsId)
    const cr = selectedOption.split("|");
    const data = {
      produkID : goodsId,
      provinsi: selectedProv,
      city: selectedCity,
      alamat: fullAddress,
      img: goodsId[0].img,
      kurir: selectedCourier,
      pengiriman: cr[0],
      qty: list.length,
      packaging: packaging,
      bubble_wrap: bubbleWrap,
      price: parseInt(price) + parseInt(cr[1], 10),
      buyStatus : 0,
    }
    const timeStamp = Math.floor(new Date().getTime() / 1000)
    setCodeID(timeStamp)
    await set(ref(FIREBASE_DB, "transactions/" + user.uid.slice(0,5)+"A"+timeStamp), data)
      .then(() => {
        setIsConfirmed(true)
      })
      .catch((error) => {
        console.log(error)
      });
    await set(ref(FIREBASE_DB, "user/" + user.uid + "/transaction/"), [...transactionData,(user.uid.slice(0,5)+"A"+timeStamp)] )
      .then(() => {
        setIsConfirmed(true)
      })
      .catch((error) => {
        console.log(error)
      });
  }

  useEffect(() => {
    if (selectedProv != 0 && selectedCourier != '' && selectedOption != "") {
      setIsComplete(true)
    }
  }, [selectedProv, selectedCity, selectedCourier, selectedOption, fullAddress])

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
      onValue(ref(FIREBASE_DB, "user/" + user.uid + "/transaction"), (snapshot) => {
        const data = snapshot.val();
        if(data){
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

  return (
    <div className='w-full h-screen bg-black bg-opacity-30 fixed left-0 top-0 flex justify-center items-center flex-col z-50'>
      {isLoading ? <Loading /> : null}
      {isConfirmed ? <Confirmation setPopUp={setPopUp} setIsConfirmed={setIsConfirmed} price={parseInt(price) * parseInt(qty) + parseInt(selectedOption.split("|")[1], 10)} code={user.uid.substring(0,5)+'A'+codeID} /> : 
      <div className='flex bg-amber-800 flex-col w-3/5 h-96 px-3 py-1 relative'>
        <div className='w-full flex justify-end items-center'>
          <AiOutlineClose className='text-xl text-white bg-red-500 mt-2' onClick={handleClose} />
        </div>
        <div className='flex'>
          <div className='flex-1 flex flex-col px-4'>
            <label className='text-amber-50 mt-4 text-xs'>Pilih Provinsi</label>
            <select className='px-1 py-1.5 text-md mt-1 text-amber-950' onChange={handleProv} name="Provinsi">
              <option value={0} >Pilih Provinsi</option>
              {dataProv ? dataProv.map(prov => {
                return (<option value={prov.province_id} key={prov.province_id}>{prov.province}</option>)
              }) : null}
            </select>
            <label className='text-amber-50 mt-4 text-xs'>Pilih Kota</label>
            <select className='px-1 py-1.5 text-md mt-1 text-amber-950' onChange={handleCity} name="Kota">
              <option value={0} >Pilih Kota</option>
              {dataCity ? dataCity.map(city => {
                return (<option value={city.city_id} key={city.city_id}>{city.type} {city.city_name}</option>)
              }) : null}
            </select>
            <div className='flex flex-col'>
              <label className='text-amber-50 mt-4 text-xs'>Alamat Lengkap</label>
              <input className='px-1 py-1.5 text-md mt-1 text-amber-950' type="text" value={fullAddress} onChange={(e) => setFullAddress(e.currentTarget.value)} required />
            </div>
          </div>
          <div className='flex-1 flex flex-col px-4'>
            <label className='text-amber-50 mt-4 text-xs'>Pilih Kurir</label>
            <select className='px-1 py-1.5 text-md mt-1 text-amber-950' onChange={handleCourier} name="choice">
              <option value={0} >Pilih Kurir</option>
              {dataCourier ? dataCourier.map((courierList, i) => {
                return (<option value={courierList} key={i}>{courierList.toUpperCase()}</option>)
              }) : null}
            </select>
            <label className='text-amber-50 mt-4 text-xs'>Pilih Jenis Pengiriman</label>
            <select className='px-1 py-1.5 text-md mt-1 text-amber-950' onChange={(e) => setSelectedOption(e.target.value)} name="choice">
              <option value={0} >Pilih Pengiriman</option>
              {dataOption.costs ? dataOption.costs.map((option, i) => {
                return (<option className='' value={option.service + '|' + parseInt(option.cost[0].value)} key={i}><span className='text-xs'>{option.service}</span> | <span>{parseInt(option.cost[0].value) == 0 ? "CHAT ADMIN" : new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(parseInt(option.cost[0].value))}</span> | <span>{option.cost[0].etd} Hari</span></option>)
              }) : null}
            </select>
            <hr className='mt-3 opacity-60' />
            <p className='text-white mt-1 flex justify-between'><span>Total</span> <span>{selectedOption != "" ? (parseInt(price) * parseInt(qty) + parseInt(selectedOption.split("|")[1], 10)).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }) : 'Rp 0'},-</span></p>
            <div className='w-full text-center mt-5'>
              {isComplete ?
                <a onClick={handleBuy} className='bg-amber-500 flex px-5 justify-center mx-4 py-1.5'>
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
      }
    </div>
  )
}

export default PopUpChekcout