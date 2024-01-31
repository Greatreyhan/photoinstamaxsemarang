import React, { useState, useEffect } from 'react'
import Loading from '../components/Loading'
import { FIREBASE_DB } from '../config/firebaseinit'
import { onValue, ref } from 'firebase/database'
import { Goods } from '../components'
const Products = () => {
  const [dataProduk, setDataProduk] = useState([])
  const [keyProduk, setKeyProduk] = useState([])
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
  return (
    <div className='w-10/12 mx-auto py-32 flex flex-wrap gap-y-10'>
      {Array.isArray(keyProduk) && dataProduk != {} ? keyProduk.map((key, id) => {
        if (dataProduk[key].show) {
          if (dataProduk[key].show != 'hidden') {
            return (<Goods key={id} Title={dataProduk[key].title} Desc={dataProduk[key].desc} Price={dataProduk[key].price} ImageSource={dataProduk[key].img} Category={dataProduk[key].type} Weight={dataProduk[key].weight} ProdukID={id} />)
          }
        }
        else{
          return (<Goods key={id} Title={dataProduk[key].title} Desc={dataProduk[key].desc} Price={dataProduk[key].price} ImageSource={dataProduk[key].img} Category={dataProduk[key].type} Weight={dataProduk[key].weight} ProdukID={id} />)
        }
      })
        : <p>Loading...</p>}
    </div>
  )
}

export default Products