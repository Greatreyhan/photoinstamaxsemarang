import React, { useState, useEffect } from 'react'
import { FIREBASE_DB } from '../config/firebaseinit'
import { onValue, ref, remove } from 'firebase/database'
import GoodsAdmin from './GoodsAdmin'
import { FaPlus } from "react-icons/fa6";
import NewProduct from './NewProduct';

const Produk = () => {
  const [dataProduk, setDataProduk] = useState([])
  const [popUpAdd, setPopUpAdd] = useState(false)
  useEffect(()=>{
    onValue(ref(FIREBASE_DB, "goods"), (snapshot) => {
      const data = snapshot.val();
      if(data){
        setDataProduk(data)
      }
    });
  },[])
  const handleShow = (e) =>{
    e.preventDefault()
    setPopUpAdd(!popUpAdd)
  }
  return (
    <div className='flex justify-around flex-wrap mx-8 gap-y-5'>
      {popUpAdd ? 
    <NewProduct setPopUp={setPopUpAdd} lengthData={dataProduk.length} />
      :null}
      <div className='w-full flex items-center'>
        <button onClick={(e)=>handleShow(e)} className='flex items-center px-6 py-1.5 bg-amber-800 shadow hover:shadow-none'><FaPlus className='text-white' /><span className='text-white ml-2'>Tambah Produk</span></button>
      </div>
      {dataProduk ? dataProduk.map((data,i)=>{
        return(<GoodsAdmin data={data} length={dataProduk.length} i={i} /> )
      })
      :null}
    </div>
  )
}

export default Produk