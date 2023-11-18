import React, { useState, useEffect } from 'react'
import { FIREBASE_DB } from '../config/firebaseinit'
import { onValue, ref, remove } from 'firebase/database'
import GoodsAdmin from './GoodsAdmin'

const Produk = () => {
  const [dataProduk, setDataProduk] = useState([])
  useEffect(()=>{
    onValue(ref(FIREBASE_DB, "goods"), (snapshot) => {
      const data = snapshot.val();
      if(data){
        setDataProduk(data)
      }
    });
  },[])
  return (
    <div className='flex justify-around flex-wrap mx-8 gap-y-5'>
      {dataProduk ? dataProduk.map((data,i)=>{
        return(<GoodsAdmin data={data} length={dataProduk.length} i={i} /> )
      })
      :null}
    </div>
  )
}

export default Produk