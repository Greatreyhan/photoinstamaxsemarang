import React, { useState, useEffect } from 'react'
import { FIREBASE_DB } from '../config/firebaseinit'
import { onValue, ref, remove } from 'firebase/database'
import GoodsAdmin from './GoodsAdmin'
import { FaPlus } from "react-icons/fa6";
import NewProduct from './NewProduct';

const Produk = () => {
  const [dataProduk, setDataProduk] = useState({})
  const [keyProduk, setKeyProduk] = useState([])
  const [popUpAdd, setPopUpAdd] = useState(false)
  useEffect(() => {
    onValue(ref(FIREBASE_DB, "goods"), (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const key = Object.keys(data)
        setKeyProduk(key)
        setDataProduk(data)
      }
    });
  }, [])
  const handleShow = (e) => {
    e.preventDefault()
    setPopUpAdd(!popUpAdd)
  }
  return (
    <div className='flex justify-around flex-wrap mx-8 gap-y-5'>
      {popUpAdd ?
        <NewProduct setPopUp={setPopUpAdd} lengthData={dataProduk.length ? dataProduk.length : new Date().getTime()} />
        : null}
      <div className='w-full flex items-center'>
        <button onClick={(e) => handleShow(e)} className='flex items-center px-6 py-1.5 bg-amber-800 shadow hover:shadow-none'><FaPlus className='text-white' /><span className='text-white ml-2'>Tambah Produk</span></button>
      </div>
      {Array.isArray(keyProduk) && dataProduk != {} ? keyProduk.map((key, i) => {
        if (dataProduk[key].show) {
          if (dataProduk[key].show != 'hidden') {
            return (<GoodsAdmin data={dataProduk[key]} length={keyProduk.length} i={key} />)
          }
        }
        else{
          return (<GoodsAdmin data={dataProduk[key]} length={keyProduk.length} i={key} />)
        }
        })
        : <p>Loading...</p>}
    </div>
  )
}

export default Produk